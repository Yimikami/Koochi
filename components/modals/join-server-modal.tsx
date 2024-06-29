"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CircleX } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";

const formSchema = z.object({
  inviteLink: z.string().min(1, {
    message: "Server invite link is required.",
  }),
});

export const JoinServerModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "joinServer";
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [errorMessage]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteLink: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inviteId = values.inviteLink.split("/").pop() as string;
    const response = await fetch(`/invite/${inviteId}`);
    console.log("[RESPONSE]", response);
    if (response.ok) {
      form.reset();
      router.push(`/invite/${inviteId}`);
      router.refresh();
      onClose();
    } else {
      setErrorMessage("Invalid invite link.");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Join a server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            To join a server, enter the invite link.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="inviteLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                      Invite Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0
                          focus-visible:ring-offset-0"
                        placeholder="Enter the invite link"
                        {...field}
                      />
                    </FormControl>
                    {errorMessage && (
                      <div className="px-2">
                        <div className="flex items-center gap-1 text-sm text-red-500">
                          <CircleX className="h-4 w-4" />
                          {errorMessage}
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 p-2 px-6">
              <div className="flex w-full justify-between">
                <Button
                  className="bg-gray-100 text-black hover:bg-gray-200"
                  onClick={() => onOpen("serverModal")}
                >
                  Back
                </Button>
                <Button variant={"primary"} disabled={isLoading}>
                  Join Server
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
