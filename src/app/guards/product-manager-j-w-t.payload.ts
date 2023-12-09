import {JwtPayload} from "jwt-decode";

export interface ProductManagerJWTPayload extends JwtPayload {
  roles: string[]
}
