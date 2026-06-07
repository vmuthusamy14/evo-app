import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import { Menu, X, Crown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useMode } from "@/lib/ModeContext";
import { useSubscription } from "@/lib/SubscriptionContext";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";

const allNavLinks = [
  { label: "Home", path: "/", mode: null },
  { label: "Personal", path: "/personal", mode: "personal" },
  { label: "Brand Assets", path: "/brand-assets", mode: "business" },
  { label: "Style Guide", path: "/style-guide", mode: "business" },
  { label: "Content", path: "/content", mode: "business" },
  { label: "Analytics", path: "/analytics", mode: "business" },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { activeMode } = useMode();
  const { isPremium } = useSubscription();

  const navLinks = allNavLinks.filter(
    (link) => link.mode === null || link.mode === activeMode
  );

  const initials = user?.full_name ?
  user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase() :
  "U";

  return (
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-xl border-b border-pink-100 shadow-sm shadow-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="https://media.base44.com/images/public/6a1de03a4f4aa0e503dd55f2/ce050bd47_EVO.png"
              alt="Evo"
              className="w-10 h-10 rounded-full object-cover transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-bold font-heading text-foreground">Evo</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all ${
                  isActive ?
                  "text-pink-500 bg-pink-50" :
                  "text-muted-foreground hover:text-foreground hover:bg-blue-50/70"}`
                  }>
                  
                  {link.label}
                  {isActive &&
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }} />

                  }
                </Link>);

            })}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {!isPremium && (
              <Link to="/checkout">
                <Button size="sm" className="hidden md:flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 text-white border-0 hover:opacity-90 shadow-sm">
                  <Crown className="w-3.5 h-3.5" /> Go Premium
                </Button>
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9 border-2 border-pink-200">
                    <AvatarFallback className="bg-gradient-to-br from-pink-100 to-blue-100 text-pink-500 text-sm font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border-pink-100">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold">{user?.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl" onClick={() => base44.auth.logout()}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}>
              
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-pink-100 bg-white/90 overflow-hidden">
          
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ?
                  "bg-pink-50 text-pink-500" :
                  "text-muted-foreground hover:bg-blue-50 hover:text-foreground"}`
                  }>
                  
                    {link.label}
                  </Link>);

            })}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}
