"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-white p-0 pb-5 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Looks like you&apos;re lost!
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Lets get you back on track with a little help. You will be
            redirected to the homepage in 5 seconds. If you are not redirected,
            click the button below.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 flex justify-center space-x-4">
          <Button className="flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <House className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
