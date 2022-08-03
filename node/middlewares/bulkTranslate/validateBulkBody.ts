import { json } from 'co-body'
import type Joi from 'joi'

import {
  BrandSchema,
  CategorySchema,
  SkuSchema,
  SkuProductSpecificationSchema,
  CategoryGroupSchems,
  ProductSchema,
  notificationEmailValidation,
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

  for (const translationType in translationData) {
    switch (translationType) {
      case 'categories':
        for (const category of translationData[translationType]) {
          const translationTypeValidation = CategorySchema.validate(category)

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
        }

        break

      case 'brands':
        for (const brand of translationData[translationType]) {
          const translationTypeValidation = BrandSchema.validate(brand)

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
        }

        break

      case 'products':
        for (const product of translationData[translationType]) {
          const translationTypeValidation = ProductSchema.validate(product)

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
        }

        break

      case 'skus':
        for (const sku of translationData[translationType]) {
          const translationTypeValidation = SkuSchema.validate(sku)

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
        }

        break

      case 'skusProductsSpecifications':
        for (const skusProductsSpecification of translationData[
          translationType
        ]) {
          const translationTypeValidation = SkuProductSpecificationSchema.validate(
            skusProductsSpecification
          )

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
        }

        break

      case 'specificationValuesData':
        for (const specificationValueData of translationData[translationType]) {
          const translationTypeValidation = CategoryGroupSchems.validate(
            specificationValueData
          )

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
        }

        break

      case 'categoriesGroupsData':
        for (const categoriesGroupsData of translationData[translationType]) {
          const translationTypeValidation = CategoryGroupSchems.validate(
            categoriesGroupsData
          )

          updateValidationResults(
            translationType,
            translationTypeValidation,
            validationResults
          )
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
  const {
    header: { authorizationtoken, appkey, apptoken },
    req,
    clients: { authClient },
  } = ctx

  console.log(authClient)

  const authorizationToken = await authClient.validateAppKeyAndToken(
    authorizationtoken,
    appkey,
    apptoken
  )

  if (authorizationToken) {
    ctx.state.authorizationToken = authorizationToken

    const translationData: BulkTranslationData = await json(req)

    const { error: emailError } = notificationEmailValidation.validate(
      translationData
    )

    if (emailError) {
      ctx.status = 422
      ctx.body = emailError.details.map((detail) => detail.message)

      return
    }

    const validationResult = validateTranslationBody(translationData)

    if (validationResult.errors) {
      ctx.status = 422
      ctx.body = validationResult
    } else {
      ctx.state.bulkTranslationData = translationData
      ctx.state.notificationEmail = translationData.notificationEmail
      ctx.body =
        'Your translations are being processed. You will receive an email with the details in the email account specified in the request.'
      ctx.status = 200
      next()
    }
  } else {
    ctx.status = 402
    ctx.body = 'Authentication failed'
  }
}
