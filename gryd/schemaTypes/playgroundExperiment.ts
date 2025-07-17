import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'playgroundExperiment',
  title: 'Playground Experiment',
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
      type: 'string'
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
      type: 'text'
    }),
    defineField({
      name: 'intensity',
      title: 'Intensity',
      type: 'string',
      options: {
        list: [
          {title: 'Low', value: 'low'},
          {title: 'Medium', value: 'medium'},
          {title: 'High', value: 'high'},
        ]
      }
    }),
    defineField({
      name: 'visual',
      title: 'Visual Style',
      type: 'string',
      options: {
        list: [
          {title: 'Geometric', value: 'geometric'},
          {title: 'Photographic', value: 'photographic'},
          {title: 'Interactive', value: 'interactive'},
          {title: 'Analytical', value: 'analytical'},
          {title: 'Colorful', value: 'colorful'},
          {title: 'Technical', value: 'technical'},
          {title: 'Motion', value: 'motion'},
          {title: 'Typographic', value: 'typographic'},
        ]
      }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'Markdown content for the experiment details'
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
      title: 'Experiment Files',
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
          name: 'category',
          title: 'Category',
          type: 'string',
          options: {
            list: [
              {title: 'Code Experiment', value: 'code-experiment'},
              {title: 'Visual Research', value: 'visual-research'},
              {title: 'Interactive Demo', value: 'interactive-demo'},
              {title: 'Design System', value: 'design-system'},
              {title: 'Animation Study', value: 'animation-study'},
              {title: 'Typography', value: 'typography'},
              {title: 'Color Theory', value: 'color-theory'},
              {title: 'Prototype', value: 'prototype'},
              {title: 'Technical Research', value: 'technical-research'},
            ]
          }
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
          }
        }),
        defineField({
          name: 'featured',
          title: '⭐ Featured Experiment',
          type: 'boolean',
          initialValue: false,
          description: 'Mark this experiment as featured - will appear prominently'
        }),
        defineField({
          name: 'publishDate',
          title: 'Publish Date',
          type: 'date'
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Last Updated',
          type: 'date'
        }),
        defineField({
          name: 'tools',
          title: 'Tools',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Tools and technologies used in this experiment'
        }),
        defineField({
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Relevant tags for filtering and discovery'
        }),
        defineField({
          name: 'interactive',
          title: 'Interactive Links',
          type: 'object',
          fields: [
            defineField({
              name: 'hasLiveVersion',
              title: 'Has Live Version',
              type: 'boolean',
              initialValue: false,
              description: 'Does this experiment have a live/interactive version?'
            }),
            defineField({
              name: 'liveUrl',
              title: 'Live URL',
              type: 'url',
              description: 'Link to the live experiment or demo'
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
