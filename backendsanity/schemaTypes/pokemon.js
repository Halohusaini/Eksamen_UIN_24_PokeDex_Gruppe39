export const pokemon ={
    name: 'pokemon',
    title: 'Pokemon',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true // This enables image cropping in the Sanity Studio
        }
      },
      {
        name: 'type',
        title: 'Type',
        type: 'array',
        of: [{type: 'string'}]
      },
      {
        name: 'stats',
        title: 'Stats',
        type: 'object',
        fields: [
          {name: 'hp', type: 'number', title: 'HP'},
          {name: 'attack', type: 'number', title: 'Attack'},
          {name: 'defense', type: 'number', title: 'Defense'},
          // Add more stats as needed
        ]
      },
      {
        name: 'abilities',
        title: 'Abilities',
        type: 'array',
        of: [{type: 'string'}]
      }
    ]
  }
  