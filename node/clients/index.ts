import { IOClients } from '@vtex/api'

import { CatalogGraphQL } from './catalogClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalogGraphQl() {
    return this.getOrSet('catalogGraphQl', CatalogGraphQL)
  }
}
