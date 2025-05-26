// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { createClient } from 'next-sanity'

const liveClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-19',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN,
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

export const { sanityFetch, SanityLive } = defineLive({ 
  client: liveClient as any
});
