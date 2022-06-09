/* eslint-disable no-console */
import fs from 'fs'

import { translationReportEmailTemplate } from './emailTemplate/translationReport'

export async function sendEmail(ctx: Context, next: () => Promise<any>) {
  const {
    state: { notificationEmail, translationResponse },
    clients: { messageCenter, fileManager },
  } = ctx

  const emailTemplateName = 'bulk-translation-report'

  if (notificationEmail) {
    try {
      const isTemplateAvailable = await messageCenter.getTemplate(
        emailTemplateName
      )

      if (!isTemplateAvailable) {
        await messageCenter.createTemplate(
          emailTemplateName,
          translationReportEmailTemplate
        )
      }

      const fileName = `${Date.now()}-translationReport.json`
      // const filePath = path.join(__dirname, '..', '..', 'tmp')

      fs.writeFileSync(fileName, JSON.stringify(translationResponse))

      const file = fs.readFileSync(fileName, {
        encoding: 'utf8',
      })

      const fileBlob = Buffer.from(file)
      const filef = Uint8Array.from(fileBlob).buffer

      const { data } = await fileManager.saveFile(filef, 'translationResponse')

      await messageCenter.sendEmail({
        templateName: emailTemplateName,
        jsonData: {
          translationResponse: JSON.stringify(data),
          to: {
            email: notificationEmail,
            subject: 'Translation Report',
          },
        },
        providerName: '',
      })

      fs.unlinkSync(fileName)

      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  next()
}
