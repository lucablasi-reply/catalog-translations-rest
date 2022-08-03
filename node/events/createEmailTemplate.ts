import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'

export async function createEmailTemplate(ctx: EventContext<Clients>) {
  const {
    clients: { messageCenter },
  } = ctx

  await messageCenter.createTemplate('bulk-translation-response', 'template')

  return true
}
