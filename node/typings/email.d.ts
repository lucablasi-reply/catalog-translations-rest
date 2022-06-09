interface BodyEmail {
  providerName: string
  templateName: string
  jsonData: JsonData
}

interface JsonData {
  translationResponse: string
  to: {
    email: string
    subject: string
  }
}
