
const heroSection = {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'downloadButton',
      title: 'Download Button',
      type: 'object',
      fields: [
        { name: 'buttonText', type: 'string', title: 'Button Text' },
        { name: 'buttonUrl', type: 'url', title: 'Button URL' },
        { name: 'buttonIcon', type: 'string', title: 'Button Icon (e.g. PlayIcon)' }
      ]
    },
    {
      name: 'demoButton',
      title: 'Demo Button',
      type: 'object',
      fields: [
        { name: 'buttonText', type: 'string', title: 'Button Text' },
       { name: 'buttonUrl', type: 'url', title: 'Button URL' },
        { name: 'demoButtonSubtitle', type: 'string', title: 'Demo Button Subtitle' }
      ]
    },
    {
      name: 'phoneMockupImage',
      title: 'Phone Mockup Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }
  
  ],
}

export default heroSection
