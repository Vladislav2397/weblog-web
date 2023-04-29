import fetch from 'unfetch'

type RequestOptions = {
    url: string
    method?: 'GET' | 'POST'
    data?: unknown
}

// TODO: Realize makeRequest
export const makeRequest = <T extends unknown>(
    { url, method = 'GET', data }: RequestOptions,
    response?,
): Promise<T> =>
    new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(r => {
                resolve(r.json())
            })
            .catch(() => reject())
    })
