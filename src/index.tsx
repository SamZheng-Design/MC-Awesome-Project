import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/cloudflare-pages'

// Import routes
import apiRoutes from './routes/api'
import pageRoutes from './routes/pages'

type Bindings = {
  DB: D1Database
  OPENAI_API_KEY: string
  OPENAI_BASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', logger())
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic())

// API Routes
app.route('/api', apiRoutes)

// Page Routes
app.route('/', pageRoutes)

export default app
