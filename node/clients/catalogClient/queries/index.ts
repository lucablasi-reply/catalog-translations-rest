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
  mutation translate($args:FieldValueInputTranslation, $locale:Locale){
    translateFieldValues(fieldValues:$args,locale:$locale)
  }
`

export const CATEGORY_GROUP_TRANSLATION_MUTATION = `
  mutation translate($args: GroupInputTranslation, $locale:Locale) {
    translateGroup(group: $args, locale:$locale)
  }
`
