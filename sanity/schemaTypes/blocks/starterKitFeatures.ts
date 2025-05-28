import { Rule } from '@sanity/types'

const starterKitFeatures = {
  title: "Starter Kit Features",
  name: "starterKitFeatures",
  type: "object",
  fields: [
    {
      title: "Main Title",
      name: "title",
      type: "string",
      description: "Main heading for the section",
      validation: (rule: Rule) => rule.required()
    },
    {
      title: "Main Description",
      name: "description",
      type: "text",
      description: "Subheading or brief introduction text",
    },
    {
      name: "features",
      title: "Feature Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            {
              name: "icon",
              type: "image",
              title: "Icon",
              description: "Feature icon image (e.g., SVG or PNG)",
              options: {
                hotspot: true,
              },
            },
            {
              name: "heading",
              type: "string",
              title: "Heading",
              description: "Short title for the feature",
              validation: (rule: Rule) => rule.required()
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              description: "Brief description of the feature",
            },
          ],
        },
      ],
      description: "List of features shown in a grid",
    },
  ],
}

export default starterKitFeatures
