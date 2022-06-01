import { json } from 'co-body'

export async function categoryTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: CategoryTranslationData = await json(req)

  const response = await catalogGraphQl.categoryTranslation(requestData)

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
    req,
  } = ctx

  const requestData: CategoryGroupData = await json(req)

  const response = await catalogGraphQl.categoryGroupTranslation(requestData)

  ctx.status = 202
  ctx.body = response

  next()
}
