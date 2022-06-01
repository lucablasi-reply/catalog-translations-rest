import { json } from 'co-body'

export async function brandTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: BrandData = await json(req)

  const response = await catalogGraphQl.brandTranslation(requestData)

  ctx.status = 202
  ctx.body = response

  next()
}
