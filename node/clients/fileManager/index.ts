import type { IOContext, InstanceOptions } from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

import { UPLOAD_FILE } from './queries'

export class FileManager extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.file-manager-graphql@0.x', context, options)
  }

  // private toBase64 = (file: any) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader()

  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = (error) => reject(error)
  //   })

  public saveFile = async (file: any, bucket: string) => {
    return this.graphql.mutate({
      mutate: UPLOAD_FILE,
      variables: {
        file,
        bucket,
      },
    })
  }
}
