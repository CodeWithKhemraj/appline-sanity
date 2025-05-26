import { defineField, defineType } from 'sanity';

export const footerType = defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Footer Description',
    }),
    defineField({
      name: 'columns',
      type: 'array',
      title: 'Footer Columns',
      of: [
        {
          type: 'object',
          title: 'Column',
          fields: [
            { name: 'title', type: 'string', title: 'Column Title' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  title: 'Link',
                  fields: [
                    { name: 'label', type: 'string', title: 'Link Label' },
                    { name: 'url', type: 'url', title: 'Link URL' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Media Links',
      of: [
        {
          type: 'object',
          title: 'Social Link',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform (e.g., Twitter)' },
            { name: 'url', type: 'url', title: 'Profile URL' },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name (for frontend)',
              description: 'Use icon key like "twitter", "facebook", "linkedin", etc.',
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
    prepare({ media, columns = [], socialLinks = [], bottomLinks = [] }) {
      return {
        title: 'Footer',
        subtitle: `${columns.length} cols, ${socialLinks.length} social links, ${bottomLinks.length} bottom links`,
        media,
      };
    },
  },
});
