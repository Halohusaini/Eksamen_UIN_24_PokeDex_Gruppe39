export const team = {
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'pokemons',
      title: 'Pokemons',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'pokemon' } }],
      validation: Rule => Rule.required().min(3).max(3)
    }
  ]
}
