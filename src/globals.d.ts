// declare namespace global {
//     type Maybe<T> = T | null
// }

/* HELPERS */
export type Maybe<T> = T | null
export type PartialPick<T, U extends keyof T> = Partial<Pick<T, U>>

export type Image = {
    src: string
    alt: string
}

export { }
