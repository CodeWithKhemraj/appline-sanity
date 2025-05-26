import groq from 'groq'

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