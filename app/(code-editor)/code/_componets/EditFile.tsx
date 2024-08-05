"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeEditorContextMenu } from "./CodeEditorContextMenu";
import { loadAceThemes, themes, AceTheme } from "@/utils/aceThemes";
import { loadAceLanguages, languages, AceLanguage } from "@/utils/aceLanguages";

const AceEditor = dynamic(
    async () => {
        const ace = await import("react-ace");
        await loadAceThemes();
        await loadAceLanguages();
        await import("ace-builds/src-noconflict/ext-language_tools");
        await import("ace-builds/src-noconflict/keybinding-vim");
        return ace;
    },
    { ssr: false, loading: () => <Skeleton /> }
);

interface EditorProps {
    initialTheme?: AceTheme;
    initialLanguage?: AceLanguage;
    fontSize?: number;
    initialVimMode?: boolean;
    initialShowLineNumbers?: boolean;
    initialShowRelativeLineNumbers?: boolean;
    enableFolding?: boolean;
}

export const Editor: React.FC<EditorProps> = ({
    initialTheme = "monokai",
    initialLanguage = "javascript",
    fontSize = 14,
    initialVimMode = false,
    initialShowLineNumbers = true,
    initialShowRelativeLineNumbers = false,
    enableFolding = true // Default to true
}) => {
    const [theme, setTheme] = useState<AceTheme>(initialTheme);
    const [language, setLanguage] = useState<AceLanguage>(initialLanguage);
    const [vimMode, setVimMode] = useState<boolean>(initialVimMode);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(initialShowLineNumbers);
    const [showRelativeLineNumbers, setShowRelativeLineNumbers] = useState(initialShowRelativeLineNumbers);

    useEffect(() => {
        Promise.all([loadAceThemes(), loadAceLanguages()]).then(() => setIsLoaded(true));
    }, []);

    const handleChange = (value: string) => {
        console.log(value);
        // Handle the editor content change here
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value as AceTheme);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as AceLanguage);
    };

    const handleVimModeToggle = () => {
        setVimMode(!vimMode);
    };

    const handleLineNumbersToggle = () => {
        setShowLineNumbers(!showLineNumbers);
    };

    const handleRelativeLineNumbersToggle = () => {
        setShowRelativeLineNumbers(!showRelativeLineNumbers);
    };

    if (!isLoaded) {
        return (
            <div className="w-full h-full">
                <Skeleton className="w-full h-10 mb-2" />
                <Skeleton className="w-full h-10 mb-2" />
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    return (
        <CodeEditorContextMenu>
            <div className="w-full h-full">
                <div className="mb-2 flex items-center space-x-4">
                    <div>
                        <label htmlFor="theme-select" className="mr-2">Theme:</label>
                        <select id="theme-select" value={theme} onChange={handleThemeChange} className="p-1 border rounded">
                            {themes.map((themeName) => (
                                <option key={themeName} value={themeName}>
                                    {themeName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="language-select" className="mr-2">Language:</label>
                        <select id="language-select" value={language} onChange={handleLanguageChange} className="p-1 border rounded">
                            {languages.map((languageName) => (
                                <option key={languageName} value={languageName}>
                                    {languageName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="vim-mode-toggle" className="mr-2">Vim Mode:</label>
                        <input
                            id="vim-mode-toggle"
                            type="checkbox"
                            checked={vimMode}
                            onChange={handleVimModeToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="line-numbers-toggle" className="mr-2">Line Numbers:</label>
                        <input
                            id="line-numbers-toggle"
                            type="checkbox"
                            checked={showLineNumbers}
                            onChange={handleLineNumbersToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="relative-line-numbers-toggle" className="mr-2">Relative Line Numbers:</label>
                        <input
                            id="relative-line-numbers-toggle"
                            type="checkbox"
                            checked={showRelativeLineNumbers}
                            onChange={handleRelativeLineNumbersToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div>
                </div>
                <AceEditor
                    mode={language}
                    theme={theme}
                    onChange={handleChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: showLineNumbers,
                        relativeLineNumbers: showRelativeLineNumbers,
                        tabSize: 2,
                        fontSize: fontSize,
                        foldStyle: enableFolding ? "markbegin" : "manual" // Enable folding
                    }}
                    keyboardHandler={vimMode ? "vim" : undefined}
                    style={{ width: "100%", height: "calc(100% - 40px)" }}
                    onLoad={(editor) => {
                        console.log('Editor loaded');
                        editor.renderer.setShowGutter(showLineNumbers);
                        if (enableFolding) {
                            editor.session.setFoldStyle("markbegin"); // Set fold style
                        }
                    }}
                />
            </div>
        </CodeEditorContextMenu>
    );
}
