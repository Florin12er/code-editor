import { useState, useRef } from "react";
import { useSearch } from "@/components/providers/search-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Command, ChevronDown } from "lucide-react";
import { NavbarDropdown } from "./NavbarDropDown";

export const NavBar = () => {
    const { toggleSearch, toggleCommand } = useSearch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <nav className="h-16 bg-white dark:bg-gray-900 shadow-md px-6 flex items-center justify-between">
            <div className="flex items-center space-x-6">
                <Button
                    ref={menuButtonRef}
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <NavbarDropdown
                    isOpen={isDropdownOpen}
                    setIsOpen={setIsDropdownOpen}
                    menuButtonRef={menuButtonRef}
                />
                <div className="relative">
                    <Input
                        className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                        placeholder="Search files... (Ctrl+P)"
                        onClick={toggleSearch}
                        readOnly
                    />
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Button
                    variant="outline"
                    onClick={toggleCommand}
                    className="rounded-full"
                >
                    <Command className="mr-2 h-4 w-4" />
                    Command Palette (Ctrl+Shift+P)
                </Button>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeSwitcher />
            </div>
        </nav>
    );
};
