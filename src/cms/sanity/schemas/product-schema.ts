import { defineArrayMember, defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'code',
      title: 'Codigo',
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
      name: 'description',
      title: 'Descricao',
      type: 'text',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'applications',
      title: 'Aplicacoes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'application' }],
        }),
      ],
    }),
    defineField({
      name: 'inStock',
      title: 'Em estoque',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
})
