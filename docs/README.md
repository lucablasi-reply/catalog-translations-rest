# Catalog Translations Rest

Rest API that allows to define / retrieve translations for each entity of the catalog. The definition of translations can be performed also massively by using the route "Bulk".

You can download an example of Postman Collection from this ([link](https://github.com/vtex-apps/catalog-translations-rest/blob/development/docs/VTEX%20-%20Catalog%20Translation%20API.postman_collection.json)).

Check ([this](https://developers.vtex.com/vtex-developer-docs/docs/catalog-internationalization)) documentation for more information.

## Authentication

Each route must include in the headers either:

| **Header** | **Type** |
| ---------- | -------- |
| `AppKey`   | string   |
| `AppToken` | string   |

Or:

| **Header**           | **Type** | **Description**                     |
| -------------------- | -------- | ----------------------------------- |
| `authorizationToken` | string   | VTEX Auth Cookie for authorization. |

Following you can find the list of available routes.

## Translation Definition

#### Category

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/category`

Payload example:

```json
{
  "args": {
    "id": "3",
    "name": "Elêtronicos",
    "title": "Casa - Elêtronicos",
    "description": "Esta é a descrição da categoria Eletrônicos",
    "keywords": ["eletronicos", "utensílios"],
    "linkId": "eletronicos"
  },
  "locale": "pt-BR"
}
```

#### Category Group

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/category-group`

Payload example:

```json
{
    "args": {
        "groupId": "1794",
        "name": "Performance"
    },
    "locale": "en-US"
}
```

#### Specification Field

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/sku-specification`

Payload example:

```json
{
  "args": {
    "fieldId": "31",
    "name": "Cor"
  },
  "locale": "pt-BR"
}
```

#### Specification Values

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/specification-values`

Payload example:

```json
{
  "args": {
    "fieldId": "31",
    "fieldValuesNames": [
      {
        "id": "91",
        "name": "Azul"
      },
      {
        "id": "92",
        "name": "Vermelho"
      }
    ]
  },
  "locale": "pt-BR"
}
```

#### Product Specification (type: free text)

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/product-specification`

Payload example:

```json
{
  "args": {
    "to": "en-US",
    "messages": [
      {
        "srcLang": "it-IT",
        "srcMessage": "A libera installazione",
        "targetMessage": "Free standing",
        "context": "5086"
      }
    ] 
  }
}
```

#### Brand

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/brand`

Payload example:

```json
{
  "args": {
    "id": "2000057",
    "name": "Calvin Klein",
    "text": "Esta é uma descrição da marca.",
    "siteTitle": "Calvin Klein",
    "keywords": "calvin klain"
  },
  "locale": "pt-BR"
}
```

#### Product

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/product`

Payload example:

```json
{
  "args": {
    "id": "45",
    "name": "Câmera Retrô",
    "description": "Esta é uma descrição genérica deste produto.",
    "shortDescription": "Esta é uma breve descrição genérica deste produto.",
    "title": "Câmera Retrô - Store Components",
    "metaTagDescription": "Compre os melhores produtos em nossa loja",
    "linkId": "black-steel-film-camera",
    "keywords": ["lomografia", "vintage"]
  },
  "locale": "pt-BR"
}
```

#### Sku

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/sku`

Payload example:

```json
{
  "args": {
    "id": "46",
    "name": "Mixer Retro - Marrom"
  },
  "locale": "pt-BR"
}
```

#### Bulk Translate

Bulk Translate allows to make a massive translation of the above entities. For each of these, the same structure presented above must be respected.

It is necessary to specify an email where you will receive a report on the translations done and will be notified in case there has been an error in any specific translation.

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/bulkTranslate`

```json
{
  "notificationEmail": "",
  "categories": [],
  "brands": [],
  "products": [],
  "skus": [],
  "skusProductsSpecifications": [],
  "specificationValuesData": [],
  "categoriesGroupsData": []
}
```

## Translation Retrieval

#### Category

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/category/fetch`

Payload example:|

```json
{
  "id": "12",
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```

#### Category Group

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/category-group/fetch`

Payload example::

```json
{
  "id": "1794",
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```

#### Specification Field

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/sku-specification/fetch`

Payload example:

```json
{
  "id": "5086",
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```

#### Specification Values

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/specification-values/fetch`

Payload example:

```json
{
  "fieldId": "4113",
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```

#### Brand

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/brand/fetch`

Payload example:

```json
{
  "id": "2000000",
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```

#### Product

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/product/fetch`

Payload example:

```json
{
  "identifier": {
    "field": "id",
    "value": "12"
  },
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```

#### Sku

`POST`

`https://{environment}--{accountName}.myvtex.com/v0/catalog-translation/sku/fetch`

Payload example:

```json
{
  "identifier": {
    "field": "id",
    "value": "25"
  },
  "srcLocale": "it-IT",
  "dstLocale": "en-US"
}
```
