import { Button } from "@/components/ui/button";
import { Sidebar, SidebarClose } from "lucide-react";

interface BottomBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  return (
    <div className="h-8 bg-gray-200 dark:bg-gray-700 flex items-center px-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="text-gray-600 dark:text-gray-300"
      >
        {isSidebarOpen ? <SidebarClose size={16} /> : <Sidebar size={16} />}
      </Button>
    </div>
  );
};
