// src/app/page.tsx

import { client } from '../sanity/lib/client'
import { getHeroSectionDataQuery } from '@/sanity/lib/pageQuery'
import HeroSection from './components/HeroSection'

export default async function Home() {
  const data = await client.fetch(getHeroSectionDataQuery, {}, )

  return (
    <main>
      <HeroSection section={data?.sections[0]} />
    </main>
  )
}
