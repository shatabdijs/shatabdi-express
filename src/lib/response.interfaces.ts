import http from 'http'

export interface response extends http.ServerResponse {
  status(httpStatusCode: number): response
  json(jsonObject: any): void
  send(responseString: string): void
}
