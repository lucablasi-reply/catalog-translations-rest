import type {
  IOContext,
  InstanceOptions,
  Serializable,
  GraphQLResponse,
} from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

import {
  CATEGORY_TRANSLATIONS_MUTATION,
  BRAND_TRANSLATION_MUTATION,
  PRODUCT_TRANSLATION_MUTATION,
  SKU_TRANSLATION_MUTATION,
  SKU_PRODUCT_SPCIFICATION_TRANSLATION_MUTATION,
  SPECIFICATION_VALUES_TRANSLATION_MUTATION,
  CATEGORY_GROUP_TRANSLATION_MUTATION,
} from './queries'

class CustomGraphQLError extends Error {
  public graphQLErrors: any

  constructor(message: string, graphQLErrors: any[]) {
    super(message)
    this.graphQLErrors = graphQLErrors
  }
}

function throwOnGraphQLErrors<T extends Serializable>(message: string) {
  return function maybeGraphQLResponse(response: GraphQLResponse<T>) {
    if (response?.errors && response.errors.length > 0) {
      throw new CustomGraphQLError(message, response.errors)
    }

    return response
  }
}

export class CatalogGraphQL extends AppGraphQLClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-graphql@1.x', ctx, {
      ...opts,
      headers: {
        ...opts?.headers,
      },
    })
  }

  private translationMutation = async (
    authToken: string,
    query: string,
    variables:
      | CategoryTranslationData
      | BrandData
      | ProductData
      | SKUData
      | SKUProductSpecificationData
      | SpecificationValuesData
      | CategoryGroupData
  ): Promise<GraphQLResponse<Serializable>> => {
    return (
      this.graphql
        .mutate(
          {
            mutate: query,
            variables,
          },
          {
            headers: {
              VtexIdclientAutCookie: authToken,
            },
          }
        )
        .then(
          throwOnGraphQLErrors('Error updating data from vtex.catalog-graphql')
        )
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then((query) => {
          return query
        })
    )
  }

  public categoryTranslation = async (
    authToken: string,
    categoryData: TranslatableData
  ): Promise<any> =>
    this.translationMutation(
      authToken,
      CATEGORY_TRANSLATIONS_MUTATION,
      categoryData
    )

  public brandTranslation = async (
    authToken: string,
    brandData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(authToken, BRAND_TRANSLATION_MUTATION, brandData)

  public productTranslation = async (
    authToken: string,
    productData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(
      authToken,
      PRODUCT_TRANSLATION_MUTATION,
      productData
    )

  public skuTranslation = async (
    authToken: string,
    skuData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(authToken, SKU_TRANSLATION_MUTATION, skuData)

  public skuProductSpecificationTranslation = async (
    authToken: string,
    specificationData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(
      authToken,
      SKU_PRODUCT_SPCIFICATION_TRANSLATION_MUTATION,
      specificationData
    )

  public specificationValuesTranslation = async (
    authToken: string,
    specificationData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(
      authToken,
      SPECIFICATION_VALUES_TRANSLATION_MUTATION,
      specificationData
    )

  public categoryGroupTranslation = async (
    authToken: string,
    categoryGroupData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(
      authToken,
      CATEGORY_GROUP_TRANSLATION_MUTATION,
      categoryGroupData
    )
}
