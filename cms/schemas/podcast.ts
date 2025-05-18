export default {
  name: "podcast",
  title: "Podcast",
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
          { title: "Latest Episode", value: "Latest Episode" },
          { title: "Interview", value: "Interview" },
          { title: "Tech Talk", value: "Tech Talk" },
          { title: "Panel", value: "Panel" },
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
          { title: "Blue", value: "bg-blue-500" },
          { title: "Teal", value: "bg-teal-500" },
          { title: "Purple", value: "bg-purple-500" },
          { title: "Green", value: "bg-green-500" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "audioFile",
      title: "Audio File",
      type: "file",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark as featured podcast",
      initialValue: false,
    },
    {
      name: "hosts",
      title: "Hosts",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
    },
    {
      name: "guests",
      title: "Guests",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
    },
    {
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
}
