import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface SidebarContextMenuProps {
  children: React.ReactNode;
  onNewFile?: () => void;
  onNewFolder?: () => void;
  onRevealInFileManager?: () => void;
  onOpenInTerminal?: () => void;
  onFindInFolder?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onCopyPath?: () => void;
  onCopyRelativePath?: () => void;
  onRename?: () => void;
  onCollapseAll?: () => void;
}

export const SidebarContextMenu: React.FC<SidebarContextMenuProps> = ({
  children,
  onNewFile,
  onNewFolder,
  onRevealInFileManager,
  onOpenInTerminal,
  onFindInFolder,
  onCut,
  onCopy,
  onPaste,
  onCopyPath,
  onCopyRelativePath,
  onRename,
  onCollapseAll,
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
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onRevealInFileManager}>
          Reveal in File Manager
        </ContextMenuItem>
        <ContextMenuItem onClick={onOpenInTerminal}>
          Open in Terminal
        </ContextMenuItem>
        <ContextMenuItem onClick={onFindInFolder}>
          Find in Folder
          <ContextMenuShortcut>⇧⌘F</ContextMenuShortcut>
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
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onCopyPath}>Copy Path</ContextMenuItem>
        <ContextMenuItem onClick={onCopyRelativePath}>
          Copy Relative Path
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onRename}>
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={onCollapseAll}>
          Collapse All
          <ContextMenuShortcut>⌘↩</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
