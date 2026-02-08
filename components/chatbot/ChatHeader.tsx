import React from "react";
import { FileText, RotateCcw, ChevronDown } from "lucide-react";
import { ChatMode } from "./chatbot-config";


interface ChatHeaderProps {
    mode: ChatMode;
    hasMessages: boolean;
    onDownload: () => void;
    onClear: () => void;
    onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    mode,
    hasMessages,
    onDownload,
    onClear,
    onClose,
}) => {
    return (
        <div className="px-5 py-3 flex justify-between items-center bg-white border-b border-gray-50">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800">Driplare</h2>
                {mode !== "support" && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full capitalize">
                        {mode}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-1">
                {hasMessages && (
                    <>
                        <button
                            onClick={onDownload}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Download Chat"
                        >
                            <FileText size={18} />
                        </button>
                        <button
                            onClick={onClear}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="New Chat"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </>
                )}
                <button
                    title="Close Chat"
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronDown size={20} />
                </button>
            </div>
        </div>
    );
};