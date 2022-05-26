interface TransaltionData {
  args: CategoryData | BrandData | ProductData | SKUData | SKUProductSpecificationData | SpecificationValuesData | CategoryGroupData
  locale: string
}

interface CategoryData {
  id: string
  name: string
  title: string
  description: string
  keywords: string[]
  linkId: string
}

interface BrandData {
  id: string
  name: string
  text: string
  siteTitle: string
  keywords: string
}

interface ProductData {
  id: string
  name: string
  title: string
  description: string
  shortDescription: string
  metaTagDescription: string
  linkId: string
  keywords: string[]
}

interface SKUData {
  id: string
  name: string
}

interface SKUProductSpecificationData {
  fieldId: string
  name: string
}

interface FieldValueNames {
  id: string
  name: string
}

interface SpecificationValuesData {
  fieldId: string
  fieldValueNames: FieldValueNames[]
}

interface CategoryGroupData {
  groupId: string
  name: string
}

interface TranslationResponse {
  translateCategory: boolean
}
