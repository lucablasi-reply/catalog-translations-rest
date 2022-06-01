import * as Joi from 'joi'

const translateSchema = (joiObject: Joi.ObjectSchema): Joi.ObjectSchema =>
  Joi.object({
    args: joiObject,
    locale: Joi.string(),
  })

const categoryArgsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  linkId: Joi.string(),
  keywords: Joi.array().items(Joi.string()),
})

export const CategorySchema = translateSchema(categoryArgsSchema)

const brandArgs = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  text: Joi.string(),
  siteTitle: Joi.string(),
  keywords: Joi.string(),
})

export const BrandSchema = translateSchema(brandArgs)

const productArgs = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  shortDescription: Joi.string(),
  metaTagDescrition: Joi.string(),
  linkId: Joi.string(),
  keywords: Joi.string(),
})

export const ProductSchema = translateSchema(productArgs)

const skuArgs = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
})

export const SkuSchema = translateSchema(skuArgs)

const skuProductSpecificationArgs = Joi.object({
  fieldId: Joi.string().required(),
  name: Joi.string(),
})

export const SkuProductSpecificationSchema = translateSchema(
  skuProductSpecificationArgs
)

const specificationValuesArgs = Joi.object({
  fieldId: Joi.string().required(),
  fieldValueNames: Joi.array().items(
    Joi.object({ id: Joi.string().required(), name: Joi.string() })
  ),
})

export const SpecificationValuesSchema = translateSchema(
  specificationValuesArgs
)

const categoryGorupArgs = Joi.object({
  groupId: Joi.string().required(),
  name: Joi.string(),
})

export const CategoryGroupSchems = translateSchema(categoryGorupArgs)
