/**
 * Hook to record the raw IP address of the node.js server connection.
 * 
 * See ip.js how to read the true IP.
 */

import { SvelteKitAuth } from "@auth/sveltekit";

// Expose this global so we can read inside load(), etc.
export let requestIp: string;

export const handle = async ({ event, resolve }) => {
  requestIp = event.getClientAddress(); // IP from Client Request
  console.log('IP Address from Client Request: ', requestIp);

  // Return the requestIp along with the authentication result
  const authResult: any = await SvelteKitAuth({
    resolve,
  })({ event, resolve });

  return authResult;
};

export default handle;