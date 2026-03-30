import { defineField, defineType } from "sanity";

export const team = defineType({
  name: "team",
  title: "Mannschaft",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "name", maxLength: 50 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "division",
      title: "Liga / Spielklasse",
      type: "string",
      description: "z.B. Landesliga Nord, B-Junioren, Kreisliga",
    }),
    defineField({
      name: "season",
      title: "Saison",
      type: "string",
      description: "z.B. 2024/25",
    }),
    defineField({
      name: "coach",
      title: "Trainer",
      type: "string",
    }),
    defineField({
      name: "badge",
      title: "Mannschaftswappen",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fupaTeamId",
      title: "FuPa Team-Slug",
      type: "string",
      description: "Wird für die direkte FuPa-Verknüpfung verwendet",
    }),
    defineField({
      name: "players",
      title: "Kader",
      type: "array",
      of: [{ type: "reference", to: [{ type: "player" }] }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "division", media: "badge" },
  },
});
