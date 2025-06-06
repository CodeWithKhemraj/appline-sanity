import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {productType} from './productType'
import {headerType} from './global/header'
import {footerType} from './global/footer'
import Page from './document/page'
import HeroSection from './blocks/heroSection'
import StarterKitFeatures from './blocks/starterKitFeatures'
import PricingSection from './blocks/pricingSection'

export const schemaTypes = [productType, headerType, footerType, Page]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, headerType, footerType, Page, HeroSection, StarterKitFeatures, PricingSection],
} 