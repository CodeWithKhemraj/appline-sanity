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