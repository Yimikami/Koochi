import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UseravatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ src, className }: UseravatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
