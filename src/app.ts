import Shatabdi from './lib/shatabdi'

const app = new Shatabdi()

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
