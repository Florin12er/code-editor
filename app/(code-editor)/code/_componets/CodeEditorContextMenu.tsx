import React from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface CodeEditorContextMenuProps {
    children: React.ReactNode;
    onRevealInFileManager?: () => void;
    onGotodefinition?: () => void;
    onGotoimplementation?: () => void;
    onFindAllReferences?: () => void;
    onOpenInTerminal?: () => void;
    onFindInFolder?: () => void;
    onCut?: () => void;
    onCopy?: () => void;
    onPaste?: () => void;
    onRename?: () => void;
}

export const CodeEditorContextMenu: React.FC<CodeEditorContextMenuProps> = ({
    children,
    onRevealInFileManager,
    onGotodefinition,
    onGotoimplementation,
    onFindAllReferences,
    onOpenInTerminal,
    onFindInFolder,
    onCut,
    onCopy,
    onPaste,
    onRename,
}) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex-grow w-full h-full">
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem onClick={onRename}>
                    Rename
                    <ContextMenuShortcut>F2</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={onGotodefinition}>
                    Go to Definition
                    <ContextMenuShortcut>⌘G</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={onGotoimplementation}>
                    Go to Implementation
                    <ContextMenuShortcut>⌘I</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={onOpenInTerminal}>
                    Open in Terminal
                </ContextMenuItem>
                <ContextMenuItem onClick={onFindInFolder}>
                    Find in Folder
                    <ContextMenuShortcut>⇧⌘F</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={onFindAllReferences}>
                    Find All References
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={onRevealInFileManager}>
                    Reveal in File Manager
                    <ContextMenuShortcut>⇧⌘R</ContextMenuShortcut>
                </ContextMenuItem>

                <ContextMenuSeparator />
                <ContextMenuItem onClick={onCut}>
                    Cut
                    <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={onCopy}>
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={onPaste}>
                    Paste
                    <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
