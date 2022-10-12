export async function brandTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.brandTranslation(
    authorizationToken,
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getBrandTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.getBrandTranslation(
    authorizationToken,
    translationData as BrandQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}
