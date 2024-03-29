import { json } from 'co-body'

export async function validateAuthToken(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    header: { authorizationtoken, appkey, apptoken },
    req,
    clients: { authClient },
  } = ctx

  const authorizationToken = await authClient.validateAppKeyAndToken(
    authorizationtoken,
    appkey,
    apptoken
  )

  if (authorizationToken) {
    ctx.state.authorizationToken = authorizationToken
    const requestData: unknown = await json(req)
    ctx.state.translationData = requestData
    await next()
  } else {
    ctx.status = 402
    ctx.body = 'Authentication failed'
  }
}
