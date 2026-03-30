import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Unternehmensname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tier",
      title: "Partnerschaft-Ebene",
      type: "string",
      options: {
        list: [
          { title: "Hauptsponsor", value: "hauptsponsor" },
          { title: "Premium Partner", value: "premiumsponsor" },
          { title: "Partner / Top-Partner", value: "partner" },
          { title: "Förderer", value: "foerderer" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Beschreibung (optional)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
  orderings: [
    {
      title: "Rang (Hauptsponsor zuerst)",
      name: "tierAsc",
      by: [{ field: "tier", direction: "asc" }],
    },
  ],
});
