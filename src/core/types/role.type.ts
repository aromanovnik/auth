export const roleType = ['user', 'moderator', 'admin'] as const;
export type RoleType = (typeof roleType)[number];
