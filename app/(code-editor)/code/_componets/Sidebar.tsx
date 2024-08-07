"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FileSystemItem } from "./FileSytem";
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
    const [fileSystem, setFileSystem] = useState<FileSystemItem | null>(null);
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchFileSystem();
    }, []);

    const fetchFileSystem = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch file system');
            }
            const data = await response.json();
            setFileSystem(data);
        } catch (error) {
            console.error('Error fetching file system:', error);
            setError('Failed to load file system. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewFile = () => {
        setIsCreatingFile(true);
    };

    const handleCreateFile = async () => {
        if (newFileName.trim() === "") return;

        try {
            const response = await fetch('/api/projects/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newFileName,
                    content: '',
                    language: 'plaintext',
                    file_icon: 'file',
                    projectId: 'default-project-id', // You'll need to determine the correct project ID
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create file');
            }

            await fetchFileSystem();
            setNewFileName("");
            setIsCreatingFile(false);
        } catch (error) {
            console.error('Error creating file:', error);
            setError('Failed to create file. Please try again.');
        }
    };

    return (
        <div
            ref={sidebarRef}
            className={`bg-gray-100 dark:bg-gray-800 flex flex-col overflow-x-hidden relative ${position === "left" ? "order-first" : "order-last"
                }`}
            style={{ width: `${width}px`, minWidth: "50px" }}
        >
            <SidebarContextMenu
                onNewFile={handleNewFile}
            >
                <div className="p-4 flex-grow">
                    {isCreatingFile && (
                        <div className="p-2">
                            <input
                                type="text"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                onBlur={handleCreateFile}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleCreateFile();
                                    }
                                }}
                                className="w-full p-1 border border-gray-300 rounded"
                                placeholder="Enter file name"
                                autoFocus
                            />
                        </div>
                    )}
                    {isLoading && <div>Loading...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    {fileSystem && <FileSystemItem item={fileSystem} level={0} />}
                </div>
            </SidebarContextMenu>
            <div
                ref={resizeHandleRef}
                className={`absolute top-0 bottom-0 w-1 cursor-col-resize ${position === "left" ? "-right-0.5" : "-left-0.5"
                    } bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500`}
            />
        </div>
    );
};
