import { json } from 'co-body'

export async function productTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: ProductData = await json(req)
  const response = await catalogGraphQl.productTranslation(requestData)

  ctx.status = 202
  ctx.body = response

  next()
}
