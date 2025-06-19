import { GalleryHero } from "@/components/website/gallery/gallery-hero"
import { PhotoGallery } from "@/components/website/gallery/photo-gallery"

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <GalleryHero />
      <PhotoGallery />
    </div>
  )
}
