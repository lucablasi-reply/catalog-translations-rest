export async function skuProductSpecificationTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.skuProductSpecificationTranslation(
    authorizationToken,
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function specificationValuesTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.specificationValuesTranslation(
    authorizationToken,
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function productSpecificationTranslation(
  ctx: Context,
  next: () => Promise<unknown>
){
  const {
    clients: { messagesClient },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await messagesClient.productSpecificationTranslation(
    authorizationToken,
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getSkuProductSpecificationTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.getSkuProductSpecificationTranslation(
    authorizationToken,
    translationData as FieldQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getSpecificationValuesTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.getSpecificationValuesTranslation(
    authorizationToken,
    translationData as FieldValuesQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}
