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
      name: 'content',
      title: 'Project Content',
      type: 'array',
      description: 'Rich content with embedded components, markdown, and media',
      of: [
        {
          type: 'block',
          title: 'Rich Text',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Strikethrough', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true
                  }
                ]
              }
            ]
          },
        },
        {
          type: 'object',
          name: 'codeDemo',
          title: 'Code Demo',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Demo Title'
            },
            {
              name: 'language',
              type: 'string',
              title: 'Programming Language',
              options: {
                list: [
                  {title: 'JavaScript', value: 'javascript'},
                  {title: 'TypeScript', value: 'typescript'},
                  {title: 'Python', value: 'python'},
                  {title: 'CSS', value: 'css'},
                  {title: 'HTML', value: 'html'},
                  {title: 'JSON', value: 'json'},
                  {title: 'Bash', value: 'bash'},
                ]
              },
              initialValue: 'javascript'
            },
            {
              name: 'code',
              type: 'text',
              title: 'Code Content',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description (optional)'
            }
          ],
          preview: {
            select: {
              title: 'title',
              language: 'language'
            },
            prepare({title, language}) {
              return {
                title: title || 'Code Demo',
                subtitle: `Language: ${language || 'javascript'}`
              }
            }
          }
        },
        {
          type: 'object',
          name: 'imageGallery',
          title: 'Image Gallery',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Gallery Title'
            },
            {
              name: 'layout',
              type: 'string',
              title: 'Layout Style',
              options: {
                list: [
                  {title: 'Grid', value: 'grid'},
                  {title: 'Masonry', value: 'masonry'},
                  {title: 'Carousel', value: 'carousel'},
                  {title: 'Before/After', value: 'before-after'}
                ]
              },
              initialValue: 'grid'
            },
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text'
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption'
                    }
                  ]
                }
              ]
            },
            {
              name: 'caption',
              type: 'text',
              title: 'Gallery Caption'
            }
          ],
          preview: {
            select: {
              title: 'title',
              layout: 'layout',
              images: 'images'
            },
            prepare({title, layout, images}) {
              return {
                title: title || 'Image Gallery',
                subtitle: `${layout} layout • ${images?.length || 0} images`
              }
            }
          }
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Video Title'
            },
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or direct video file URL',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'text',
              title: 'Video Caption'
            },
            {
              name: 'autoplay',
              type: 'boolean',
              title: 'Autoplay',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'title',
              url: 'url'
            },
            prepare({title, url}) {
              return {
                title: title || 'Video Embed',
                subtitle: url
              }
            }
          }
        },
        {
          type: 'object',
          name: 'projectTimeline',
          title: 'Project Timeline',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Timeline Title',
              initialValue: 'Project Timeline'
            },
            {
              name: 'events',
              type: 'array',
              title: 'Timeline Events',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'date',
                      type: 'string',
                      title: 'Date/Period',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'title',
                      type: 'string',
                      title: 'Event Title',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'description',
                      type: 'text',
                      title: 'Description'
                    },
                    {
                      name: 'status',
                      type: 'string',
                      title: 'Status',
                      options: {
                        list: [
                          {title: 'Completed', value: 'completed'},
                          {title: 'In Progress', value: 'in-progress'},
                          {title: 'Planned', value: 'planned'},
                          {title: 'Cancelled', value: 'cancelled'}
                        ]
                      },
                      initialValue: 'completed'
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              events: 'events'
            },
            prepare({title, events}) {
              return {
                title: title || 'Project Timeline',
                subtitle: `${events?.length || 0} events`
              }
            }
          }
        },
        {
          type: 'object',
          name: 'techStack',
          title: 'Tech Stack',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              initialValue: 'Technologies Used'
            },
            {
              name: 'categories',
              type: 'array',
              title: 'Technology Categories',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'category',
                      type: 'string',
                      title: 'Category Name',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'technologies',
                      type: 'array',
                      title: 'Technologies',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'name',
                              type: 'string',
                              title: 'Technology Name',
                              validation: Rule => Rule.required()
                            },
                            {
                              name: 'description',
                              type: 'text',
                              title: 'Usage Description'
                            },
                            {
                              name: 'icon',
                              type: 'image',
                              title: 'Technology Icon'
                            },
                            {
                              name: 'color',
                              type: 'string',
                              title: 'Brand Color (hex)',
                              validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
                                name: 'hex color',
                                invert: false
                              })
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              categories: 'categories'
            },
            prepare({title, categories}) {
              const totalTech = categories?.reduce((acc: number, cat: any) =>
                acc + (cat.technologies?.length || 0), 0) || 0
              return {
                title: title || 'Tech Stack',
                subtitle: `${categories?.length || 0} categories • ${totalTech} technologies`
              }
            }
          }
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Callout Type',
              options: {
                list: [
                  {title: 'Info', value: 'info'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Success', value: 'success'},
                  {title: 'Error', value: 'error'},
                  {title: 'Note', value: 'note'}
                ]
              },
              initialValue: 'info'
            },
            {
              name: 'title',
              type: 'string',
              title: 'Callout Title'
            },
            {
              name: 'content',
              type: 'text',
              title: 'Content',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              content: 'content'
            },
            prepare({title, type, content}) {
              return {
                title: title || `${type} callout`,
                subtitle: content?.substring(0, 60) + (content?.length > 60 ? '...' : '')
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'contentLegacy',
      title: 'Legacy Content (Markdown)',
      type: 'text',
      description: 'Simple markdown content (deprecated - use Rich Content above)',
      hidden: true
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
      title: 'Image Gallery (Legacy)',
      type: 'array',
      description: 'Use Image Gallery component in Rich Content instead',
      hidden: true,
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
          name: 'category',
          title: 'Category',
          type: 'string',
          options: {
            list: [
              {title: 'Product Design', value: 'product-design'},
              {title: 'UX Research', value: 'ux-research'},
              {title: 'Visual Design', value: 'visual-design'},
              {title: 'Design System', value: 'design-system'},
              {title: 'Branding', value: 'branding'},
              {title: 'Web Design', value: 'web-design'},
              {title: 'Mobile Design', value: 'mobile-design'},
              {title: 'Prototyping', value: 'prototyping'},
              {title: 'Case Study', value: 'case-study'},
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
          title: '⭐ Featured Project',
          type: 'boolean',
          initialValue: false,
          description: 'Mark this project as featured - will appear on the homepage'
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
          description: 'Design tools used (e.g., Figma, Sketch, Adobe XD)'
        }),
        defineField({
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Relevant tags for filtering and search'
        }),
        defineField({
          name: 'interactive',
          title: 'Interactive Features',
          type: 'object',
          fields: [
            defineField({
              name: 'hasLiveVersion',
              title: 'Has Live Version',
              type: 'boolean',
              initialValue: false,
              description: 'Does this project have a live/deployed version?'
            }),
            defineField({
              name: 'liveUrl',
              title: 'Live URL',
              type: 'url',
              description: 'Link to the live version of the project'
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage'
    }
  }
})
