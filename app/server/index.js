import express from 'express'
import webpack from 'webpack'
import path from 'path'
import bodyParser from 'body-parser'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.config.js'
import yargs from 'yargs'

// yargs default(key, value), Set argv[key] to value if no option was specified on process.argv
// Optionally .default() can take an object that maps keys to default values.
const args = yargs.default('env', 'development').argv
// initialize node express framework
const app = express()
const compiler = webpack(config)
const port = 3000

const middlewareConfig = {
  reload: true,
  stats: {
    hash: false,
    cached: false,
    cachedAssets: false,
    colors: true,
    publicPath: '/'
  }
}

app.use(webpackHotMiddleware(compiler, middlewareConfig))
app.use(webpackMiddleware(compiler, middlewareConfig))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
  response.sendFile(path.resolve('public', 'index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port} in ${args.env} environment`))
