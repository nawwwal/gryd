import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workProject',
  title: 'Work Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'Markdown content for the project details'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.'
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility.'
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'attachments',
      title: 'Project Attachments',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              title: 'File Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'Photography', value: 'photography'},
              {title: 'Code', value: 'code'},
              {title: 'Blog', value: 'blog'},
              {title: 'Prototype', value: 'prototype'},
              {title: 'Research', value: 'research'},
              {title: 'Visual', value: 'visual'},
              {title: 'Note', value: 'note'},
            ]
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'category',
          title: 'Category',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              {title: 'Live', value: 'live'},
              {title: 'Prototype', value: 'prototype'},
              {title: 'Archived', value: 'archived'},
              {title: 'Ongoing', value: 'ongoing'},
              {title: 'Draft', value: 'draft'},
            ]
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'featured',
          title: '⭐ Featured Project',
          type: 'boolean',
          initialValue: false,
          description: 'Mark this project as featured - will appear on the homepage',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'publishDate',
          title: 'Publish Date',
          type: 'date',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Last Updated',
          type: 'date',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'tools',
          title: 'Tools',
          type: 'array',
          of: [{type: 'string'}]
        }),
        defineField({
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [{type: 'string'}]
        }),
        defineField({
          name: 'difficulty',
          title: 'Difficulty',
          type: 'string',
          options: {
            list: [
              {title: 'Beginner', value: 'Beginner'},
              {title: 'Intermediate', value: 'Intermediate'},
              {title: 'Advanced', value: 'Advanced'},
              {title: 'Expert', value: 'Expert'},
            ]
          }
        }),
        defineField({
          name: 'interactive',
          title: 'Interactive Links',
          type: 'object',
          fields: [
            defineField({
              name: 'hasDemo',
              title: 'Has Demo',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'demoUrl',
              title: 'Demo URL',
              type: 'url'
            }),
            defineField({
              name: 'codeUrl',
              title: 'Code URL',
              type: 'url'
            }),
          ]
        }),
      ]
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage'
    }
  }
})
