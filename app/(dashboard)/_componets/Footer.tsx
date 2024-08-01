import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <>
      <div className="flex dark:bg-[#1f1f1f] items-center w-full p-6 bg-background z-[99999]">
        <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
          <Button variant="ghost">Privacy Policy</Button>
          <Button variant="ghost">Terms & Condition</Button>
        </div>
      </div>
    </>
  );
};
