/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-console */
import throttledQueue from 'throttled-queue'

const entityTranslator = async (
  authToken: string,
  translationData: TranslatableData[],
  translationMethod: (
    authToken: string,
    data: TranslatableData
  ) => Promise<any>,
  throttle: Throttle
): Promise<EntityTranslationData> => {
  let translated = 0
  const translationFailures: TranslatableData[] = []

  for (const data of translationData) {
    await throttle(async () => {
      try {
        await translationMethod(authToken, data)
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
    state: { bulkTranslationData, authorizationToken },
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

  for (const translationType in bulkTranslationData) {
    switch (translationType) {
      case 'categories': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          authorizationToken,
          bulkTranslationData[translationType],
          categoryTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          translationType
        )

        break
      }

      case 'brands': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          authorizationToken,
          bulkTranslationData[translationType],
          brandTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          translationType
        )

        break
      }

      case 'products': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          authorizationToken,
          bulkTranslationData[translationType],
          productTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          translationType
        )

        break
      }

      case 'skus': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          authorizationToken,
          bulkTranslationData[translationType],
          skuTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          translationType
        )

        break
      }

      case 'skusProductsSpecifications': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          authorizationToken,
          bulkTranslationData[translationType],
          skuProductSpecificationTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          translationType
        )

        break
      }

      case 'categoriesGroupsData': {
        const entityTranslationResponse: EntityTranslationData = await entityTranslator(
          authorizationToken,
          bulkTranslationData[translationType],
          categoryGroupTranslation,
          throttle
        )

        translationResponseUpdate(
          translationResponse,
          entityTranslationResponse,
          translationType
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
