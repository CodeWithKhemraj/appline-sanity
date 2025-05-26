import { defineField, defineType } from 'sanity'

export const footerType = defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  fields: [
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Company Name',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'bottomLinks',
      type: 'array',
      title: 'Bottom Links (e.g. Privacy Policy)',
      of: [
        {
          type: 'object',
          title: 'Bottom Link',
          fields: [
            { name: 'label', type: 'string', title: 'Link Label' },
            { name: 'url', type: 'url', title: 'Link URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      type: 'string',
      title: 'Copyright Text',
    }),
  ],
  preview: {
    select: {
      media: 'logo',
      description: 'description',
      columns: 'columns',
      socialLinks: 'socialLinks',
      bottomLinks: 'bottomLinks',
      copyright: 'copyright',
    },
    
    prepare({ media, description, copyright, columns = [], socialLinks = [], bottomLinks = [] }) {
      return {
        title: 'Footer',
        subtitle: `${columns.length} cols, ${socialLinks.length} social links, ${bottomLinks.length} bottom links`,
        media,
      }
    }
  }
})