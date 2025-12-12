"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Apply theme based on mode
  const applyTheme = (value: "light" | "dark" | "system") => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (value === "system") {
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", value === "dark");
    }
  };

  // Load theme at startup
  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;

    const initial = saved ?? "system";
    setMode(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const systemListener = (e: MediaQueryListEvent) => {
      // read CURRENT mode safely using functional update
      setMode((prev) => {
        if (prev === "system") {
          document.documentElement.classList.toggle("dark", e.matches);
        }
        return prev;
      });
    };

    media.addEventListener("change", systemListener);

    return () => media.removeEventListener("change", systemListener);
  }, []);

  const cycleMode = (current: "light" | "dark" | "system") => {
    if (current === "light") return "dark";
    if (current === "dark") return "system";
    return "light";
  };

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newMode = cycleMode(mode);

    await document.startViewTransition(() => {
      flushSync(() => {
        setMode(newMode);
        localStorage.setItem("theme", newMode);
        applyTheme(newMode);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [mode, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {mode === "light" && <Moon />}
      {mode === "dark" && <Sun />}
      {mode === "system" && <Monitor />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
