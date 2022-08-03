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

type TranslatableData =
  | CategoryTranslationData
  | BrandData
  | ProductData
  | SKUData
  | SKUProductSpecificationData
  | SpecificationValuesData
  | CategoryGroupData
