import { jwtDecode } from "jwt-decode";

export function expiredToken(
    token: string
): boolean {
    const jwtPayload = jwtDecode(token);
    const expireInSeconds = jwtPayload.exp;
    
    const currentTimestampInSeconds = Date.now() / 1000;
  
    return expireInSeconds == null || 
        expireInSeconds < currentTimestampInSeconds;
}
