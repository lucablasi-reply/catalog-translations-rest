import { IOClients } from '@vtex/api'

import { CatalogGraphQL } from './catalogClient'
import { MessageCenter } from './messageCenter'
import { FileManager } from './fileManager'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalogGraphQl() {
    return this.getOrSet('catalogGraphQl', CatalogGraphQL)
  }

  public get messageCenter() {
    return this.getOrSet('messageCenter', MessageCenter)
  }

  public get fileManager() {
    return this.getOrSet('fileManager', FileManager)
  }
}
