export const UPLOAD_FILE = `
  mutation UploadFile($file: Upload!, $bucket: String) {
    uploadFile(file: $file, bucket: $bucket) {
      fileUrl
    }
  }
`
