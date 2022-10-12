export async function productTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.productTranslation(
    authorizationToken,
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getProductTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state
  const response = await catalogGraphQl.getProductTranslation(
    authorizationToken,
    translationData as ProductQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}

