import { defineField, defineType } from 'sanity'

export const imageSchema = defineType({
  name: 'image',
  title: 'Imagem',
  type: 'object',
  fields: [
    defineField({
      name: 'arquivo',
      title: 'Arquivo',
      type: 'reference',
      to: [{ type: 'sanity.imageAsset' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
