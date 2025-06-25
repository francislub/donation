"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Heart, Phone, Mail, MapPin, ChevronDown, Globe } from "lucide-react"

export function WebsiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@hopefoundation.org</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>New York, NY</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Making a global impact since 2010</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Hope Foundation
                </h1>
                <p className="text-sm text-gray-600">Transforming Lives</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* About Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200">
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link
                      href="/about/story"
                      className="block px-4 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-200"
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/about/mission"
                      className="block px-4 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-200"
                    >
                      Our Mission
                    </Link>
                    <Link
                      href="/about/impact"
                      className="block px-4 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-200"
                    >
                      Our Impact
                    </Link>
                    <Link
                      href="/about/team"
                      className="block px-4 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors duration-200"
                    >
                      Our Team
                    </Link>
                  </div>
                </div>
              </div>

              {/* <Link
                href="/children"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200 relative group"
              >
                Children
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link> */}

              <Link
                href="/beneficiaries"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200 relative group"
              >
                Beneficiaries
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/gallery"
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200 relative group"
              >
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/children"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="inline-block mr-2 h-4 w-4" />
                Sponsor Now
              </Link>
              <Link
                href="/donate"
                className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Donate
              </Link>
              <Link
                href="/auth/login"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Admin Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">About Us</p>
                <Link
                  href="/about/story"
                  className="block text-gray-600 hover:text-pink-600 py-1 pl-4 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  href="/about/mission"
                  className="block text-gray-600 hover:text-pink-600 py-1 pl-4 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Mission
                </Link>
                <Link
                  href="/about/impact"
                  className="block text-gray-600 hover:text-pink-600 py-1 pl-4 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Impact
                </Link>
                <Link
                  href="/about/team"
                  className="block text-gray-600 hover:text-pink-600 py-1 pl-4 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Team
                </Link>
              </div>
              {/* <Link
                href="/children"
                className="block text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Children
              </Link> */}
              <Link
                href="/beneficiaries"
                className="block text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Beneficiaries
              </Link>
              <Link
                href="/gallery"
                className="block text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <div className="pt-4 space-y-3">
                <Link
                  href="/children"
                  className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center px-6 py-3 rounded-xl font-semibold shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="inline-block mr-2 h-4 w-4" />
                  Sponsor Now
                </Link>
                <Link
                  href="/donate"
                  className="block w-full border-2 border-pink-600 text-pink-600 text-center px-6 py-3 rounded-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </Link>
                <Link
                  href="/auth/login"
                  className="block w-full bg-gray-800 text-white text-center px-6 py-3 rounded-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
