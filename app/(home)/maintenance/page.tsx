"use client";

import { Construction, Clock, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg opacity-25 animate-bounce" style={{ animationDelay: '3s' }}></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full">
          {/* Header with animated icon */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                <Construction className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Clock className="h-6 w-6 text-white" />
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-3xl border-4 border-blue-300 opacity-20 animate-ping"></div>
              <div className="absolute inset-2 rounded-3xl border-2 border-purple-300 opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-slate-700 dark:from-slate-100 dark:via-blue-200 dark:to-slate-300 bg-clip-text text-transparent mb-4">
              System Maintenance
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              We're upgrading to serve you better
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/20 mb-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                  Maintenance in Progress
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
                Our team is working diligently to enhance your experience. We're implementing new features,
                improving performance, and ensuring everything runs smoothly.
              </p>

              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-3/4"></div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Estimated completion: {formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "🚀", title: "Performance Boost", desc: "Faster loading times" },
              { icon: "🔒", title: "Enhanced Security", desc: "Improved protection" },
              { icon: "✨", title: "New Features", desc: "Exciting updates coming" }
            ].map((item, index) => (
              <div key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/10 dark:border-slate-700/10">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 text-center shadow-xl border border-blue-100 dark:border-slate-600">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Our support team is available to help with any urgent matters during maintenance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Link href="mailto:hello@driplare.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>

              <Button variant="outline" asChild className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2026 Driplare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}