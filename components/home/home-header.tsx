import { MobileToggle } from "@/components/mobile-toggle";
import { Home } from "lucide-react";

export const HomeHeader = () => {
  return (
    <div
      className="flex h-12 items-center justify-between border-b-2 border-neutral-200 px-3
        font-semibold dark:border-neutral-800"
    >
      <div className="flex items-center">
        <MobileToggle />
        <div className="mt-[1px] flex w-full items-center space-x-2">
          <button
            className="group pointer-events-none flex w-full items-center gap-x-3 rounded-md px-2 py-2
              font-sans text-zinc-700 dark:text-zinc-100"
          >
            <Home className="h-6 w-6" />
            <p className="text-[15px]">Home</p>
          </button>
        </div>
      </div>
    </div>
  );
};
