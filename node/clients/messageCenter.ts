import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class MessageCenter extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  private templateUrl = `http://${this.context.account}.myvtex.com/api/template-render/pvt/templates`

  public async sendEmail(body: BodyEmail): Promise<IOResponse<string>> {
    return this.http.postRaw(
      `http://${this.context.account}.vtexcommercestable.com.br/api/mail-service/pvt/sendmail`,
      body
    )
  }

  public async getTemplate(templateName: string): Promise<boolean> {
    return this.http
      .getRaw(`${this.templateUrl}/${templateName}`)
      .then((res) => {
        return res.status === 200
      })
      .catch(() => false)
  }

  public async createTemplate(templateName: string, emailTemplate: string) {
    return this.http.post(this.templateUrl, {
      Name: templateName,
      FriendlyName: 'Translation Report',
      Description: null,
      IsDefaultTemplate: false,
      AccountId: null,
      AccountName: null,
      ApplicationId: null,
      IsPersisted: true,
      IsRemoved: false,
      Type: '',
      Templates: {
        email: {
          To: '{{to.email}}',
          CC: null,
          BCC: null,
          Subject: '{{to.subject}}',
          Message: emailTemplate,
          Type: 'E',
          ProviderId: '00000000-0000-0000-0000-000000000000',
          ProviderName: null,
          IsActive: true,
          withError: false,
        },
        sms: {
          Type: 'S',
          ProviderId: null,
          ProviderName: null,
          IsActive: false,
          withError: false,
          Parameters: [],
        },
      },
    })
  }
}
