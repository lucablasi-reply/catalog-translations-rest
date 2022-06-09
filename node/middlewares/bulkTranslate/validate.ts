import { json } from 'co-body'
import type Joi from 'joi'

import {
  BrandSchema,
  CategorySchema,
  SkuSchema,
  SkuProductSpecificationSchema,
  CategoryGroupSchems,
  ProductSchema,
} from './validationSchemas/joi'
/* eslint-disable no-console */

const updateValidationResults = (
  entity: TranslatablePropTypes,
  result: Joi.ValidationResult,
  validationResults: TranslationValidationResponse
) => {
  if (result.error) {
    validationResults[entity].push({
      value: result.value,
      error: result.error.details.map((detail) => detail.message),
    })
    validationResults.errors += 1
  }

  return validationResults
}

const validateTranslationBody = (
  translationData: BulkTranslationData
): TranslationValidationResponse => {
  const validationResults: TranslationValidationResponse = {
    errors: 0,
    categories: [],
    brands: [],
    products: [],
    skus: [],
    skusProductsSpecifications: [],
    specificationValuesData: [],
    categoriesGroupsData: [],
  }

  for (const entity in translationData) {
    switch (entity) {
      case 'categories':
        for (const category of translationData[entity]) {
          const entityValidation = CategorySchema.validate(category)

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      case 'brands':
        for (const brand of translationData[entity]) {
          const entityValidation = BrandSchema.validate(brand)

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      case 'products':
        for (const product of translationData[entity]) {
          const entityValidation = ProductSchema.validate(product)

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      case 'skus':
        for (const sku of translationData[entity]) {
          const entityValidation = SkuSchema.validate(sku)

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      case 'skusProductsSpecifications':
        for (const skusProductsSpecification of translationData[entity]) {
          const entityValidation = SkuProductSpecificationSchema.validate(
            skusProductsSpecification
          )

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      case 'specificationValuesData':
        for (const specificationValueData of translationData[entity]) {
          const entityValidation = CategoryGroupSchems.validate(
            specificationValueData
          )

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      case 'categoriesGroupsData':
        for (const categoriesGroupsData of translationData[entity]) {
          const entityValidation = CategoryGroupSchems.validate(
            categoriesGroupsData
          )

          updateValidationResults(entity, entityValidation, validationResults)
        }

        break

      default:
        break
    }
  }

  return validationResults
}

export async function validateBulkBody(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const translationData: BulkTranslationData = await json(ctx.req)

  const validationResult = validateTranslationBody(translationData)

  if (validationResult.errors) {
    ctx.status = 422
    ctx.body = validationResult
  } else {
    ctx.state.translationData = translationData
    ctx.state.notificationEmail = translationData.notificationEmail
    ctx.body = 'ok'
    ctx.status = 200
    next()
  }
}
