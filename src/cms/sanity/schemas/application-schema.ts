import { defineField, defineType } from 'sanity'

export const applicationSchema = defineType({
  name: 'application',
  title: 'Aplicações',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
