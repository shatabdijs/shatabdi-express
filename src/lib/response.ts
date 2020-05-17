import http from 'http'

class Response {
  private response: http.ServerResponse

  constructor(responseObject: http.ServerResponse) {
    this.response = responseObject
  }

  get functionalResponse(): http.ServerResponse {
    return this.response
  }
}

export default Response
