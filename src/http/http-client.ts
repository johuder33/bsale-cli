import { AbstractHttpClient } from '../types.js'
import got, { HTTPError } from 'got'

export class HttpClient extends AbstractHttpClient {
  private client: typeof got

  constructor(baseURL: string, token: string) {
    super(baseURL, token)
    this.client = got.extend({
      prefixUrl: baseURL,
      headers: {
        "access_token": token
      }
    })
  }

  async get<T>(path: string): Promise<T> {
    try {
      const response = await this.client.get<T>(path).json()
      return response as T
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        console.error(`Get [${path}] due to error: ${error.message}`)
      }
      throw error
    }
  }

  async put<T, B>(path: string, body: B): Promise<T> {
    try {
      const response = await this.client.put<T>(path, { body: JSON.stringify(body) }).json()
      return response as T
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        console.error(`Put [${path}] due to error: ${error.message}`)
      }
      throw error
    }
  }
}