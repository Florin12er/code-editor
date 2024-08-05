import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ContextMenu } from "@radix-ui/react-context-menu";
import {
    FileIcon,
    FolderIcon,
    FolderPlusIcon,
    FilePlusIcon,
} from "lucide-react";
import { StartPageContextMenu } from "./StarPageContextMenu";

export const StartPage = () => {
    return (
        <StartPageContextMenu>
            <div className="min-h-screen flex flex-col items-center text-white">
                <Card className="w-[600px] shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold text-center">
                            Welcome to Code Editor
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-6">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Get Started
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="flex items-center justify-center hover:bg-zinc-200"
                            >
                                <FilePlusIcon className="mr-2 h-5 w-5" />
                                New File
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center hover:bg-zinc-200"
                            >
                                <FolderPlusIcon className="mr-2 h-5 w-5" />
                                New Folder
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center hover:bg-zinc-200"
                            >
                                <FileIcon className="mr-2 h-5 w-5" />
                                Open File
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center hover:bg-zinc-200"
                            >
                                <FolderIcon className="mr-2 h-5 w-5" />
                                Open Folder
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </StartPageContextMenu>
    );
};
