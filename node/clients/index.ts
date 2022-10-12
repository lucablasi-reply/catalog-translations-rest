import { IOClients } from '@vtex/api'

import { CatalogGraphQL } from './catalogClient'
import { MessageCenter } from './messageCenter'
import { FileManager } from './fileManager'
import { AuthClient } from './authClient'
import { MessagesClient } from './messagesClient'

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

  public get authClient() {
    return this.getOrSet('authClient', AuthClient)
  }
  public get messagesClient() {
    return this.getOrSet('messagesClients', MessagesClient)
  }
}
