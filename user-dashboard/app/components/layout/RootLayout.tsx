import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Toaster } from "../ui/sonner";

export default function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader />
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}