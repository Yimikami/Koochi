import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === "channel" && (
        <div
          className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-zinc-500
            dark:bg-zinc-700"
        >
          <Hash className="teext-white h-12 w-12" />
        </div>
      )}
      <p className="text-xl font-bold md:text-3xl">
        {type === "channel" ? `Welcome to #${name}!` : `${name}`}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the beginning of your direct message history with ${name}`}
      </p>
    </div>
  );
};
