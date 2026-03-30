import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "clubName",
      title: "Vereinsname",
      type: "string",
      initialValue: "FV Preussen Eberswalde e.V.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Slogan",
      type: "string",
      initialValue: "Motor des Barnim – Fußball ist unsere Zukunft",
    }),
    defineField({
      name: "contactEmail",
      title: "Kontakt-E-Mail",
      type: "string",
      initialValue: "info@fvpreussen-eberswalde.de",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
      ],
    }),
    defineField({
      name: "badge",
      title: "Vereinswappen",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({ name: "alt", title: "Alt-Text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "clubName", media: "badge" },
  },
});
