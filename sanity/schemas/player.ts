import { defineField, defineType } from "sanity";

export const player = defineType({
  name: "player",
  title: "Spieler",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      options: {
        list: [
          { title: "Torwart", value: "Torwart" },
          { title: "Abwehr", value: "Abwehr" },
          { title: "Mittelfeld", value: "Mittelfeld" },
          { title: "Angriff", value: "Angriff" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shirtNumber",
      title: "Trikotnummer",
      type: "number",
      validation: (Rule) => Rule.min(1).max(99).integer(),
    }),
    defineField({
      name: "nationality",
      title: "Nationalität",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Biografie",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "position", media: "photo" },
  },
});
