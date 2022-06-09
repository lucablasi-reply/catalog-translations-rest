/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-console */
import throttledQueue from 'throttled-queue'

const entityTranslator = async (
  translationData: TranslatableData[],
  translationMethod: any,
  throttle: Throttle
): Promise<EntityTranslationData> => {
  let translated = 0
  const translationFailures: TranslatableData[] = []

  for (const data of translationData) {
    await throttle(async () => {
      try {
        await translationMethod(data)
        translated += 1
      } catch (error) {
        translationFailures.push(data)
      }
    })
  }

  return { translated, translationFailures }
}

const translationResponseUpdate = (
  translationResponse: TranslationsDataResponse,
  entityTranslationData: EntityTranslationData,
  prop: TranslatablePropTypes
) => {
  const { translated, translationFailures } = entityTranslationData

  translationResponse.total += translated + translationFailures.length
  translationResponse.totalTranslated += translated
  translationResponse.totalFailures += translationFailures.length
  translationResponse.failureDetail[prop] = translationFailures

  return translationResponse
}

export async function bulkTranslate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    clients: {
      catalogGraphQl: {
        categoryTranslation,
        brandTranslation,
        productTranslation,
        skuTranslation,
        skuProductSpecificationTranslation,
        categoryGroupTranslation,
      },
    },
    state: { translationData },
  } = ctx

  const requestPerInterval = 10
  const intervalMiliseconds = 1000
  const throttle = throttledQueue(requestPerInterval, intervalMiliseconds, true)

  const translationResponse: TranslationsDataResponse = {
    total: 0,
    totalTranslated: 0,
    totalFailures: 0,
    failureDetail: {
      categories: [],
      brands: [],
      products: [],
      skus: [],
      skusProductsSpecifications: [],
      specificationValuesData: [],
      categoriesGroupsData: [],
    },
  }

  for (const prop in translationData) {
    switch (prop) {
      case 'categories': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          translationData[prop],
          categoryTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          prop
        )

        break
      }

      case 'brands': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          translationData[prop],
          brandTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          prop
        )

        break
      }

      case 'products': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          translationData[prop],
          productTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          prop
        )

        break
      }

      case 'skus': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          translationData[prop],
          skuTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          prop
        )

        break
      }

      case 'skusProductsSpecifications': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          translationData[prop],
          skuProductSpecificationTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          prop
        )

        break
      }

      case 'categoriesGroupsData': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          translationData[prop],
          categoryGroupTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          prop
        )

        break
      }

      default:
        break
    }
  }

  ctx.state.translationResponse = translationResponse
  next()
}
