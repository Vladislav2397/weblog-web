export type ArticleItem = {
    id: number
    title: string
    description: string
    image: {
        src: string
        alt: string
    }
}

export type ArticleDetail = ArticleItem & {
    content: string
}

export type ArticleApi = {
    getArticles(): Promise<{ articles: { data: ArticleItem[] } }>
    getArticle(id: number): Promise<{ article: ArticleDetail }>
}
