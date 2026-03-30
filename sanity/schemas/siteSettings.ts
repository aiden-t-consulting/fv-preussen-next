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
    defineField({
      name: "heroSlides",
      title: "Hero-Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow-Text (z.B. 'Naechstes Spiel')", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "title", title: "Überschrift", type: "string" }),
            defineField({ name: "subtitle", title: "Untertitel", type: "text", rows: 2 }),
            defineField({ name: "isDynamic", title: "Dynamisch (zeigt nächstes Spiel)", type: "boolean", initialValue: false }),
            defineField({
              name: "image",
              title: "Bild (Spieler-Foto o.ä.)",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
            }),
            defineField({ name: "cta1Label", title: "Button 1 – Text", type: "string" }),
            defineField({ name: "cta1Href", title: "Button 1 – Link", type: "string" }),
            defineField({ name: "cta2Label", title: "Button 2 – Text", type: "string" }),
            defineField({ name: "cta2Href", title: "Button 2 – Link", type: "string" }),
          ],
          preview: {
            select: { title: "eyebrow", subtitle: "title", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "clubName", media: "badge" },
  },
});
