import { json } from 'co-body'

export async function skuProductSpecificationTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: SKUProductSpecificationData = await json(req)

  const response = await catalogGraphQl.skuProductSpecificationTranslation(
    requestData
  )

  ctx.status = 202
  ctx.body = response

  next()
}

export async function specificationValuesTranslation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: { catalogGraphQl },
    req,
  } = ctx

  const requestData: SpecificationValuesData = await json(req)

  const response = await catalogGraphQl.specificationValuesTranslation(
    requestData
  )

  ctx.status = 202
  ctx.body = response

  next()
}
