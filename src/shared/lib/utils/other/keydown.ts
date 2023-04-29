type Keys = 'enter' | 'esc'

export type KeydownCallbackItem = {
    callback: () => void
    key: Keys
}

export function onKeydown(event: KeyboardEvent, array: KeydownCallbackItem[]) {
    const mapKeyCode = {
        enter: 13,
        esc: 27,
    } as Record<Keys, number>

    array.forEach(item => {
        if (mapKeyCode[item.key] === event.keyCode) {
            item.callback()
        }
    })
}
