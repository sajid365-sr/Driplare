
interface AdminCredentials {
  userId: string;
  apiKey: string;
}

// Store admin credentials in localStorage
export const setAdminCredentials = (userId: string, apiKey: string): void => {
  const credentials: AdminCredentials = { userId, apiKey };
  localStorage.setItem('driplare_admin_credentials', JSON.stringify(credentials));
};

// Get admin credentials from localStorage
export const getAdminCredentials = (): AdminCredentials | null => {
  const stored = localStorage.getItem('driplare_admin_credentials');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as AdminCredentials;
  } catch (error) {
    console.error('Failed to parse admin credentials:', error);
    return null;
  }
};

// Clear admin credentials from localStorage
export const clearAdminCredentials = (): void => {
  localStorage.removeItem('driplare_admin_credentials');
};

// Mock list of admins
const initialAdmins = [
  { userId: 'admin', apiKey: 'secret-key-1' },
  { userId: 'manager', apiKey: 'secret-key-2' }
];

// Get admins from localStorage or use initial list
export const getAdmins = (): { userId: string; apiKey: string }[] => {
  const stored = localStorage.getItem('driplare_admins_list');
  if (!stored) {
    // Initialize with the default list
    localStorage.setItem('driplare_admins_list', JSON.stringify(initialAdmins));
    return initialAdmins;
  }
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse admins list:', error);
    return [];
  }
};

// Add a new admin
export const addAdmin = (userId: string, apiKey: string): void => {
  const admins = getAdmins();
  // Check if admin already exists
  if (admins.some(admin => admin.userId === userId)) {
    throw new Error('Admin with this User ID already exists');
  }
  
  admins.push({ userId, apiKey });
  localStorage.setItem('driplare_admins_list', JSON.stringify(admins));
};

// Remove an admin
export const removeAdmin = (userId: string): void => {
  const admins = getAdmins();
  const updatedAdmins = admins.filter(admin => admin.userId !== userId);
  localStorage.setItem('driplare_admins_list', JSON.stringify(updatedAdmins));
};
