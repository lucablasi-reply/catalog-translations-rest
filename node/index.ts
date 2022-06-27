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
  sendEmail,
  validateAuthToken,
} from './middlewares'
import { createEmailTemplate } from './events/createEmailTemplate'

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
    authorizationToken: string
    bulkTranslationData: BulkTranslationData
    notificationEmail: string | undefined
    translationResponse: TranslationsDataResponse
    translationData: TranslatableData
  }
}

export default new Service({
  clients,
  events: {
    onAppInstalled: createEmailTemplate,
    onAppLinkedEvent: createEmailTemplate,
  },
  routes: {
    bulkTranslate: method({
      POST: [validateBulkBody, bulkTranslate, sendEmail],
    }),
    categoryTranslation: method({
      POST: [validateAuthToken, categoryTranslation],
    }),
    brandTranslation: method({
      POST: [validateAuthToken, brandTranslation],
    }),
    productTranslation: method({
      POST: [validateAuthToken, productTranslation],
    }),
    skuTranslation: method({
      POST: [validateAuthToken, skuTranslation],
    }),
    skuSpecificationTranslation: method({
      POST: [validateAuthToken, skuProductSpecificationTranslation],
    }),
    specificationValuesTranslation: method({
      POST: [validateAuthToken, specificationValuesTranslation],
    }),
  },
})
