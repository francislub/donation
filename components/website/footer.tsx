import Link from "next/link"
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WebsiteFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Rwahumati Foundation</h3>
                <p className="text-sm text-gray-300">Transforming Lives</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering children through education and creating lasting change in communities worldwide. Join us in
              building a brighter future for those who need it most.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Story", href: "/about/story" },
                { name: "Our Mission", href: "/about/mission" },
                { name: "Our Impact", href: "/about/impact" },
                { name: "Our Team", href: "/about/team" },
                { name: "Annual Reports", href: "/reports" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get Involved</h4>
            <ul className="space-y-3">
              {[
                { name: "Sponsor a Child", href: "/children?filter=available" },
                { name: "Make a Donation", href: "/donate" },
                { name: "Volunteer", href: "/volunteer" },
                { name: "Corporate Partnership", href: "/partnership" },
                { name: "Fundraise", href: "/fundraise" },
                { name: "Gift Catalog", href: "/gifts" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">info@hopefoundation.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-pink-400 mt-1" />
                <span className="text-gray-300">
                  123 Rwahumati Street
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <p className="text-sm text-gray-300 mb-4">Get updates on our latest impact and stories.</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © 2025 Rwahumati Foundation. All rights reserved. |
              <Link href="/privacy" className="hover:text-pink-400 ml-1">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="/terms" className="hover:text-pink-400 ml-1">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>🌟 Charity Navigator 4-Star Rating</span>
              <span>•</span>
              <span>💎 GuideStar Gold Seal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
