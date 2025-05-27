import groq from 'groq'

// Hero section Query
export const getHeroSectionDataQuery = groq`*[_type == "page" && slug.current == "home"][0] {
  title,
  slug,
  sections[ _type == "heroSection" ]{
    title,
    subtitle,
    highlightedText,
    description,
    downloadButton {
      buttonText,
      buttonUrl,
      buttonIcon
    },
    demoButton {
      buttonText,
      demoButtonSubtitle
    },
    phoneMockupImage {
      asset->{
        _id,
        url
      }
    }
  }
}

`
// Starter features section Query
export const getStarterfeaturesDataQuery = groq`*[_type == "page" && slug.current == "home"][0] {
  title,
  slug,
  sections[ _type == "starterKitFeatures" ]{
    title,
    description,
    features[] {
       icon{
        asset->{
          url
        }
      },
      heading,
      description
    }
  }
}

`

export const getPopularProducts = groq`*[_type == "product" && isPopular == true][0...6]{
  _id,
  title,
  slug,
  price,
  rating,
  image {
    asset -> {
      url
    }
  },
  category,
  description
}
`
