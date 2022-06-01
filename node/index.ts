import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, Service, method } from '@vtex/api'

import { Clients } from './clients'
import {
  categoryTranslation,
  productTranslation,
  brandTranslation,
  skuTranslation,
  skuProductSpecificationTranslation,
  specificationValuesTranslation,
  bulkTranslate,
  validateBulkBody,
} from './middlewares'

const TIMEOUT_MS = 20000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
    translationData: BulkTranslationData
  }
}

export default new Service({
  clients,
  routes: {
    bulkTranslate: method({
      POST: [validateBulkBody, bulkTranslate],
    }),
    categoryTranslation: method({
      POST: [categoryTranslation],
    }),
    brandTranslation: method({
      POST: [brandTranslation],
    }),
    productTranslation: method({
      POST: [productTranslation],
    }),
    skuTranslation: method({
      POST: [skuTranslation],
    }),
    skuSpecificationTranslation: method({
      POST: [skuProductSpecificationTranslation],
    }),
    specificationValuesTranslation: method({
      POST: [specificationValuesTranslation],
    }),
  },
})
