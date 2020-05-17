import http from 'http'

require('dotenv').config()

class Shatabdi {
  req: any

  res: any

  port: string

  constructor() {
    this.port = `${process.env.PORT}`
  }

  engine(req: http.RequestOptions, res: http.ServerResponse) {
    this.req = req
    this.res = res
    res.write('Hello World!')
    res.end()
  }

  /**
   * function to listen for requests on port
   * @param port port on which the app must listen for requests
   * @param callback callback function to run when server is created
   * @returns void
   */
  listen(port: number, callback?: any): void {
    try {
      http.createServer(this.engine).listen(port || this.port)
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default Shatabdi
