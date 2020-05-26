import Shatabdi from './lib/shatabdi'

const app = new Shatabdi(0)

/**
 * Edge case of root url
 */
app.get('/', (req, res) => {
  res.json({
    error: false,
    message: 'this is the root directory',
  })
})

/**
 * Setting custom headers from nth layer
 */
app.get(
  '/home',
  (req, res) => {
    res.setHeader('x-author-name', 'YashKumarVerma')
    res.setHeader('x-author-email', 'yk.verma2000@gmail.com')
  },
  (req, res) => res.send('Check Headers'),
)

/**
 * Using multiple layers and sending headers from each layer
 */
app.get(
  '/multiple',
  (req, res) => {
    res.setHeader('x-middleware-1', 'true')
    res.setHeader('x-middleware-2', 'true')
    return
  },
  (req, res) => {
    res.setHeader('x-middleware-3', 'true')
    res.setHeader('x-middleware-4', 'true')
    return
  },
  (req, res) => {
    res.setHeader('x-middleware-5', 'true')
    res.json({ finished: true })
  },
)

/**
 * Demonstrate data extraction from wildcard routes
 */
app.get('/params/:one/:two/:three/end', (req, res) => {
  res.json(req.params)
})

/**
 * Demonstrate sending custom response code
 */
app.get('/response', (req, res) => {
  res.status(401).json({ status: 'unauthorized' })
})

/**
 * Demonstrate that router doesn't break when no layer provided
 */
app.get('/something')

/**
 * Export to be consumed by server.ts
 */
export default app
