import type React from "react"
import type { Metadata } from "next"
import { WebsiteHeader } from "@/components/website/header"
import { WebsiteFooter } from "@/components/website/footer"

export const metadata: Metadata = {
  title: "Hope Foundation - Transforming Lives Through Education",
  description:
    "Join us in providing educational opportunities to children in need. Sponsor a child today and make a lasting impact on their future.",
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <WebsiteHeader />
      <main className="min-h-screen">{children}</main>
      <WebsiteFooter />
    </>
  )
}
