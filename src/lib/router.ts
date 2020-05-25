import { layer, routeMap, methods } from './router.interfaces'
import { response } from './response.interfaces'
import { request } from './request.interface'

/**
 * @class
 * @description This class powers up the default response object of the nodejs http module
 */
class Response {
  private routeMaps: routeMap[] = []

  /**
   * This constructor initializes an empty route map which is later
   * populated by route.register
   * @constructor
   */
  constructor() {
    this.routeMaps = []
  }

  /**
   * This function is used to register a new route into the routemaps
   * @param method enum method which specifies the type of request
   * @param pattern the url pattern to be matched for route
   * @param args the layer functions binded to route
   * @public
   * @returns void
   */
  public register(method: methods, pattern: String, ...args: layer[]): void {
    // if (arguments.length < 2) {
    //   throw new Error('at-least one layer required to register route')
    // }

    // all layers of particular route have same id
    for (let i = 0; i < args.length; i += 1) {
      this.routeMaps.push({
        id: Date.now(),
        method,
        pattern: pattern.split('/'),
        layer: args[i],
      })
    }
  }

  /**
   * The process method is used to match the incoming request to the registered route maps
   * @param req adapted request object of incoming http request
   * @param res adapted response object, to be passed to layers upon matching
   */
  public process(req: request, res: response): void {
    let requestUrl: String = req?.url ?? '/'
    if (requestUrl.length !== 1) {
      requestUrl = requestUrl.replace(/\/+$/, '')
    }
    const explodedUrl: String[] = requestUrl.split('/')

    let matched = false
    this.routeMaps.forEach((route) => {
      const params: any = {}
      let error: Boolean = false

      if (route.pattern.length === explodedUrl.length) {
        // proceed for checking each fragment one by one
        for (let i = 0; i < route.pattern.length; i += 1) {
          if (route.pattern[i].includes(':')) {
            params[route.pattern[i].substr(1)] = explodedUrl[i]
          } else if (route.pattern[i] !== explodedUrl[i]) {
            error = true
          }
        }

        //   when urls match successfully, feed data to request module
        if (!error) {
          req.params = params
          matched = true
          route.layer(req, res)
        }
      }
    })
    if (!matched) {
      res.status(404).send(`Cannot ${req.method?.toUpperCase()} ${req.url}`)
    }
  }
}

export default Response
