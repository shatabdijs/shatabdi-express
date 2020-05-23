import http from 'http'

export interface routeMap {
  id: number
  method: string
  pattern: string
  layer: layer
}

export interface response extends http.ServerResponse {
  status(httpStatusCode: number): response
  json(jsonObject: any): void
  send(responseString: string): void
}

export interface layer {
  (request: http.IncomingMessage, response: response, continueRequest?: boolean): void
}
