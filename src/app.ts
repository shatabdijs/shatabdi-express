import Shatabdi from './lib/shatabdi'

const app = new Shatabdi(0)

app.get(
  '/',
  () => console.log('~ this is a middleware'),
  () => console.log('~ this is a callback'),
)

app.get(
  '/home',
  () => console.log('~ this is a middleware'),
  () => console.log('~ this is a callback'),
)

/**
 * make app listen to port 3000
 */
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
