export default function isElementInViewport(el: HTMLElement | Node) {
    const rect = (el as HTMLElement).getBoundingClientRect()
    return {
        y:
            rect.top >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight),
        x: rect.left >= 0 && rect.right <= window.innerWidth,
    }
}
