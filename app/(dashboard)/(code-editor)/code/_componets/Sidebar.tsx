"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Folder,
  FolderOpen,
  File,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { FileSystemExample, FileSystemItem } from "./FileSytem";
import { SidebarContextMenu } from "./SideBarContextMenu";

interface SideBarProps {
  position: "left" | "right";
  setIsDragging: (isDragging: boolean) => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  position,
  setIsDragging,
}) => {
  const [width, setWidth] = useState(256);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(
    (mouseDownEvent: MouseEvent) => {
      mouseDownEvent.preventDefault();
      setIsDragging(true);

      const startWidth = sidebarRef.current?.getBoundingClientRect().width || 0;
      const startPosition = mouseDownEvent.clientX;

      const doDrag = (mouseMoveEvent: MouseEvent) => {
        if (!sidebarRef.current) return;
        requestAnimationFrame(() => {
          if (!sidebarRef.current) return;
          const newWidth =
            position === "left"
              ? startWidth + mouseMoveEvent.clientX - startPosition
              : startWidth - mouseMoveEvent.clientX + startPosition;
          setWidth(Math.max(50, newWidth)); // Minimum width of 50px
        });
      };

      const stopDrag = () => {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
        setIsDragging(false);
      };

      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
    },
    [position, setIsDragging],
  );

  useEffect(() => {
    const resizeHandle = resizeHandleRef.current;
    if (resizeHandle) {
      resizeHandle.addEventListener(
        "mousedown",
        startResizing as EventListener,
      );
    }
    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener(
          "mousedown",
          startResizing as EventListener,
        );
      }
    };
  }, [startResizing]);

  const handleNewFile = () => {
    console.log("New file");
  };

  const handleNewFolder = () => {
    console.log("New folder");
  };

  const handleRevealInFileManager = () => {
    console.log("Reveal in File Manager");
  };

  const handleOpenInTerminal = () => {
    console.log("Open in Terminal");
  };

  const handleFindInFolder = () => {
    console.log("Find in Folder");
  };

  const handleCut = () => {
    console.log("Cut");
  };

  const handleCopy = () => {
    console.log("Copy");
  };

  const handlePaste = () => {
    console.log("Paste");
  };

  const handleCopyPath = () => {
    console.log("Copy Path");
  };

  const handleCopyRelativePath = () => {
    console.log("Copy Relative Path");
  };

  const handleRename = () => {
    console.log("Rename");
  };

  const handleCollapseAll = () => {
    console.log("Collapse All");
  };

  return (
    <div
      ref={sidebarRef}
      className={`bg-gray-100 dark:bg-gray-800 flex flex-col overflow-x-hidden relative ${
        position === "left" ? "order-first" : "order-last"
      }`}
      style={{ width: `${width}px`, minWidth: "50px" }}
    >
      <SidebarContextMenu
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
        onRevealInFileManager={handleRevealInFileManager}
        onOpenInTerminal={handleOpenInTerminal}
        onFindInFolder={handleFindInFolder}
        onCut={handleCut}
        onCopy={handleCopy}
        onPaste={handlePaste}
        onCopyPath={handleCopyPath}
        onCopyRelativePath={handleCopyRelativePath}
        onRename={handleRename}
        onCollapseAll={handleCollapseAll}
      >
        <div className="p-4 flex-grow">
          <FileSystemItem item={FileSystemExample} level={0} />
        </div>
      </SidebarContextMenu>
      <div
        ref={resizeHandleRef}
        className={`absolute top-0 bottom-0 w-1 cursor-col-resize ${
          position === "left" ? "-right-0.5" : "-left-0.5"
        } bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500`}
      />
    </div>
  );
};
