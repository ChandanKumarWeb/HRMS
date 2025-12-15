"use client";

import { Calendar, Home, Settings, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();

  const menu = [
    { title: "Dashboard", icon: Home, link: "/dashboard" },
    { title: "Employees", icon: Users, link: "/employees" },
    { title: "Attendance", icon: Calendar, link: "/attendance" },
    { title: "Settings", icon: Settings, link: "/settings" },
  ];

  return (
    <aside
      className={`bg-gray-100 dark:bg-black border-r  border-black dark:border-white h-screen p-2 md:p-4 m-2 mr-0 transition-all duration-900
        ${collapsed ? "hidden md:w-25 md:block" : "w-full md:w-58"}
      `}
    >
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <h1
            className={`text-xl font-bold transition-opacity duration-300 
          ${collapsed ? "opacity-100" : "opacity-100"}`}
          >
            Demoo
          </h1>
        </Link>

        <button
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 block md:hidden ${
            collapsed ? "hidden" : "block"
          }`}
          onClick={() => {
            setCollapsed(true);
          }}
        >
          <X size={22} />
        </button>
      </div>

      <nav className="space-y-3">
        {menu.map((item, i) => {
          const isActive = pathname.startsWith(item.link);

          return (
            <Link key={i} href={item.link}>
              <div
                className={`flex items-center gap-3 p-3 rounded cursor-pointer transition
                text-gray-700 dark:text-gray-300
                ${
                  isActive
                    ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-900"
                } ${collapsed ? "justify-center" : "justify-start"}`}
              >
                <item.icon size={18} />
                {!collapsed && (
                  <span onClick={() => setCollapsed(true)}>{item.title}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
