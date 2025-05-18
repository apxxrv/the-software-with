export default {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Guide", value: "GUIDE" },
          { title: "Interview", value: "INTERVIEW" },
          { title: "Analysis", value: "ANALYSIS" },
          { title: "News", value: "NEWS" },
          { title: "Tutorial", value: "TUTORIAL" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "categoryColor",
      title: "Category Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "bg-blue-600" },
          { title: "Teal", value: "bg-teal-600" },
          { title: "Indigo", value: "bg-indigo-600" },
          { title: "Cyan", value: "bg-cyan-600" },
          { title: "Green", value: "bg-green-600" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark as featured article",
      initialValue: false,
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
          ],
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection: any) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
}
