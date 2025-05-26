import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {productType} from './productType'
import {headerType} from './global/header'
import {footerType} from './global/footer'
import {homePage} from './pages/homePage'

export const schemaTypes = [productType, headerType, footerType, homePage]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, headerType, footerType, homePage],
}