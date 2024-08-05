// src/utils/aceLanguages.ts

export const loadAceLanguages = async () => {
    const ace = await import("react-ace");

    await import("ace-builds/src-noconflict/mode-javascript");
    await import("ace-builds/src-noconflict/mode-golang");
    await import("ace-builds/src-noconflict/mode-python");
    await import("ace-builds/src-noconflict/mode-ruby");
    await import("ace-builds/src-noconflict/mode-java");
    await import("ace-builds/src-noconflict/mode-c_cpp");
    await import("ace-builds/src-noconflict/mode-java");
    await import("ace-builds/src-noconflict/mode-plain_text");
    await import("ace-builds/src-noconflict/mode-xml");
    await import("ace-builds/src-noconflict/mode-markdown");
    await import("ace-builds/src-noconflict/mode-sql");
    await import("ace-builds/src-noconflict/mode-powershell");
    await import("ace-builds/src-noconflict/mode-perl");
    await import("ace-builds/src-noconflict/mode-rust");
    // Add more languages as needed
    return ace;
};

export const languages = [
    "javascript",
    "golang",
    "python",
    "ruby",
    "java",
    "c_cpp",
    "java",
    "plain_text",
    "xml",
    "markdown",
    "sql",
    "powershell",
    "perl",
    "rust",
] as const;

export type AceLanguage = typeof languages[number];
