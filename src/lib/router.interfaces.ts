import { response } from './response.interfaces'
import { request } from './request.interface'

export const enum methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface layer {
  (request: request, response: response, continueRequest?: boolean): void
}

export interface routeMap {
  id: number
  method: methods
  pattern: String[]
  layer: layer
}
