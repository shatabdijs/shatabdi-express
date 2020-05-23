import http from 'http'

import { routeMap, layer } from './shatabdi.interfaces'
import Response from './response'

require('dotenv').config()

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

  public get(pattern: string, ...args: layer[]) {
    if (arguments.length < 2) {
      throw new Error('atleast one layer required to register route')
    }

    // all layers of particular route have same id
    const id = Date.now()
    for (let i = 0; i < args.length; i += 1) {
      this.routeMaps.push({
        id,
        method: 'GET',
        pattern,
        layer: args[i],
      })
    }
  }

  private engine(req: http.IncomingMessage, res: http.ServerResponse, context: any) {
    this.request = req
    this.response = new Response(req, res)

    context.routeMaps.forEach((route: any) => {
      if (route.pattern === req.url) {
        route.layer(req, new Response(req, res))
      }
    })

    console.log(`request hit as ${req.method} on ${req.url}`)
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
