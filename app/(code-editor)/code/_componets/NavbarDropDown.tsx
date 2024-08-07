import { useSearch } from "@/components/providers/search-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { Command, Plus, Minus, FolderOpen, Clock, FolderPlus, LogOut } from "lucide-react";
import { RefObject } from "react";

interface NavbarDropdownProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    menuButtonRef: RefObject<HTMLButtonElement>;
}

export const NavbarDropdown = ({ isOpen, setIsOpen }: NavbarDropdownProps) => {
    const { toggleCommand } = useSearch();

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="hidden">
                {/* This is hidden because we're controlling the open state from the parent */}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="relative top-12 w-64 py-2 px-1 rounded-lg shadow-lg bg-white dark:bg-gray-800"
                align="start"
                alignOffset={-5}
                sideOffset={5}
                side="bottom"
                forceMount
            >
                <DropdownMenuItem onClick={toggleCommand} className="py-2">
                    <Command className="mr-3 h-4 w-4" />
                    <span>Open Command Palette</span>
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">Ctrl+Shift+P</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Font Size</DropdownMenuLabel>
                <DropdownMenuItem className="py-2">
                    <Plus className="mr-3 h-4 w-4" />
                    <span>Increase Font Size</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                    <Minus className="mr-3 h-4 w-4" />
                    <span>Decrease Font Size</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="py-2">
                    <FolderOpen className="mr-3 h-4 w-4" />
                    <span>Open Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                    <Clock className="mr-3 h-4 w-4" />
                    <span>Open Recent Projects</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                    <FolderPlus className="mr-3 h-4 w-4" />
                    <span>Add Folder to Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="py-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                    <LogOut className="mr-3 h-4 w-4" />
                    <SignOutButton>Logout</SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
