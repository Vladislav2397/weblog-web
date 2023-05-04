import type { ArticleApi } from './types'

export const articleApi: ArticleApi = {
    async getArticles() {
        return {
            articles: {
                data: Array.from(articles.values())
            }
        }
    },
    async getArticle(id) {
        const article = articles.get(`${id}`)

        if (!article) {
            throw new Error('article not found')
        }

        return { article }
    }
}

const articles = new Map([
    ['1', {
        id: 1,
        title: 'title 1',
        description: 'description',
        image: {
            src: 'path/to/src',
            alt: 'alt'
        },
        content: `## Hello world
        ### first article
        This is a **first article** on this site and I'm glad to see you.
        Article will write to markdown syntax`,
    }],
    ['2', {
        id: 2,
        title: 'title 2',
        description: 'description',
        image: {
            src: 'path/to/src',
            alt: 'alt'
        },
        content: '<p>some content for article</p>',
    }],
    ['3', {
        id: 3,
        title: 'title 3',
        description: 'description',
        image: {
            src: 'path/to/src',
            alt: 'alt'
        },
        content: '<p>some content for article</p>',
    }]
])
