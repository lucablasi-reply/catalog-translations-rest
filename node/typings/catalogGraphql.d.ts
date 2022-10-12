interface CategoryTranslationData {
  args: {
    id: string
    name?: string
    title?: string
    description?: string
    keywords?: string[]
    linkId?: string
  }
  locale: string
}

interface BrandData {
  args: {
    id: string
    name?: string
    text?: string
    siteTitle?: string
    keywords?: string
  }
  locale: string
}

interface ProductData {
  args: {
    id: string
    name?: string
    title?: string
    description?: string
    shortDescription?: string
    metaTagDescription?: string
    linkId?: string
    keywords?: string[]
  }
  locale: string
}

interface SKUData {
  args: {
    id: string
    name?: string
  }
  locale: string
}

interface SKUProductSpecificationData {
  args: {
    fieldId: string
    name: string
  }
  locale: string
}

interface FieldValueNames {
  id: string
  name: string
}

interface SpecificationValuesData {
  args: {
    fieldId: string
    fieldValueNames: FieldValueNames[]
  }
  locale: string
}

interface CategoryGroupData {
  args: {
    groupId: string
    name: string
  }
  locale: string
}

interface ProductSpecificationData {
  srcLang: string // src locale
  srcMessage: string  // src product specification
  targetMessage: string // dst product specification
  context: string // specification field ID
}

interface ProductSpecificationPayload {
  args: {
    to: string // dst locale
    messages: ProductSpecificationData[] // translation data
  }
  locale: string
}

type TranslatableData =
  | CategoryTranslationData
  | BrandData
  | ProductData
  | SKUData
  | SKUProductSpecificationData
  | SpecificationValuesData
  | CategoryGroupData
  | ProductSpecificationPayload

interface TranslationResponse {
  translateCategory: boolean
}

interface BulkTranslationData {
  notificationEmail?: string
  categories: CategoryTranslationData[]
  brands: BrandData[]
  products: ProductData[]
  skus: SKUData[]
  skusProductsSpecifications: SKUProductSpecificationData[]
  specificationValuesData: SpecificationValuesData[]
  categoriesGroupsData: CategoryGroupData[]
}

interface CategoryQueryPayload {
  id: string
  srcLocale: string
  dstLocale: string
}

interface CategoryGroupQueryPayload {
  id: string,
  srcLocale: string
  dstLocale: string
}

interface FieldQueryPayload {
  id: string,
  srcLocale: string
  dstLocale: string
}

interface FieldValuesQueryPayload {
  fieldId: string,
  srcLocale: string
  dstLocale: string
}

interface BrandQueryPayload {
  id: string,
  srcLocale: string
  dstLocale: string
}

interface ProductQueryPayload {
  identifier: {
    field: string
    value: any
  },
  srcLocale: string
  dstLocale: string
}

interface SkuQueryPayload {
  identifier: {
    field: string
    value: any
  },
  srcLocale: string
  dstLocale: string
}

type TranslationQueryPayload =
  | CategoryQueryPayload
  | CategoryGroupQueryPayload
  | FieldQueryPayload
  | FieldValuesQueryPayload
  | BrandQueryPayload
  | ProductQueryPayload
  | SkuQueryPayload
