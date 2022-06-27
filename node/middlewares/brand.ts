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
    translationData
  )

  ctx.status = 202
  ctx.body = response

  next()
}
