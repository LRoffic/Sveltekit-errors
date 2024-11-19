import {requestIp} from "./hooks.server";

/**
 * Read the client IP address in reverse proxy compliant manner.
 * 
 * Only applicable to Node.js adapter, others, server-side rendering.
 * 
 * @param {*} request Request object from page load.
 */
export function getClientTrueIp(request) {
    // Read about spoofing https://kit.svelte.dev/docs/adapter-node#environment-variables-addressheader-and-xffdepth
    // Prefer CloudFlare's unspoofable header
    return request.headers.get("CF-Connecting-IP") || request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || requestIp || "127.0.0.1" || "::1";
}
