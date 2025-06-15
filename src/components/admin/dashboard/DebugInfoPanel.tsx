
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DebugInfoPanelProps {
  debugInfo: string;
}

export function DebugInfoPanel({ debugInfo }: DebugInfoPanelProps) {
  if (!debugInfo) return null;

  return (
    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border text-sm">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
          {debugInfo}
        </div>
      </div>
    </div>
  );
}
