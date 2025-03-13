export interface CustomJwtPayload {
    name: string;
    id: string;
    email: string;
    role: string;
    exp: number; // Expiration time
    iat: number; // Issued at time
    picture: string
  }