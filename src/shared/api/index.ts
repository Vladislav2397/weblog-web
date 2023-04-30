import { makeRequest } from './makeRequest'

export const getArticles = () => makeRequest<{ data: any[] }>({
    url: '/articles',
    method: 'GET'
})

export const getArticle = (id: number) => makeRequest<{ article: any }>({
    url: `/articles/${id}`,
    method: 'GET',
})

