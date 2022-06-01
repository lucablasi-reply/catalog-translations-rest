import { json } from 'co-body'

export async function skuTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: SKUData = await json(req)

  const response = await catalogGraphQl.skuTranslation(requestData)

  ctx.status = 202
  ctx.body = response

  next()
}
