"use client";

import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export default function Header({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "dashboard";

  const pageTitles: Record<string, string> = {
    dashboard: "Dashboard",
    employees: "Employees",
    attendance: "Attendance",
    payroll: "Payroll",
    settings: "Settings",
  };

  const title = pageTitles[segment];

  return (
    <header className="bg-gray-100 dark:bg-black shadow dark:shadow-white p-4 flex justify-between items-center">
      <div className="flex items-center  gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>

        <h2 className="text-xl text-center w-full font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <Bell />
        <ModeToggle />
      </div>
    </header>
  );
}
