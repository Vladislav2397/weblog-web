import { cookieParser } from './cookieParser'

/**
 * @param request {{cookie: string}}
 */
export function createCookie(request) {
    return cookieParser(request.cookie).obj
}
