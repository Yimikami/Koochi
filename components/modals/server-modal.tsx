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
import { Plus } from "lucide-react";

export const ServerModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();

  const isModalOpen = isOpen && type === "serverModal";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 pb-5 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Create a Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-3 flex justify-center space-x-4">
          <div
            onClick={() => onOpen("createServer")}
            className="flex w-[85%] cursor-pointer items-center rounded-[16px] border
              border-neutral-200 p-4 hover:bg-neutral-100"
          >
            <button className="group flex items-center">
              <div
                className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden
                  rounded-[24px] border border-emerald-500"
              >
                <Plus className="text-emerald-500" size={25} />
              </div>
            </button>
            <p className="mt-2 font-semibold text-black">Create My Own</p>
          </div>
        </div>
        <DialogTitle className="mt-2 text-center font-bold">
          Have an invite already?
        </DialogTitle>
        <div className="flex justify-center space-x-4">
          <Button
            className="mt-2 w-[85%] bg-zinc-600 font-semibold text-white hover:bg-zinc-500"
            onClick={() => onOpen("joinServer")}
          >
            <div className="flex items-center justify-center">
              Join a Server
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
