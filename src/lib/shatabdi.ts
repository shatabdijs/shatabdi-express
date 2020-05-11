import http from 'http'

require('dotenv').config()

class Shatabdi {
  port: string

  constructor() {
    this.port = `${process.env.PORT}`
  }

  // listen to port
  listen = (port: number, callback: any) => {
    http.createServer().listen(port || this.port)
    callback()
  }
}

export default Shatabdi
