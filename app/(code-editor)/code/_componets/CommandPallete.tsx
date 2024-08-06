"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Clock, FolderPlus, LogOut, Plus, Minus } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useSearch } from '@/components/providers/search-provider';

const commands = [
    { id: "open-project", title: "Open Project", icon: <FolderOpen className="mr-2 h-4 w-4" /> },
    { id: "open-recent", title: "Open Recent Projects", icon: <Clock className="mr-2 h-4 w-4" /> },
    { id: "add-folder", title: "Add Folder to Project", icon: <FolderPlus className="mr-2 h-4 w-4" /> },
    { id: "increase-font", title: "Increase Font Size", icon: <Plus className="mr-2 h-4 w-4" /> },
    { id: "decrease-font", title: "Decrease Font Size", icon: <Minus className="mr-2 h-4 w-4" /> },
    { id: "quit", title: "Quit", icon: <LogOut className="mr-2 h-4 w-4" /> },
];

export const CommandPalette = () => {
    const { isCommandOpen, toggleCommand } = useSearch();
    const [isMounted, setIsMounted] = useState(false);
    const [filteredCommands, setFilteredCommands] = useState(commands);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSearch = (query: string) => {
        const filtered = commands.filter(cmd =>
            cmd.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCommands(filtered);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isCommandOpen} onOpenChange={toggleCommand}>
            <CommandInput
                placeholder="Type a command..."
                onValueChange={handleSearch}
            />
            <CommandList>
                <CommandEmpty>No commands found</CommandEmpty>
                <CommandGroup heading="Commands">
                    {filteredCommands.map((command) => (
                        <CommandItem
                            key={command.id}
                            value={command.title}
                            onSelect={() => console.log(`Executed command: ${command.title}`)}
                        >
                            {command.icon}
                            <span>{command.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
