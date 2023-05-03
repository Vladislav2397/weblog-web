import { makeRequest } from '../makeRequest'
import type { ArticleApi } from './types'

export const articleApi: ArticleApi = {
    getArticles: () => makeRequest({
        url: '/articles',
        method: 'GET'
    }),
    getArticle: id => makeRequest({
        url: `/articles/${id}`,
        method: 'GET',
    })

}
