// src/utils/aceThemes.ts

export const loadAceThemes = async () => {
    const ace = await import("react-ace");
    await import("ace-builds/src-noconflict/theme-chrome");
    await import("ace-builds/src-noconflict/theme-clouds");
    await import("ace-builds/src-noconflict/theme-crimson_editor");
    await import("ace-builds/src-noconflict/theme-dawn");
    await import("ace-builds/src-noconflict/theme-dreamweaver");
    await import("ace-builds/src-noconflict/theme-eclipse");
    await import("ace-builds/src-noconflict/theme-github");
    await import("ace-builds/src-noconflict/theme-solarized_dark");
    await import("ace-builds/src-noconflict/theme-monokai");
    await import("ace-builds/src-noconflict/theme-terminal");
    await import("ace-builds/src-noconflict/theme-textmate");
    await import("ace-builds/src-noconflict/theme-tomorrow");
    await import("ace-builds/src-noconflict/theme-twilight");
    await import("ace-builds/src-noconflict/theme-dracula");
    await import("ace-builds/src-noconflict/theme-nord_dark");

    return ace;
};

export const themes = [
    "chrome",
    "clouds",
    "crimson_editor",
    "dawn",
    "dreamweaver",
    "eclipse",
    "github",
    "solarized_dark",
    "monokai",
    "terminal",
    "textmate",
    "tomorrow",
    "twilight",
    "dracula",
    "nord_dark",
] as const;

export type AceTheme = typeof themes[number];
