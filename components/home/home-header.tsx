import { MobileToggle } from "@/components/mobile-toggle";

export const HomeHeader = () => {
  return (
    <div
      className="flex h-12 items-center justify-between border-b-2 border-neutral-200 px-3
        font-semibold dark:border-neutral-800"
    >
      <div className="flex items-center">
        <MobileToggle />
        <p className="text-md font-semibold text-black dark:text-white">TBD</p>
      </div>
    </div>
  );
};
