// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw'
// eslint-disable-next-line import/no-extraneous-dependencies
const { setupServer } = require('msw/node')

const worker = setupServer(
    rest.get('http://localhost:8080/api/articles', (req, res, ctx) => res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
            articles: [
                {
                    id: 1,
                    image: {
                        src: 'path/to/src',
                        alt: 'alt'
                    },
                    title: 'some title',
                    description: 'maybe description',
                    content: 'some content',
                },
                {
                    id: 2,
                    image: {
                        src: 'path/to/src',
                        alt: 'alt'
                    },
                    title: 'some title',
                    description: 'maybe description',
                    content: 'some content',
                },
                {
                    id: 3,
                    image: {
                        src: 'path/to/src',
                        alt: 'alt'
                    },
                    title: 'some title',
                    description: 'maybe description',
                    content: 'some content',
                },
            ]
        })
    ))
)

