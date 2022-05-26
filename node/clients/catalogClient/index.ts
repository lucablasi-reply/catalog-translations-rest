import type { IOContext,  InstanceOptions, Serializable, GraphQLResponse } from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

import { CATEGORY_TRANSLATIONS_MUTATION, BRAND_TRANSLATION_MUTATION, PRODUCT_TRANSLATION_MUTATION, SKU_TRANSLATION_MUTATION, SKU_PRODUCT_SPCIFICATION_TRANSLATION_MUTATION, SPECIFICATION_VALUES_TRANSLATION_MUTATION, CATEGORY_GROUP_TRANSLATION_MUTATION } from './queries'

class CustomGraphQLError extends Error {
  public graphQLErrors: any

  constructor(message: string, graphQLErrors: any[]) {
    super(message)
    this.graphQLErrors = graphQLErrors
  }
}

function throwOnGraphQLErrors<T extends Serializable>(message: string) {
  return function maybeGraphQLResponse(response: GraphQLResponse<T>) {
    if (response && response.errors && response.errors.length > 0) {
      throw new CustomGraphQLError(message, response.errors)
    }

    return response
  }
}


export class CatalogGraphQL extends AppGraphQLClient {
  public constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-graphql@1.x', ctx, {
      ...opts,
      headers: {
        ...opts && opts.headers,
        cookie: `VtexIdclientAutCookie=${ctx.authToken}`,
      }})
  }

  private translationMutation = async (query: string, variables: TransaltionData): Promise<GraphQLResponse<Serializable>> => {
    return await this.graphql.mutate({
      mutate: query,
      variables
    }).then(
      throwOnGraphQLErrors(
        'Error updating data from vtex.catalog-graphql'
      )
    ).then((query) => {
      return query
    })
  }

  public categoryTranslation = async (categoryData: TransaltionData): Promise<GraphQLResponse<Serializable>> => await this.translationMutation(CATEGORY_TRANSLATIONS_MUTATION, categoryData)

  public brandTranslation = async (brandData: TransaltionData): Promise<GraphQLResponse<Serializable>> => await this.translationMutation(BRAND_TRANSLATION_MUTATION, brandData)

  public productTranslation = async (productData: TransaltionData):  Promise<GraphQLResponse<Serializable>> => await this.translationMutation(PRODUCT_TRANSLATION_MUTATION, productData)

  public skuTranslation = async (skuData: TransaltionData):  Promise<GraphQLResponse<Serializable>> => await this.translationMutation(SKU_TRANSLATION_MUTATION, skuData)

  public skuProductSpecificationTranslation = async (specificationData: TransaltionData):  Promise<GraphQLResponse<Serializable>> => await this.translationMutation(SKU_PRODUCT_SPCIFICATION_TRANSLATION_MUTATION, specificationData)

  public specificationValuesTranslation = async (specificationData: TransaltionData):  Promise<GraphQLResponse<Serializable>> => await this.translationMutation(SPECIFICATION_VALUES_TRANSLATION_MUTATION, specificationData)

  public categoryGroupTranslation = async (categoryGroupData: TransaltionData):  Promise<GraphQLResponse<Serializable>> => await this.translationMutation(CATEGORY_GROUP_TRANSLATION_MUTATION, categoryGroupData)
}

