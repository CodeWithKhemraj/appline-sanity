// src/app/page.tsx

import { draftMode } from 'next/headers'
import { client } from '../sanity/lib/client'
import { getHeroSectionDataQuery, getStarterfeaturesDataQuery, getPopularProducts, getPricingDataQuery } from '@/sanity/lib/pageQuery'
import HeroSection from './components/HeroSection'
import StarterFeatures from './components/StarterFeatures'
import PopularProduct from './components/popularProduct'
import PricingFeature from './components/PricingFeature'

export default async function Home() {
  const data = await client.fetch(getHeroSectionDataQuery, {}, )
  const featureData = await client.fetch(getStarterfeaturesDataQuery, {}, )
  const popularProducts = await client.fetch(getPopularProducts, {}, )
  const PringData = await client.fetch(getPricingDataQuery, {}, )

  return (
    <main>
      <HeroSection section={data?.sections[0]} />
      <StarterFeatures section={featureData?.sections[0]} />
      <PopularProduct products={popularProducts} />
      <PricingFeature section={PringData?.sections[0]} />
    </main>
  )
}
