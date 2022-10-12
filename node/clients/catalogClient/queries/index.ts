export const CATEGORY_TRANSLATIONS_MUTATION = `
  mutation translate($args:CategoryInputTranslation, $locale:Locale){
    translateCategory(category:$args,locale:$locale)
  }
`
export const BRAND_TRANSLATION_MUTATION = `
  mutation translate($args:BrandInputTranslation, $locale:Locale){
    translateBrand(brand:$args,locale:$locale)
  }
`
export const PRODUCT_TRANSLATION_MUTATION = `
  mutation translate($args:ProductInputTranslation, $locale:Locale){
    translateProduct(product:$args,locale:$locale)
  }
`
export const SKU_TRANSLATION_MUTATION = `
  mutation translate($args:SKUInputTranslation, $locale:Locale){
    translateSKU(sku:$args,locale:$locale)
  }
`

export const SKU_PRODUCT_SPCIFICATION_TRANSLATION_MUTATION = `
  mutation translate($args:FieldInputTranslation, $locale:Locale){
    translateField(field:$args,locale:$locale)
  }
`

export const SPECIFICATION_VALUES_TRANSLATION_MUTATION = `
  mutation translate($args: FieldValueInputTranslation, $locale: Locale){
    translateFieldValues(fieldValues: $args, locale: $locale)
  }
`

export const CATEGORY_GROUP_TRANSLATION_MUTATION = `
  mutation translate($args: GroupInputTranslation, $locale:Locale) {
    translateGroup(group: $args, locale:$locale)
  }
`

export const GET_CATEGORY_TRANSLATION_QUERY = `
  query getTranslation($id:ID!) {
    category(id: $id) {
      id
      name
      title
      description
      linkId
      keywords
    }
  }
`

export const BRAND_TRANSLATION_QUERY = `
  query getTranslation($id: ID!) {
    brand(id: $id){
      id
      name
      text
      siteTitle
      linkId
    }
  }
`

export const GET_PRODUCT_TRANSLATION_QUERY = `
  query getTranslation($identifier: ProductUniqueIdentifier) {
    product(identifier: $identifier) {
      id
      name
      title
      description
      shortDescription
      metaTagDescription
      linkId
      keywords
    }
  }
`
export const SKU_TRANSLATION_QUERY = `
  query getTranslation($identifier: SKUUniqueIdentifier) {
    sku(identifier: $identifier){
      id
      name
      specifications{
        product{
          id
          value
          field{
            fieldId
            name
            description
          }
        }
      }
    }
  }
`

export const SKU_PRODUCT_SPCIFICATION_TRANSLATION_QUERY = `
  query getTranslation($id: ID) {
    field(id: $id){
      fieldId
      name
    }
  }
`

export const SPECIFICATION_VALUES_TRANSLATION_QUERY = `
  query getTranslation($fieldId: ID) {
    fieldValues(fieldId: $fieldId){
      fieldValueId
      value
      text
    }
  }
`

export const GET_CATEGORY_GROUP_TRANSLATION_QUERY = `
  query getTranslation($id: ID) {
    group(id: $id){
      id
      name
    }
  }
`
