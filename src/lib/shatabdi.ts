import http from 'http'

import { layer, methods } from './router.interfaces'
import { request } from './request.interface'
import Response from './response'
import Router from './router'

require('dotenv').config()

class Shatabdi {
  private request: any | undefined

  private response: Response | undefined

  private router: Router

  private port: number | string

  private mode: number

  private server: http.Server

  constructor(mode: number) {
    this.mode = mode
    this.server = http.createServer()
    this.port = `${process.env.PORT}`
    this.router = new Router()
  }

  //   provide router function from same instance
  public get(pattern: string, ...args: layer[]): void {
    this.router.register(methods.GET, pattern, ...args)
  }

  public post(pattern: string, ...args: layer[]): void {
    this.router.register(methods.POST, pattern, ...args)
  }

  public put(pattern: string, ...args: layer[]): void {
    this.router.register(methods.PUT, pattern, ...args)
  }

  public delete(pattern: string, ...args: layer[]): void {
    this.router.register(methods.DELETE, pattern, ...args)
  }

  public engine(req: request, res: http.ServerResponse) {
    this.request = req
    this.response = new Response(req, res)

    this.router.process(this.request, this.response)

    if (req.url !== '/favicon.ico') console.log(`request hit as ${req.method} on ${req.url}`)
  }

  public listen(port: number, callback?: any): void {
    try {
      http.createServer((req, res) => this.engine(req as request, res as http.ServerResponse)).listen(port || this.port)
      if (callback) {
        callback()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default Shatabdi
