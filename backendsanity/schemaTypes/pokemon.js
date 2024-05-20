export const pokemon = {
  name: 'pokemon',
  title: 'Pokemon',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'pokemonNumber',
      title: 'Pokemon Number',
      type: 'number',
      validation: Rule => Rule.required()
    }
  ]
}
