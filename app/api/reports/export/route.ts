import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "children" | "sponsors" | "donations"
    const exportFormat = searchParams.get("format") as "csv" | "pdf"
    const from = searchParams.get("from")
    const to = searchParams.get("to")

    if (!type || !exportFormat) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Build date filter
    const dateFilter = {
      ...(from && { gte: new Date(from) }),
      ...(to && { lte: new Date(to) }),
    }

    let data: any[] = []
    let headers: string[] = []
    let filename = ""

    switch (type) {
      case "children":
        data = await prisma.child
          .findMany({
            select: {
              id: true,
              name: true,
              age: true,
              location: true,
              isSponsored: true,
              createdAt: true,
              story: true,
              needs: true,
            },
            orderBy: { createdAt: "desc" },
            ...(Object.keys(dateFilter).length > 0 && { where: { createdAt: dateFilter } }),
          })
          .catch(() => [])

        headers = ["ID", "Name", "Age", "Location", "Sponsored", "Created Date", "Story", "Needs"]
        filename = `children-report-${format(new Date(), "yyyy-MM-dd")}`
        break

      case "sponsors":
        data = await prisma.sponsor
          .findMany({
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              address: true,
              status: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            ...(Object.keys(dateFilter).length > 0 && { where: { createdAt: dateFilter } }),
          })
          .catch(() => [])

        headers = ["ID", "Name", "Email", "Phone", "Address", "Status", "Created Date"]
        filename = `sponsors-report-${format(new Date(), "yyyy-MM-dd")}`
        break

      case "donations":
        data = await prisma.donation
          .findMany({
            select: {
              id: true,
              amount: true,
              donorName: true,
              donorEmail: true,
              status: true,
              date: true,
              paymentMethod: true,
            },
            orderBy: { date: "desc" },
            ...(Object.keys(dateFilter).length > 0 && { where: { date: dateFilter } }),
          })
          .catch(() => [])

        headers = ["ID", "Amount", "Donor Name", "Donor Email", "Status", "Date", "Payment Method"]
        filename = `donations-report-${format(new Date(), "yyyy-MM-dd")}`
        break

      default:
        return NextResponse.json({ error: "Invalid export type" }, { status: 400 })
    }

    if (exportFormat === "csv") {
      const csv = generateCSV(data, headers, type)

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}.csv"`,
        },
      })
    } else if (exportFormat === "pdf") {
      const pdf = await generatePDF(data, headers, type, filename)

      return new NextResponse(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        },
      })
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}

function generateCSV(data: any[], headers: string[], type: string): string {
  const csvHeaders = headers.join(",")

  const csvRows = data.map((item) => {
    switch (type) {
      case "children":
        return [
          item.id,
          `"${item.name}"`,
          item.age,
          `"${item.location}"`,
          item.isSponsored ? "Yes" : "No",
          format(new Date(item.createdAt), "yyyy-MM-dd"),
          `"${item.story || ""}"`,
          `"${item.needs || ""}"`,
        ].join(",")

      case "sponsors":
        return [
          item.id,
          `"${item.name}"`,
          `"${item.email}"`,
          `"${item.phone || ""}"`,
          `"${item.address || ""}"`,
          item.status,
          format(new Date(item.createdAt), "yyyy-MM-dd"),
        ].join(",")

      case "donations":
        return [
          item.id,
          item.amount,
          `"${item.donorName}"`,
          `"${item.donorEmail}"`,
          item.status,
          format(new Date(item.date), "yyyy-MM-dd"),
          `"${item.paymentMethod || ""}"`,
        ].join(",")

      default:
        return ""
    }
  })

  return [csvHeaders, ...csvRows].join("\n")
}

async function generatePDF(data: any[], headers: string[], type: string, filename: string): Promise<Buffer> {
  // Simple PDF generation using HTML to PDF conversion
  // In a real application, you might want to use a library like puppeteer or jsPDF

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${filename}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .summary { background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <h1>${type.charAt(0).toUpperCase() + type.slice(1)} Report</h1>
      <div class="summary">
        <p><strong>Generated:</strong> ${format(new Date(), "MMMM dd, yyyy HH:mm")}</p>
        <p><strong>Total Records:</strong> ${data.length}</p>
      </div>
      <table>
        <thead>
          <tr>
            ${headers.map((header) => `<th>${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${data
            .map((item) => {
              switch (type) {
                case "children":
                  return `<tr>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.age}</td>
                  <td>${item.location}</td>
                  <td>${item.isSponsored ? "Yes" : "No"}</td>
                  <td>${format(new Date(item.createdAt), "yyyy-MM-dd")}</td>
                  <td>${item.story || ""}</td>
                  <td>${item.needs || ""}</td>
                </tr>`

                case "sponsors":
                  return `<tr>
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.email}</td>
                  <td>${item.phone || ""}</td>
                  <td>${item.address || ""}</td>
                  <td>${item.status}</td>
                  <td>${format(new Date(item.createdAt), "yyyy-MM-dd")}</td>
                </tr>`

                case "donations":
                  return `<tr>
                  <td>${item.id}</td>
                  <td>$${item.amount}</td>
                  <td>${item.donorName}</td>
                  <td>${item.donorEmail}</td>
                  <td>${item.status}</td>
                  <td>${format(new Date(item.date), "yyyy-MM-dd")}</td>
                  <td>${item.paymentMethod || ""}</td>
                </tr>`

                default:
                  return ""
              }
            })
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `

  // For now, return the HTML as a simple text buffer
  // In production, you'd use a proper HTML to PDF converter
  return Buffer.from(html, "utf-8")
}
