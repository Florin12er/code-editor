import { Code } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2 font-bold">
      <div className="p-1 bg-blue-600 rounded-md">
        <Code className="w-8 h-8 text-white" />
      </div>
      <span className="text-xl text-gray-800 hidden sm:inline">
        Code<span className="text-blue-600">Editor</span>
      </span>
    </div>
  );
};
