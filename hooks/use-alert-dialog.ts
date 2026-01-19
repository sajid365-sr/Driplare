import { useContext } from "react";
import { AlertDialogContext } from "@/contexts/AlertDialogContext";

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog must be used within AlertDialogProvider");
  }
  return context;
};
