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
    translationData
  )

  ctx.status = 202
  ctx.body = response

  next()
}
