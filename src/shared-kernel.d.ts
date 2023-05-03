import type { Image } from "./globals"

export type Article = {
    id: number
    image: Image
    title: string
    description: string
    content: string
}
