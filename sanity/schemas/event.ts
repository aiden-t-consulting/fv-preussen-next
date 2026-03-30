import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Veranstaltung",
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
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Heimspiel", value: "heimspiel" },
          { title: "Auswärtsspiel", value: "auswaertsspiel" },
          { title: "Training", value: "training" },
          { title: "Veranstaltung", value: "veranstaltung" },
          { title: "Sonstiges", value: "sonstiges" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Datum / Beginn",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Ende (optional)",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Ort / Adresse",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "coverImage",
      title: "Titelbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "coverImage" },
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
      title: "Datum aufsteigend",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
