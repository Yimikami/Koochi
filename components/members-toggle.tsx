import { Users } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ServerSidebarRight } from "@/components/server/server-sidebar-right";

export const MembersToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Users />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="flex gap-0 p-0">
        <ServerSidebarRight serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
