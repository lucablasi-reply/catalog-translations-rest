/* eslint-disable no-console */
import fs from 'fs'

import { v4 as uuidv4 } from 'uuid'

import { translationReportEmailTemplate } from './emailTemplate/translationReport'

const createJsonFile = (data: TranslationsDataResponse) => {
  const fileName = `${uuidv4()}.json`

  fs.writeFileSync(fileName, JSON.stringify(data))

  const file = fs.readFileSync(fileName, {
    encoding: 'utf8',
  })

  const fileData: IncomingFile = {
    filename: fileName,
    encoding: 'utf8',
    mimeType: 'application/json',
  }

  return { file, fileName, fileData }
}

const deleteJsonFile = (filePath: string) => fs.unlinkSync(filePath)

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

      const { file, fileName, fileData } = createJsonFile(translationResponse)

      const { url } = await fileManager.saveFile(fileData, file, 't', fileName)

      await messageCenter.sendEmail({
        templateName: emailTemplateName,
        jsonData: {
          translationResponse: url,
          to: {
            email: notificationEmail,
            subject: 'Translation Report',
          },
        },
        providerName: '',
      })

      deleteJsonFile(fileName)
    } catch (error) {
      console.log(error)
    }
  }

  next()
}
