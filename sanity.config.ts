"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Enciclopedia Florilor",
  projectId,
  dataset,
  basePath: "/studio",

  schema: {
    types: schema.types,
  },

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
