// Re-export from the main AuthContext
// This ensures all components use the same authentication system
export { useAuth, AuthProvider } from '@/contexts/AuthContext'
export type { UserRole, UserProfile } from '@/contexts/AuthContext'
