"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { DoorOpen, Plus } from "lucide-react";

export const InitialModal = () => {
  const { onOpen } = useModal();

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-white p-0 pb-5 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Join or Create a server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            To get started, join or create a server.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            onClick={() => onOpen("joinServer")}
            variant={"primary"}
            className="h-12 w-36 text-sm font-semibold"
          >
            <DoorOpen className="mr-2 h-5 w-5" />
            Join Server
          </Button>
          <Button
            onClick={() => onOpen("createServer")}
            variant={"primary"}
            className="h-12 w-36 text-sm font-semibold"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Server
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
