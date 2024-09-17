#!/usr/bin/env node

import { Command } from 'commander'
import { HttpClient } from './http/http-client.js'
import { loadConfig, configure } from './config.js'
import { BsaleService } from './service/bsale.js'
import metadata from './metadata.js'

const program = new Command()

program
  .name(metadata.name)
  .description(metadata.description)
  .version(metadata.version)

const config = loadConfig()
let client: HttpClient | null = null

function checkCredentials() {
  if (config && !client) {
    client = new HttpClient(config.baseURL, config.token) 
  } else {
    console.error('Error: You must first setup credentials, please see the "configure" command.')
    process.exit(1)
  }
}

program
  .command('configure')
  .description('setup credentials')
  .requiredOption('--url <url>', 'the service base url')
  .requiredOption('--token <token>', 'the access token to connect to the service')
  .action((options) => {
    if (config) {
      console.log('Credentials are already setup.')
      process.exit(0)
    }

    configure(options.baseURL, options.token)
  })


program
  .command('get-clients')
  .description('get all clients')
  .action(async () => {
    checkCredentials()
    if (client) {
      const service = new BsaleService(client)
      const response = await service.getClients()
      console.log('response', response)
    }
  })

program.parse(process.argv)