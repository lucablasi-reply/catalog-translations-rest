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
    translationData
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
    translationData
  )

  ctx.status = 202
  ctx.body = response

  next()
}
