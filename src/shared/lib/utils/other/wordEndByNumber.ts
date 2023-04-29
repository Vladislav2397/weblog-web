export function wordEndByNumber(
    word: string,
    number: number | string,
    endings: string[],
): string {
    const cases = [2, 0, 1, 1, 1, 2]
    const formattedNumber = parseFloat(number.toString())
    return `${word}${
        endings[
            formattedNumber % 100 > 4 && formattedNumber % 100 < 20
                ? 2
                : cases[formattedNumber % 10 < 5 ? formattedNumber % 10 : 5]
        ]
    }`
}
