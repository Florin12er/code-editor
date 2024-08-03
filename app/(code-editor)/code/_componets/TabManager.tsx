import React, { useState } from "react";
import { Tab } from "./Tab";
import { Editor } from "./EditFile";
import { StartPage } from "./StartPage";

interface TabData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const TabManager: React.FC = () => {
  const [tabs, setTabs] = useState<TabData[]>([
    { id: "start", title: "Start", content: <StartPage /> },
  ]);
  const [activeTabId, setActiveTabId] = useState("start");

  const openNewTab = () => {
    const newTab: TabData = {
      id: `editor-${Date.now()}`,
      title: `Untitled-${tabs.length}`,
      content: <Editor />,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex bg-gray-200">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            isActive={activeTabId === tab.id}
            onClick={() => setActiveTabId(tab.id)}
            onClose={() => closeTab(tab.id)}
          >
            {tab.title}
          </Tab>
        ))}
        <button
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
          onClick={openNewTab}
        >
          +
        </button>
      </div>
      <div className="flex-grow overflow-auto">
        {tabs.find((tab) => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
};
