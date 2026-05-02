import { defineArrayMember, defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Produtos',
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
      name: 'description',
      title: 'Descricao',
      type: 'text',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'application',
      title: 'Aplicacao',
      type: 'reference',
      to: [{ type: 'application' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'catalog',
      title: 'Catalogo',
      type: 'reference',
      to: [{ type: 'catalog' }],
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
