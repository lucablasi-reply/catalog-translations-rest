export async function categoryTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.categoryTranslation(
    authorizationToken,
    translationData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function categoryGroupTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.categoryGroupTranslation(
    authorizationToken,
    translationData
  )

  ctx.status = 202
  ctx.body = response

  next()
}
