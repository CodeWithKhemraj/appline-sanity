import { defineField, defineType } from 'sanity'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
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
              hidden: ({ parent }) => parent.subItems?.length > 0,
            },
            {
              name: 'subItems',
              title: 'Dropdown Items',
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
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'authLinks',
      title: 'Auth Links',
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
            {
              name: 'isButton',
              title: 'Show as Button',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'logo',
      menuItems: 'menuItems',
      authLinks: 'authLinks',
    },
    prepare({ media, menuItems = [], authLinks = [] }) {
      return {
        title: 'Header',
        subtitle: `${menuItems.length} menus, ${authLinks.length} auth links`,
        media,
      }
    }
  }
});