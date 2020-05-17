import http from 'http'
import Shatabdi from './lib/shatabdi'

const app = new Shatabdi(0)

app.get(
  '/',
  (req: any, res: any) => {
    console.log('middleware hit')
  },
  (req: http.IncomingMessage, res: any) => {
    res.status(400).json({
      error: true,
    })
  },
)

app.get(
  '/home',
  () => console.log('~ this is a middleware'),
  (req: any, res: any) => {
    res.json({
      route: 'home',
      data: true,
    })
  },
)

/**
 * make app listen to port 3000
 */
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
