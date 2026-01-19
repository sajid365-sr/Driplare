import { createContext } from "react";

export interface AlertDialogOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export interface AlertDialogContextType {
  showAlert: (options: AlertDialogOptions) => Promise<boolean>;
}

export const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);
