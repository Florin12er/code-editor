"use client";
import React from "react";
import dynamic from "next/dynamic";

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    await import("ace-builds/src-noconflict/mode-javascript");
    await import("ace-builds/src-noconflict/mode-golang");
    await import("ace-builds/src-noconflict/theme-monokai");
    await import("ace-builds/src-noconflict/theme-github");
    await import("ace-builds/src-noconflict/ext-language_tools");
    return ace;
  },
  { ssr: false },
);

export const Editor = () => {
  const handleChange = (value) => {
    console.log(value);
    // Handle the editor content change here
  };

  return (
    <div className="w-full h-full">
      <AceEditor
        mode="golang"
        theme="monokai"
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
