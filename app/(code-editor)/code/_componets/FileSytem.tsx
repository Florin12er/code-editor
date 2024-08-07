"use client";

import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    File,
    ChevronRight,
    Folder,
    FolderOpen,
} from "lucide-react";
import { useState } from "react";

export interface FileSystemItem {
    name: string;
    type: "file" | "folder";
    children?: FileSystemItem[];
}

interface FileSystemProps {
    item: FileSystemItem;
    level: number;
}

export const FileSystemItem: React.FC<FileSystemProps> = ({ item, level }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        if (item.type === "folder") {
            setIsOpen(!isOpen);
        }
    };

    const GetIcon = () => {
        if (item.type === "file") return <File className="text-blue-500" />;
        return isOpen ? (
            <FolderOpen className="text-yellow-500" />
        ) : (
            <Folder className="text-yellow-500" />
        );
    };

    return (
        <div>
            <Button
                variant="ghost"
                onClick={toggleOpen}
                className={`flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${level > 0 ? "ml-4" : ""}`}
            >
                <span>
                    {item.type === "folder" &&
                        (isOpen ? <ChevronDown /> : <ChevronRight />)}
                </span>
                <span>{GetIcon()}</span>
                <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
            </Button>
            {isOpen && item.children && (
                <div className="ml-2">
                    {item.children.map((child, index) => (
                        <FileSystemItem key={index} item={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};
