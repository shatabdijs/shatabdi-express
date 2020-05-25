import http from 'http'

export interface request extends http.IncomingMessage {
  params: any | undefined
  body: any | undefined
}
