import { defineField, defineType } from 'sanity'

export const pdfFileSchema = defineType({
  name: 'pdfFile',
  title: 'Arquivo PDF',
  type: 'object',
  fields: [
    defineField({
      name: 'arquivo',
      title: 'Arquivo',
      type: 'reference',
      to: [{ type: 'sanity.fileAsset' }],
      validation: (rule) => rule.required(),
    }),
  ],
})
