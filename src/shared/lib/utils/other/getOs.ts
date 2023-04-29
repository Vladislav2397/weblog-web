import {Maybe} from "@/shared/types/helpers";

export default function getOs(): Maybe<string>{
    let os: Maybe<string> = null

    if (typeof window !== 'undefined') {
        const { userAgent } = window.navigator
        const { platform } = window.navigator
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
        const iosPlatforms = ['iPhone', 'iPad', 'iPod']

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'mac'
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'ios'
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'windows'
        } else if (/Android/.test(userAgent)) {
            os = 'android'
        } else if (!os && /Linux/.test(platform)) {
            os = 'linux'
        }
    }

    return os
}
