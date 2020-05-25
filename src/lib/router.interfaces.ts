import { response } from './response.interfaces'
import { request } from './request.interface'

export const enum methods {
  'GET',
  'POST',
  'PUT',
  'DELETE',
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
