import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'playgroundEntry',
  title: 'Playground Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'entryType',
      title: 'Entry Type',
      type: 'string',
      options: {
        list: [
          {title: 'P5.js Experiment', value: 'p5js'},
          {title: 'Three.js Experiment', value: 'threejs'},
          {title: 'Photography', value: 'photography'},
          {title: 'Photo Story', value: 'photo-story'},
          {title: 'Graphic Design', value: 'graphic-design'},
          {title: 'Article', value: 'article'},
          {title: 'Critique', value: 'critique'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Brief Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
        {
          type: 'code',
          options: {
            withFilename: true, // optional
            highlightedLines: [], // optional
          },
        },
        {
          type: 'object',
          name: 'p5jsSketch',
          title: 'P5.js Sketch',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Sketch URL',
              description: 'URL of the hosted P5.js sketch (e.g., on OpenProcessing, or a self-hosted URL)',
            },
            {
                name: 'height',
                type: 'number',
                title: 'height',
                description: 'height of the iframe',
              },
          ],
        },
        {
            type: 'object',
            name: 'figmaEmbed',
            title: 'Figma Embed',
            fields: [
              {
                name: 'url',
                type: 'url',
                title: 'Figma URL',
                description: 'URL of the figma file/prototype',
              },
              {
                  name: 'height',
                  type: 'number',
                  title: 'height',
                  description: 'height of the iframe',
                },
            ],
          },
          {
            type: 'object',
            name: 'fileAttachment',
            title: 'File Attachment',
            fields: [
              {
                name: 'file',
                type: 'file',
                title: 'File'
              },
              {
                name: 'description',
                type: 'string',
                title: 'Description'
              },
              {
                name: 'coverImage',
                type: 'image',
                title: 'Cover Image'
              }
            ]
          }
      ],
    }),
    defineField({
        name: 'metadata',
        title: 'Metadata',
        type: 'object',
        fields: [
          defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{type: 'string'}],
            description: 'Relevant tags for filtering and discovery'
          }),
          defineField({
            name: 'publishDate',
            title: 'Publish Date',
            type: 'date'
          }),
        ]
      }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'entryType',
      media: 'coverImage',
    },
  },
})
