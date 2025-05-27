// src/app/page.tsx

import { draftMode } from 'next/headers'
import { client } from '../sanity/lib/client'
import { getHeroSectionDataQuery, getStarterfeaturesDataQuery } from '@/sanity/lib/pageQuery'
import HeroSection from './components/HeroSection'
import StarterFeatures from './components/StarterFeatures'

export default async function Home() {
  const data = await client.fetch(getHeroSectionDataQuery, {}, )
  const featureData = await client.fetch(getStarterfeaturesDataQuery, {}, )

  return (
    <main>
      <HeroSection section={data?.sections[0]} />
      <StarterFeatures section={featureData?.sections[0]} />
    </main>
  )
}
