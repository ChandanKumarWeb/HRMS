import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ModeToggle/>
      <h1>Hello</h1>
    </div>
  );
}
