const starterKitFeatures = {
  title: "Starter Kit Features",
  name: "starterKitFeatures",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "text",
    },
    {
      name: 'featurekeys',
      title: "Feature Keys",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'keys',
          title: 'Keys',
          fields: [
            { name: 'image', type: 'url', title: 'Image' },
            { name: 'keyheading', type: 'string', title: 'Key Heading' },
            { name: 'keydescription', type: 'text', title: 'Key Description' },
          ],
        },
      ],
    }
  ]
}
export default starterKitFeatures
