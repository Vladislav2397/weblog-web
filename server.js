const domain = 'weblog.ru'
/* eslint-disable */

const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const session = require('express-session')
const compression = require('compression')
const microcache = require('route-cache')
const cors = require('cors')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const useragent = require('express-useragent')

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()
app.use(cors({ origin: 'https://weblog.ru' }))

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }),
)

const nodemailer = require('nodemailer')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(bodyParser.json({ limit: '10mb', extended: true }))

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'siteinformingservice@gmail.com',
        pass: 'xftywqtydjouxmtl',
    },
})

let device = require('express-device')
app.use(device.capture())

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            cache: LRU({
                max: 1000,
                ttl: 60 * 60 * 24 * 365,
            }),
            basedir: resolve('./dist'),
            runInNewContext: false,
        }),
    )
}

let renderer
let readyPromise
const templatePath = resolve('./src/app/index.template.html')

if (isProd) {
    // In production: create server renderer using template and built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        template,
        clientManifest,
    })
} else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require('./build/setup-dev-server')(app, templatePath, (bundle, options) => {
        renderer = createRenderer(bundle, options)
    })
}

const serve = (dir, cache) =>
    express.static(resolve(dir), {
        maxAge: cache && isProd ? '1y' : 0,
    })

app.use(compression({ threshold: 0 }))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/robots.txt', serve('./public/robots.txt', true))
app.use('/sitemap.xml', serve('./public/sitemap.xml', true))
app.use('/favicon', serve('./public/favicon', true))
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))
app.use(useragent.express())

function detectIeByUserAgent(userAgent) {
    const lowerCase = userAgent.toLowerCase()

    return (
        lowerCase.indexOf('trident') !== -1 ||
        (lowerCase.indexOf('msie') !== -1 ? parseInt(lowerCase.split('msie')[1], 10) : false)
    )
}

function render(req, res) {
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length)
        res.redirect(301, req.path.slice(0, -1) + query)
        return
    }

    const htmlClasses = []

    if (!req.useragent.isMac) {
        htmlClasses.push('custom-scroll-bar')
    }

    if (req.useragent.isIE) {
        htmlClasses.push('browser-ie')
    }

    const context = {
        req,
        title: '',
        device: req.device.type.toLowerCase(),
        url: req.url,
        meta: '',
        shareImage: '',
        language: req.url.split('/')[1],
        production: isProd,
        htmlClass: htmlClasses.join(' '),
        domain,
    }

    let s = Date.now()
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Server', serverInfo)
    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).sendFile(path.join(__dirname + '/content/404' + context.language + '.html'))
        } else {
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }

        res.send(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

app.get(
    '*',
    isProd
        ? render
        : (req, res) => {
              readyPromise.then(() => render(req, res))
          },
)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
