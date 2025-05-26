import { groq } from 'next-sanity'
import { client } from './client'

export const getHeader = async () => {
  const query = groq`*[_type == "header"][0]{
    logo {
      asset->{
        url
      }
    },
    menuItems[]{
      title,
      url,
      subItems[]{
        title,
        url
      }
    },
    authLinks[]{
      title,
      url,
      isButton
    }
  }`

  return await client.fetch(query)
}


export async function getFooter() {
  const query = groq`*[_type == 'footer'][0] {
     logo {
      asset->{
        url
      }
    },
    description,
    columns[] {
      title,
      links[] {
        label,
        url
      }
    },
    socialLinks[] {
      platform,
      url,
      icon
    },
    bottomLinks[] {
      label,
      url
    },
    copyright
  }`

  return await client.fetch(query)
}