import { makeRequest } from './makeRequest'

export const getArticles = () => makeRequest<{ data: unknown[] }>({
    url: '/articles',
    method: 'GET'
})

