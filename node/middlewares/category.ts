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
    translationData as TranslatableData
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
    translationData as TranslatableData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getCategoryTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.getCategoryTranslation(
    authorizationToken,
    translationData as CategoryQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function getCategoryGroupTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    state,
  } = ctx

  const { authorizationToken, translationData } = state

  const response = await catalogGraphQl.getCategoryGroupTranslation(
    authorizationToken,
    translationData as CategoryGroupQueryPayload
  )

  ctx.status = 202
  ctx.body = response

  next()
}
