// archflow-frontend/src/utils/authUtils.ts
// Example: A utility to get the token or check if logged in
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const isLoggedIn = (): boolean => {
    const token = getToken();
    // In a real app, you'd also want to decode the token and check its expiry
    // For now, a simple check if token exists is enough
    return !!token;
};

// You could add a more robust JWT decode here if needed
// import jwt_decode from 'jwt-decode';
// interface DecodedToken {
//   id: string;
//   exp: number; // Expiration timestamp
// }
// export const getUserIdFromToken = (): string | null => {
//   const token = getToken();
//   if (token) {
//     try {
//       const decoded: DecodedToken = jwt_decode(token);
//       return decoded.id;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return null;
//     }
//   }
//   return null;
// };