"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useModal } from "@/hooks/use-modal-store";

export const OpenImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "openImage";
  const { fileUrl, content } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="flex items-center justify-center border-none bg-transparent p-4">
        {fileUrl && content ? (
          <div className="relative h-auto max-h-full w-auto max-w-full">
            <Image
              src={fileUrl}
              alt={content}
              quality={100}
              width={800}
              height={600}
            />
            <p className="absolute left-0 top-full text-sm text-zinc-400 hover:text-white hover:underline">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                Open in New Tab
              </a>
            </p>
          </div>
        ) : (
          <p className="text-center text-zinc-500">No image to display</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
