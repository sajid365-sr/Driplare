// Types for audit log entries
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details?: string;
  module?: string;
}

// Audit log actions
export enum AuditAction {
  LOGIN = "Login",
  LOGOUT = "Logout",
  VIEW = "View",
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
  EXPORT = "Export",
  API_KEY_TEST = "API Key Test",
  CONTENT_SYNC = "Content Sync",
  SETTINGS_UPDATE = "Settings Update",
}

// Local storage key for audit logs
const AUDIT_LOGS_KEY = "driplare_audit_logs";

/**
 * Get all audit logs
 */
export const getAuditLogs = (): AuditLogEntry[] => {
  const logs = localStorage.getItem(AUDIT_LOGS_KEY);
  if (!logs) return [];
  
  try {
    return JSON.parse(logs);
  } catch (error) {
    console.error("Failed to parse audit logs:", error);
    return [];
  }
};

/**
 * Add a new audit log entry
 */
export const logAuditEvent = (
  userId: string, 
  action: AuditAction | string, 
  details?: string,
  module?: string
): void => {
  const logs = getAuditLogs();
  
  const newLog: AuditLogEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    userId,
    action,
    details,
    module
  };
  
  logs.unshift(newLog); // Add to the beginning
  
  // Keep only the most recent 1000 logs
  const trimmedLogs = logs.slice(0, 1000);
  
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(trimmedLogs));
};

/**
 * Filter audit logs
 */
export const filterAuditLogs = (
  filters: {
    userId?: string;
    action?: string;
    module?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }
): AuditLogEntry[] => {
  const logs = getAuditLogs();
  
  return logs.filter(log => {
    const logDate = new Date(log.timestamp);
    
    if (filters.userId && log.userId !== filters.userId) return false;
    if (filters.action && log.action !== filters.action) return false;
    if (filters.module && log.module !== filters.module) return false;
    if (filters.dateFrom && logDate < filters.dateFrom) return false;
    if (filters.dateTo && logDate > filters.dateTo) return false;
    
    return true;
  });
};

/**
 * Clear all audit logs
 */
export const clearAuditLogs = (): void => {
  localStorage.removeItem(AUDIT_LOGS_KEY);
};

/**
 * Generate a simple ID
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
