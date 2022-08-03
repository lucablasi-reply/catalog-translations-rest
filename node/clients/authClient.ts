import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class AuthClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    const url = 'http://vtexid.vtexcommercestable.com.br'

    super(url, context, {
      ...options,
    })
  }

  public async validateAppKeyAndToken(
    authToken: string | undefined,
    appKey: string | undefined,
    appToken: string | undefined
  ): Promise<string | undefined> {
    let res

    if (authToken) {
      res = authToken
    }

    if (appKey && appToken) {
      try {
        const { token }: AuthValidationResponse = await this.http.post(
          '/api/vtexid/apptoken/login',
          {
            appkey: appKey,
            apptoken: appToken,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        res = token
      } catch (error) {
        res = undefined
      }
    }

    return res
  }
}
