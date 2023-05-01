// import axios from 'axios'
// import unfetch from 'unfetch'
// eslint-disable-next-line import/no-extraneous-dependencies
// import ky from 'ky-universal'
import fetch from 'isomorphic-fetch'

type RequestOptions = {
    url: string
    method?: 'GET' | 'POST'
    data?: unknown
}

// TODO: Realize makeRequest
export const makeRequest = <T extends unknown>(
    { url, method = 'GET', data }: RequestOptions
): Promise<T> =>
    new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api${url}`)
            .then(r => {
                resolve(r.json())
            })
            .catch(reject)
    })
