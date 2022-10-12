import { AppGraphQLClient, InstanceOptions, Serializable, GraphQLResponse, IOContext } from "@vtex/api";
import { PRODUCT_SPECIFICATION_TRANSLATION_MUTATION } from "./query";

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

export class MessagesClient extends AppGraphQLClient {

  constructor(ctx: IOContext, opts?: InstanceOptions){
    super('vtex.messages@1.x', ctx, {
      ...opts,
      headers: {
        ...opts?.headers
      }
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
      | ProductSpecificationPayload
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
          throwOnGraphQLErrors('Error updating data from vtex.messages')
        )
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then((query) => {
          return query
        })
    )
  }

  public productSpecificationTranslation = (
    authToken: string,
    productSpecificationData: TranslatableData
  ): Promise<GraphQLResponse<Serializable>> =>
    this.translationMutation(
      authToken,
      PRODUCT_SPECIFICATION_TRANSLATION_MUTATION,
      productSpecificationData
    )
}
