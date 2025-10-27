import type { EmbedsOption } from "astro-custom-embeds";

const NoteCalloutEmbed: EmbedsOption = {
  componentName: "NoteCallout",
  directiveName: "note",
  importPath: "src/embeds",
};

const TipCalloutEmbed: EmbedsOption = {
  componentName: "TipCallout",
  directiveName: "tip",
  importPath: "src/embeds",
};

const ImportantCalloutEmbed: EmbedsOption = {
  componentName: "ImportantCallout",
  directiveName: "info",
  importPath: "src/embeds",
};

const WarningCalloutEmbed: EmbedsOption = {
  componentName: "WarningCallout",
  directiveName: "warning",
  importPath: "src/embeds",
};

const CautionCalloutEmbed: EmbedsOption = {
  componentName: "CautionCallout",
  directiveName: "danger",
  importPath: "src/embeds",
};

export const calloutEmbeds: EmbedsOption[] = [
  NoteCalloutEmbed,
  TipCalloutEmbed,
  ImportantCalloutEmbed,
  WarningCalloutEmbed,
  CautionCalloutEmbed,
];
