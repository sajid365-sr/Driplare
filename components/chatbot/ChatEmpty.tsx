import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ChatConfig } from "./chatbot-config";

interface ChatEmptyProps {
    config: ChatConfig;
    onQuestionClick: (prompt: string) => void;
    onQuestionHover: (prompt: string) => void;
    onQuestionLeave: () => void;
}

export const ChatEmpty: React.FC<ChatEmptyProps> = ({
    config,
    onQuestionClick,
    onQuestionHover,
    onQuestionLeave,
}) => {
    return (
        <div className="flex flex-col items-center mt-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-primary/20 shadow-lg"
            >
                <Sparkles className="text-white" size={20} />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
                {config.greeting}
            </h3>
            <p className="text-gray-500 text-center mb-6 text-sm px-4 leading-relaxed">
                {config.subtitle}
            </p>

            <div className="w-full space-y-0">
                {config.starterQuestions.map((q) => {
                    const IconComponent = q.icon as React.ComponentType<{
                        size?: number;
                        className?: string;
                    }>;
                    return (
                        <button
                            onMouseEnter={() => onQuestionHover(q.prompt)}
                            onMouseLeave={onQuestionLeave}
                            key={q.id}
                            onClick={() => onQuestionClick(q.prompt)}
                            className="w-full flex items-center gap-3 p-3.5 bg-white hover:bg-gray-100 rounded-sm text-left border-b-2 text-[13px] font-medium text-gray-700 transition-all group"
                        >
                            <IconComponent size={16} className="text-primary" />
                            {q.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};