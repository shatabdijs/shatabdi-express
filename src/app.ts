import Shatabdi from './lib/shatabdi'

const app = new Shatabdi(0)

app.get(
  '/home',
  (req, res, proceed) => {
    res.setHeader('X-author', 'Yashkumarverma')
  },
  (req, res) => {
    console.log('rendering route reached')
    res.status(200).json({ error: false })
  },
)

// a simple display route
app.get('/', (req, res) => res.json({ root: true, message: 'this is root directory' }))

app.get(
  '/multiple',
  (req, res) => {
    console.log('middleware 1 hit')
    res.setHeader('X-Middleware-1', 'true')
    return
  },
  (req, res) => {
    console.log('middleware 2 hit')
    res.setHeader('X-Middleware-2', 'true')
    return
  },
  (req, res) => {
    console.log('middleware 3 hit')
    res.setHeader('X-Middleware-3', 'true')
    res.json({ finished: true })
  },
)

app.get('/params/:one/:two/:three/end', (req, res) => {
  res.json(req.params)
})
/**
 * make app listen to port 3000
 */
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
