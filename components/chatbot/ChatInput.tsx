import React from "react";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
    value: string;
    placeholder: string;
    isListening: boolean;
    onChange: (value: string) => void;
    onSend: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onToggleListening: () => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    value,
    placeholder,
    isListening,
    onChange,
    onSend,
    onKeyDown,
    onToggleListening,
    inputRef,
}) => {
    return (
        <div className="p-5 pt-2 bg-white">
            <div className="relative bg-[#F9F9FB] rounded-[24px] px-4 py-3 border-2 border-gray-300 hover:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary focus-within:hover:border-transparent focus-within:border-transparent transition-all duration-200 ease-in-out">
                <textarea
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-[14px] text-gray-800 placeholder-gray-500 resize-none h-[50px] p-0 leading-relaxed"
                />

                <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-gray-400 font-medium">
                        Driplare AI
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onToggleListening}
                            className={`p-1.5 rounded-full transition-all ${isListening
                                ? "text-red-500 bg-red-100 animate-pulse"
                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                                }`}
                            title="Toggle Listening">
                            <Mic size={18} />
                        </button>

                        <button
                            onClick={onSend}
                            disabled={!value.trim()}
                            className={`p-1.5 rounded-lg transition-all ${value.trim()
                                ? "text-primary hover:bg-primary/10"
                                : "text-gray-300 cursor-not-allowed"
                                }`}
                            title="Send Message"    >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-center text-[11px] text-gray-600 mt-2 font-medium">
                Driplare AI can make mistakes. Double-check replies.
            </p>
        </div>
    );
};