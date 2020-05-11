import Shatabdi from './lib/shatabdi'

const app = new Shatabdi()

/**
 * make app listen to port 3000
 */
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
