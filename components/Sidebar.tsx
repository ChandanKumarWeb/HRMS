"use client";

import { Calendar, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
export default function Sidebar() {
  const menu = [
    { title: "Dashboard", icon: Home, link: "/dashboard" },
    { title: "Employees", icon: Users, link: "/employees" },
    { title: "Attendance", icon: Calendar, link: "/attendance" },
    { title: "Settings", icon: Settings, link: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md  dark:bg-black p-5">
      <h1 className="text-xl font-bold mb-6">HRMS</h1>

      <nav className="space-y-3">
        {menu.map((item, i) => (
          <Link key={i} href={item.link}>
            <div className="flex items-center gap-3 text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700  p-3 rounded cursor-pointer">
              <item.icon size={18} />
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
