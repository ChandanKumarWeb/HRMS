import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <AnimatedThemeToggler />
      <h1>Hello</h1>
    </div>
  );
}
