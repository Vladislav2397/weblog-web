/**
 * @param cookie {string}
 * @returns {{ obj: Record<string, string>, getCookieString: (function(cookieObj: Record<string, string>): string) }}
 */
export const cookieParser = cookie => {
    const getCookieString = cookieObj =>
        Object.entries(cookieObj)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')

    if (!cookie) {
        return {
            obj: {},
            getCookieString,
        }
    }

    const parsedCookieArray = cookie.split(/;\s*/)

    const obj = {}

    parsedCookieArray.forEach(item => {
        const match = item.match(/(?<key>.+)=(?<value>.+)/)

        if (match?.groups) {
            const {key, value} = match.groups

            obj[key] = value
        }
    })

    return {obj, getCookieString}
}
