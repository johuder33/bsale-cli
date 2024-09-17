import { HttpClient } from '../http/http-client'

export class BsaleService {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  async getClients() {
    const response = await this.client.get('clients.json')
    return response
  }
}