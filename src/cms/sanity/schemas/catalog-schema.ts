import { defineField, defineType } from 'sanity'

export const catalogSchema = defineType({
  name: 'catalog',
  title: 'Catalogo',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Arquivo PDF',
      type: 'pdfFile',
      validation: (rule) => rule.required(),
    }),
  ],
})
