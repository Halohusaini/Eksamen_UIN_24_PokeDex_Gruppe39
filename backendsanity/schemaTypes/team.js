export const team = {
    name: 'team',
    title: 'Team',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200
        }
      },
      {
        name: 'pokemons',
        title: 'Pokemons',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'pokemon'}]}]
      }
    ]
  }
  