"use client";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SideBar } from "./_componets/Sidebar";
import { NavBar } from "./_componets/NavBar";
import { BottomBar } from "./_componets/BottomBar";
import { SearchProvider } from "@/components/providers/search-provider";
import { SearchCommand } from "./_componets/Search";
import { CommandPalette } from "./_componets/CommandPallete";
import { BreadcrumbNav } from "./_componets/Breadcrumb";

interface CodeLayoutProps {
    children: React.ReactNode;
    sidebarPosition?: "left" | "right";
}

const CodeLayout: React.FC<CodeLayoutProps> = ({
    children,
    sidebarPosition = "left",
}) => {
    const { isLoaded } = useAuth();
    const [showContent, setShowContent] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => setShowContent(true), 10);
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        document.addEventListener("mouseup", handleMouseUp);
        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, []);

    if (!showContent) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }
    // Placeholder breadcrumb items
    const breadcrumbItems = [
        { label: "Project", href: "/project" },
        { label: "src", href: "/project/src" },
        { label: "components", href: "/project/src/components" },
        { label: "Button.tsx", href: "/project/src/components/Button.tsx" },
    ];


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <SearchProvider>
            <div className="h-screen flex flex-col overflow-hidden">
                <NavBar />
                <div className="bg-gray-100 dark:bg-gray-800 px-6 py-2 shadow-sm">
                    <BreadcrumbNav items={breadcrumbItems} />
                </div>
                <div
                    className={`flex flex-1 overflow-hidden ${isDragging ? "cursor-col-resize" : ""}`}
                >
                    {sidebarPosition === "left" && isSidebarOpen && (
                        <SideBar position="left" setIsDragging={setIsDragging} />
                    )}
                    <main className="flex-1 overflow-y-auto p-4 dark:bg-[#1F1F1F]">
                        {children}
                    </main>
                    {sidebarPosition === "right" && isSidebarOpen && (
                        <SideBar position="right" setIsDragging={setIsDragging} />
                    )}
                </div>
                <BottomBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
            <SearchCommand />
            <CommandPalette />
        </SearchProvider>
    );
};

export default CodeLayout;
