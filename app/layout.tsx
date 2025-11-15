import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Right content area */}
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="border border-orange-600">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
