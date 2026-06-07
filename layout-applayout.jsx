import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Soft decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-1/2 w-96 h-96 bg-yellow-200/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />
      <Navbar />
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
