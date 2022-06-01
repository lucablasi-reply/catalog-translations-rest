type Throttle = <Return = unknown>(
  fn: () => Return | Promise<Return>
) => Promise<Return>

interface TranslationValidationResponse {
  errors: number
  categories: any
  brands: any
  products: any
  skus: any
  skusProductsSpecifications: any
  specificationValuesData: any
  categoriesGroupsData: any
}

interface EntityTranslationData {
  translated: number
  translationFailures: TranslatableData[]
}

interface TranslationsDataResponse {
  total: number
  totalTranslated: number
  totalFailures: number
  failureDetail: {
    categories: TranslatableData[] | []
    brands: TranslatableData[] | []
    products: TranslatableData[] | []
    skus: TranslatableData[] | []
    skusProductsSpecifications: TranslatableData[] | []
    specificationValuesData: TranslatableData[] | []
    categoriesGroupsData: TranslatableData[] | []
  }
}

type TranslatableTypes =
  | 'category'
  | 'brand'
  | 'product'
  | 'sku'
  | 'category-group'
  | 'sku-product-specification-value'
  | 'specification-value-data'

type TranslatablePropTypes =
  | 'categories'
  | 'brands'
  | 'products'
  | 'skus'
  | 'categoriesGroupsData'
  | 'skusProductsSpecifications'
  | 'specificationValuesData'

interface BulkTranslationData {
  categories: CategoryTranslationData[]
  brands: BrandData[]
  products: ProductData[]
  skus: SKUData[]
  skusProductsSpecifications: SKUProductSpecificationData[]
  specificationValuesData: SpecificationValuesData[]
  categoriesGroupsData: CategoryGroupData[]
}
