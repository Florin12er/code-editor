"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SidebarContextMenu } from "./SideBarContextMenu";
import { useUser } from "@clerk/clerk-react";

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
    const [projectFiles, setProjectFiles] = useState<any[]>([]);
    const [projectFolders, setProjectFolders] = useState<any[]>([]); // Initialize as an array
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [newFileContent, setNewFileContent] = useState("");
    const [newFileLanguage, setNewFileLanguage] = useState("javascript");
    const [newFileIcon, setNewFileIcon] = useState("icon.png");
    const [newFolderName, setNewFolderName] = useState("");
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [currentProject, setCurrentProject] = useState<{ id: string; name: string } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { user } = useUser();

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
            resizeHandle.addEventListener("mousedown", startResizing);
        }
        return () => {
            if (resizeHandle) {
                resizeHandle.removeEventListener("mousedown", startResizing);
            }
        };
    }, [startResizing]);

    const fetchProjectFilesAndFolders = (projectId: string) => {
        fetch("/files/getfile")
            .then(response => response.json())
            .then(data => {
                const filteredFiles = data.filter((file: any) => file.projectId === projectId);
                setProjectFiles(filteredFiles);
            })
            .catch(error => console.error("Error fetching project files:", error));

        fetch(`/folders/get?projectId=${projectId}`)
            .then(response => response.json())
            .then(data => setProjectFolders(Array.isArray(data) ? data : [])) // Ensure data is an array
            .catch(error => console.error("Error fetching project folders:", error));
    };

    useEffect(() => {
        const storedProject = localStorage.getItem("currentProject");
        if (storedProject) {
            const project = JSON.parse(storedProject);
            setCurrentProject(project);
            fetchProjectFilesAndFolders(project.id);
        }
    }, []);

    const handleCreateFile = () => {
        if (!currentProject) {
            setErrorMessage("Make a project first before creating a file.");
            return;
        }

        fetch("/files/createfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newFileName,
                content: newFileContent,
                language: newFileLanguage,
                file_icon: newFileIcon,
                projectId: currentProject.id,
            }),
        })
            .then(response => response.json())
            .then(() => {
                setIsCreatingFile(false);
                setNewFileName("");
                setNewFileContent("");
                setNewFileLanguage("javascript");
                setNewFileIcon("icon.png");
                fetchProjectFilesAndFolders(currentProject.id);
            })
            .catch(error => console.error("Error creating file:", error));
    };

    const handleCreateFolder = () => {
        if (!currentProject) {
            setErrorMessage("Make a project first before creating a folder.");
            return;
        }

        fetch("/folders/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newFolderName,
                projectId: currentProject.id,
            }),
        })
            .then(response => response.json())
            .then(() => {
                setIsCreatingFolder(false);
                setNewFolderName("");
                fetchProjectFilesAndFolders(currentProject.id);
            })
            .catch(error => console.error("Error creating folder:", error));
    };

    const handleNewProject = () => {
        setIsCreatingProject(true);
    };

    const handleCreateProject = () => {
        if (!user) {
            console.error("User not logged in");
            return;
        }

        fetch("/project/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newProjectName,
                description: newProjectDescription,
                clerkUserId: user.id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const newProject = { id: data.projectId, name: newProjectName };
                setCurrentProject(newProject);
                localStorage.setItem("currentProject", JSON.stringify(newProject));
                setIsCreatingProject(false);
                setNewProjectName("");
                setNewProjectDescription("");
                setIsCreatingFile(true);
            })
            .catch(error => console.error("Error creating project:", error));
    };

    return (
        <div
            ref={sidebarRef}
            className={`bg-gray-100 dark:bg-gray-800 flex flex-col overflow-x-hidden relative ${position === "left" ? "order-first" : "order-last"
                }`}
            style={{ width: `${width}px`, minWidth: "50px" }}
        >
            <SidebarContextMenu onCreateNewProject={handleNewProject} onNewFile={() => setIsCreatingFile(true)} onNewFolder={() => setIsCreatingFolder(true)}>
                <div className="p-4">
                    {currentProject ? (
                        <div className="mb-4">
                            <strong>Current Project:</strong> {currentProject.name}
                        </div>
                    ) : (
                        <div className="mb-4 text-red-500">
                            No project selected. Please create a project.
                        </div>
                    )}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                </div>

                <div className="p-4 flex-grow">
                    <strong>Folders:</strong>
                    {projectFolders.map((folder: any, index: number) => (
                        <div key={index}>{folder.name}</div>
                    ))}
                </div>

                <div className="p-4 flex-grow">
                    <strong>Files:</strong>
                    {projectFiles.map((file: any, index: number) => (
                        <div key={index}>{file.name}</div>
                    ))}
                </div>

                <div className="p-4 flex-grow">
                    {isCreatingFile && (
                        <div className="p-2">
                            <input
                                type="text"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                className="w-full p-1 border border-gray-300 rounded mb-2"
                                placeholder="Enter file name"
                                autoFocus
                            />
                            <textarea
                                value={newFileContent}
                                onChange={(e) => setNewFileContent(e.target.value)}
                                className="w-full p-1 border border-gray-300 rounded mb-2"
                                placeholder="Enter file content"
                            />
                            <input
                                type="text"
                                value={newFileLanguage}
                                onChange={(e) => setNewFileLanguage(e.target.value)}
                                className="w-full p-1 border border-gray-300 rounded mb-2"
                                placeholder="Enter file language"
                            />
                            <input
                                type="text"
                                value={newFileIcon}
                                onChange={(e) => setNewFileIcon(e.target.value)}
                                className="w-full p-1 border border-gray-300 rounded mb-2"
                                placeholder="Enter file icon"
                            />
                            <button
                                onClick={handleCreateFile}
                                className="w-full p-1 bg-blue-500 text-white rounded"
                            >
                                Create File
                            </button>
                        </div>
                    )}

                    {isCreatingFolder && (
                        <div className="p-2">
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                className="w-full p-1 border border-gray-300 rounded mb-2"
                                placeholder="Enter folder name"
                                autoFocus
                            />
                            <button
                                onClick={handleCreateFolder}
                                className="w-full p-1 bg-blue-500 text-white rounded"
                            >
                                Create Folder
                            </button>
                        </div>
                    )}
                </div>

                {isCreatingProject && (
                    <div className="p-4">
                        <input
                            type="text"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded mb-2"
                            placeholder="Enter project name"
                            autoFocus
                        />
                        <textarea
                            value={newProjectDescription}
                            onChange={(e) => setNewProjectDescription(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded mb-2"
                            placeholder="Enter project description"
                        />
                        <button
                            onClick={handleCreateProject}
                            className="w-full p-1 bg-blue-500 text-white rounded"
                        >
                            Create Project
                        </button>
                    </div>
                )}
            </SidebarContextMenu>
            <div
                ref={resizeHandleRef}
                className={`absolute top-0 bottom-0 w-1 cursor-col-resize ${position === "left" ? "-right-0.5" : "-left-0.5"
                    } bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500`}
            />
        </div>
    );
};
