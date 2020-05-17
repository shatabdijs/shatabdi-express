import http from 'http'

import { routeMap } from './shatabdi.interfaces'
import Response from './response'

require('dotenv').config()

interface framework {
  listen(port: number, callback?: any): void
  get(urlPattern: string, middlewareHandler?: any, callbackHandler?: any): void
  post(urlPattern: string, middlewareHandler?: any, callbackHandler?: any): void
}

class Shatabdi implements framework {
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

  private engine(req: http.IncomingMessage, res: http.ServerResponse, context: any) {
    this.request = req
    this.response = new Response(res)

    context.routeMaps.forEach((route: any) => {
      if (route.pattern === req.url) {
        if (route.middleware) {
          route.middleware(req, res)
        }
        if (route.callback) {
          route.callback(req, res)
        }
        res.end()
      }
    })

    console.log(`request hit as ${req.method} on ${req.url}`)
  }

  public get(patternString: string, middlewareHandler?: any, callbackHandler?: any): void {
    console.log('=> New route maps for path: ', patternString)
    const routeItem = {
      id: Date.now(),
      pattern: patternString,
      middleware: middlewareHandler,
      callback: callbackHandler,
      method: 'get',
    }

    this.routeMaps.push(routeItem)
  }

  public post(patternString: string, middlewareHandler?: any, callbackHandler?: any): void {
    console.log('=> New route registered for path: ', patternString)
    const routeItem = {
      id: Date.now(),
      pattern: patternString,
      middleware: middlewareHandler,
      callback: callbackHandler,
      method: 'post',
    }

    this.routeMaps.push(routeItem)
  }

  public listen(port: number, callback?: any): void {
    try {
      http.createServer((req, res) => this.engine(req, res, this)).listen(port || this.port)
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default Shatabdi
