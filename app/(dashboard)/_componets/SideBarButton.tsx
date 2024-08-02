import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SideBarButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export const SideBarButton: React.FC<SideBarButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="flex items-center space-x-2 p-2 w-full text-left"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Button>
  );
};
