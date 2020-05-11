import http from 'http'

require('dotenv').config()

class Shatabdi {
  port: string

  constructor() {
    this.port = `${process.env.PORT}`
  }

  /**
   * function to listen for requests on port
   * @param port port on which the app must listen for requests
   * @param callback callback function to run when server is created
   * @returns void
   */
  listen(port: number, callback?: any): void {
    try {
      http.createServer().listen(port || this.port)
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default Shatabdi
