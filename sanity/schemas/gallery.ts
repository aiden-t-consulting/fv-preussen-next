import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Fotogalerie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "datetime",
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt-Text", type: "string" }),
            defineField({
              name: "caption",
              title: "Bildunterschrift",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "photos.0" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString("de-DE") : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Neueste zuerst",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
