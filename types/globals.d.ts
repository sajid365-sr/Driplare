export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "user" | "system_admin";
    };
  }
}
