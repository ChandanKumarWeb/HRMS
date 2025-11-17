"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Wrap ALL content inside Providers */}
          <Providers>
            <div className="flex min-h-screen bg-gray-100 dark:bg-black">

              {/* Sidebar */}
              <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

              {/* Right Content */}
              <div className="flex flex-1 flex-col overflow-hidden">
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

                <main className="flex-1 overflow-auto p-2">
                  {children}
                </main>
              </div>

            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
