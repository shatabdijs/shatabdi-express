import http from 'http'
import { response } from './response.interfaces'

export const enum methods {
  'GET',
  'POST',
  'PUT',
  'DELETE',
}

export interface layer {
  (request: http.IncomingMessage, response: response, continueRequest?: boolean): void
}

export interface routeMap {
  id: number
  method: methods
  pattern: String[]
  layer: layer
}
