export abstract class AbstractHttpClient {
  protected baseURL: string
  protected token: string

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL
    this.token = token
  }


  abstract get<T>(path: string): Promise<T>
  abstract put<T, B>(path: string, body: B): Promise<T>
}