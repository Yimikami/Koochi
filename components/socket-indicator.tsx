"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Cloud, CloudOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="border-none bg-yellow-600 px-2 py-2 text-white"
      >
        <CloudOff size={24} />
      </Badge>
    );
  }

  return (
    <Badge
      variant={"outline"}
      className="border-none bg-emerald-600 px-2 py-2 text-white"
    >
      <Cloud size={24} />
    </Badge>
  );
};
