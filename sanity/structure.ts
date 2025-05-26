import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('AlamoTees Store')
    .items([
      // Global Group
      S.listItem()
        .title('Global')
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.documentTypeListItem('header').title('Header'),
              S.documentTypeListItem('footer').title('Footer'),
            ])
        ),

      //Products 
      S.documentTypeListItem('product').title('Products'),

      S.divider(),

      // document types
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            'header',
            'footer',
            'product',
          ].includes(item.getId()!)
      ),
    ])