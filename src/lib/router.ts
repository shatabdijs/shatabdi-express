import { layer, routeMap, methods } from './router.interfaces'
import { response } from './response.interfaces'
import { request } from './request.interface'
import { url } from 'inspector'
import { URL } from 'url'

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
    if (arguments.length < 2) {
      throw new Error('at-least one layer required to register route')
    }

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

  public process(req: request, res: response): void {
    try {
      const requestUrl: String = req?.url ?? '/'
      const baseUrl = requestUrl.replace(/\/+$/, '')
      const explodedUrl: String[] = baseUrl.split('/')

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

          if (!error) {
            console.log(`Route matched, params extracted: `, params)
          }
        }
      })

      res.status(200).json({ explodedUrl })
    } catch (e) {
      res.status(500).json({ error: true })
    }
  }
}

export default Response
