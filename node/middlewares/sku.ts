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
    translationData
  )

  ctx.status = 202
  ctx.body = response

  next()
}
