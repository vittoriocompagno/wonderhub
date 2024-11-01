// Import the handleAuth function from the Kinde Auth library for Next.js
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// Export a GET request handler that uses the handleAuth function
// This sets up authentication handling for the GET request on this route
export const GET = handleAuth();


