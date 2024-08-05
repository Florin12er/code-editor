import React from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface StartPageContextMenuProps {
    children: React.ReactNode;
    onNewFile?: () => void;
    onNewFolder?: () => void;
    openFile?: () => void;
    openFolder?: () => void;
    openTerminal?: () => void;
}

export const StartPageContextMenu: React.FC<StartPageContextMenuProps> = ({
    children,
    onNewFile,
    onNewFolder,
    openTerminal,
    openFile,
    openFolder,
}) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex-grow w-full h-full">
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem onClick={onNewFile}>
                    New File
                    <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={onNewFolder}>
                    New Folder
                    <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={openFile}>
                    Open File
                    <ContextMenuShortcut>⌘O</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={openFolder}>
                    Open Folder
                    <ContextMenuShortcut>⇧⌘O</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={openTerminal}>
                    Open Terminal
                    <ContextMenuShortcut>⌘T</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
