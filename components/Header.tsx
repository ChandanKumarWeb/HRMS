"use client";
import { Bell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-black shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <Bell />
        {/* <img
          className="w-10 h-10 rounded-full"
          src="https://i.pravatar.cc/300"
          alt="User"
        /> */}
          <ModeToggle/>
        
      </div>
    </header>
  );
}
