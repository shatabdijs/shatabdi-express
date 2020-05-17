import http from 'http'

class Response {
  private response: http.ServerResponse

  private customStatus: number

  constructor(responseObject: http.ServerResponse) {
    this.customStatus = -1
    this.response = responseObject
    this.response.setHeader('X-Powered-By', 'shatabdi-express')
  }

  status(code: number = 200): Response {
    this.response.statusCode = code
    return this
  }

  json(jsonObject: any) {
    this.response.setHeader('Content-Type', 'application/json')
    this.response.write(JSON.stringify(jsonObject))
    this.response.end()
    // return this.response
  }

  send(stringData: string) {
    this.response.setHeader('Content-Type', 'application/json')
    this.response.write(stringData)
    this.response.end()
    // return this.response
  }
}

export default Response
