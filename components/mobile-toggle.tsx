import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { HomeSidebar } from "./home/home-sidebar";

export const MobileToggle = ({ serverId }: { serverId?: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex gap-0 p-0">
        <div className="w-[72px]">
          <NavigationSideBar />
        </div>
        {serverId ? <ServerSidebar serverId={serverId} /> : <HomeSidebar />}
      </SheetContent>
    </Sheet>
  );
};
