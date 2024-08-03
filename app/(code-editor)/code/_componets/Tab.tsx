import React from "react";

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({
  isActive,
  onClick,
  onClose,
  children,
}) => {
  return (
    <div
      className={`flex items-center px-4 py-2 border-r border-gray-300 cursor-pointer ${
        isActive ? "bg-white" : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-2">{children}</span>
      <button
        className="ml-2 text-gray-500 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
    </div>
  );
};
