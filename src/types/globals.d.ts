/* eslint-disable ts/consistent-type-definitions */
export {};

export type Roles = "admin" | "member";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
