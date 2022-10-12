export async function skuTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.skuTranslation(
    authorizationToken,
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getSkuTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.getSkuTranslation(
    authorizationToken,
    translationData as SkuQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}
