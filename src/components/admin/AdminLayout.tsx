
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLoginModal from "./AdminLoginModal";
import { getAdminCredentials, clearAdminCredentials } from "@/utils/admin-utils";

export default function AdminLayout() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin credentials exist
    const credentials = getAdminCredentials();
    if (!credentials) {
      setShowLoginModal(true);
    }
  }, []);

  const handleLogout = () => {
    clearAdminCredentials();
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Admin Header */}
      <header className="border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Driplare Logo"
              className="h-8 dark:hidden"
            />
            <img
              src="/logo-white.png"
              alt="Driplare Logo"
              className="h-8 hidden dark:block"
            />
            <span className="text-lg font-semibold ml-2">Admin Panel</span>
          </Link>
          
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Admin Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {showLoginModal ? (
          <AdminLoginModal onSuccess={handleLoginSuccess} />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
