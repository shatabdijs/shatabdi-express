import http from 'http'

require('dotenv').config()

interface routeMap {
  pattern: string
  id: number
  middleware: any
  callback: any
}

class Shatabdi {
  private request: any | undefined

  private response: any | undefined

  private port: number | string

  private routeMaps: routeMap[] = []

  private mode: number

  private server: http.Server

  constructor(mode: number) {
    this.mode = mode
    this.server = http.createServer()
    this.port = `${process.env.PORT}`
    this.routeMaps = [...this.routeMaps]
  }

  private engine(req: http.IncomingMessage, res: http.ServerResponse) {
    this.request = req
    this.response = res
    res.write('Hello World!')
    res.end()
    console.log(`request hit as ${req.method} on ${req}`)
  }

  public get(patternString: string, middlewareHandler?: any, callbackHandler?: any): void {
    const routeItem = {
      id: Date.now(),
      pattern: patternString,
      middleware: middlewareHandler,
      callback: callbackHandler,
    }
    console.log('=> New route maps for path: ', routeItem.pattern)
    if (middlewareHandler !== undefined) {
      middlewareHandler()
    }

    if (callbackHandler !== undefined) {
      callbackHandler()
    }

    this.routeMaps.push(routeItem)
  }

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
