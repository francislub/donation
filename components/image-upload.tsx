"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  multiple?: boolean
  values?: string[]
  onMultipleChange?: (urls: string[]) => void
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  multiple = false,
  values = [],
  onMultipleChange,
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)

      if (multiple && onMultipleChange) {
        onMultipleChange([...values, ...uploadedUrls])
      } else if (uploadedUrls[0]) {
        onChange(uploadedUrls[0])
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemove = (urlToRemove: string) => {
    if (multiple && onMultipleChange) {
      onMultipleChange(values.filter((url) => url !== urlToRemove))
    } else if (onRemove) {
      onRemove()
    }
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Upload Button */}
        <div>
          <Label>Upload Images</Label>
          <div className="mt-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Choose Images"}
            </Button>
          </div>
        </div>

        {/* Single Image Preview */}
        {!multiple && value && (
          <div className="relative">
            <div className="relative aspect-square w-32 rounded-lg overflow-hidden border">
              <Image src={value || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0"
                onClick={() => handleRemove(value)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Multiple Images Preview */}
        {multiple && values.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {values.map((url, index) => (
              <div key={index} className="relative">
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image src={url || "/placeholder.svg"} alt={`Preview ${index + 1}`} fill className="object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => handleRemove(url)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!value && (!multiple || values.length === 0) && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">No images uploaded</p>
          </div>
        )}
      </div>
    </div>
  )
}
