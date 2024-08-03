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

interface FileSystemItem {
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

export const FileSystemExample: FileSystemItem = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Documents",
      type: "folder",
      children: [
        { name: "document1.txt", type: "file" },
        { name: "document2.txt", type: "file" },
      ],
    },
    {
      name: "Images",
      type: "folder",
      children: [
        { name: "image1.jpg", type: "file" },
        { name: "image2.png", type: "file" },
        {
          name: "another folder",
          type: "folder",
          children: [
            { name: "another level", type: "file" },
            {
              name: "another level",
              type: "folder",
              children: [
                {
                  name: "another one",
                  type: "folder",
                  children: [{ name: "and another one", type: "file" }],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "readme.md", type: "file" },
  ],
};
