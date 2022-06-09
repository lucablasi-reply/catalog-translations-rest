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

interface IncomingFile {
  filename: string
  mimeType: string
  encoding: string
}

interface FileResponse {
  url: FileData[] | void
  name: string
}

interface FileData {
  name: string
}
