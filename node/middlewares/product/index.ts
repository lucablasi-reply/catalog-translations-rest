import { json } from 'co-body'

export async function productTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: TransaltionData = await json(req)
  console.log(requestData)
  const response = await catalogGraphQl.productTranslation(requestData)
  console.log(response)
  ctx.status = 202
  ctx.body = response

  next()
}
