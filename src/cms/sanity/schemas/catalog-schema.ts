import { defineField, defineType } from 'sanity'

export const catalogSchema = defineType({
  name: 'catalog',
  title: 'Catálogos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Arquivo PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
