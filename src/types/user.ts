export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  role: PermissionLevel[]
}

export type PermissionLevel = 'ADMIN' | 'USER' | 'GUEST';