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

    templates: (prev) => [
      ...prev,

      {
        id: "post-care",
        title: "Articol de îngrijire",
        description: "Pentru articole despre cum se îngrijește o floare.",
        schemaType: "post",
        value: {
          title: "Cum se îngrijește...",
          excerpt:
            "Un ghid simplu despre îngrijirea acestei flori, cu sfaturi practice și ușor de urmat.",
          body: [
            {
              _type: "block",
              _key: "care-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "care-intro-span",
                  text: "Introducere: prezintă floarea și de ce este importantă îngrijirea ei.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "care-light",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "care-light-span",
                  text: "Lumină",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "care-water",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "care-water-span",
                  text: "Udare",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "care-soil",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "care-soil-span",
                  text: "Sol și poziționare",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "care-mistakes",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "care-mistakes-span",
                  text: "Greșeli frecvente",
                  marks: [],
                },
              ],
            },
          ],
        },
      },

      {
        id: "post-meaning",
        title: "Articol despre semnificație",
        description: "Pentru articole despre simbolistica unei flori.",
        schemaType: "post",
        value: {
          title: "Semnificația florii...",
          excerpt:
            "Descoperă ce simbolizează această floare, în ce contexte se oferă și ce emoții transmite.",
          body: [
            {
              _type: "block",
              _key: "meaning-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "meaning-intro-span",
                  text: "Introducere: prezintă floarea și importanța ei simbolică.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "meaning-symbol",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "meaning-symbol-span",
                  text: "Ce simbolizează",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "meaning-when",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "meaning-when-span",
                  text: "Când se oferă",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "meaning-colors",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "meaning-colors-span",
                  text: "Semnificația culorilor",
                  marks: [],
                },
              ],
            },
          ],
        },
      },

      {
        id: "post-inspiration",
        title: "Articol inspirațional",
        description: "Pentru idei de buchete, decor sau cadouri.",
        schemaType: "post",
        value: {
          title: "Idei florale pentru...",
          excerpt:
            "Inspirație florală pentru momente speciale, decoruri elegante și alegeri pline de sens.",
          body: [
            {
              _type: "block",
              _key: "inspiration-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "inspiration-intro-span",
                  text: "Introducere: descrie contextul sau ocazia pentru care sunt potrivite aceste idei.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "inspiration-ideas",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "inspiration-ideas-span",
                  text: "Idei principale",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "inspiration-combinations",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "inspiration-combinations-span",
                  text: "Combinații recomandate",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "inspiration-final",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "inspiration-final-span",
                  text: "Concluzie",
                  marks: [],
                },
              ],
            },
          ],
        },
      },

      {
        id: "post-seasonal",
        title: "Articol sezonier",
        description: "Pentru articole despre flori de primăvară, vară etc.",
        schemaType: "post",
        value: {
          title: "Flori potrivite pentru...",
          excerpt:
            "O selecție de flori potrivite pentru sezon, atmosferă și stilul dorit.",
          body: [
            {
              _type: "block",
              _key: "seasonal-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "seasonal-intro-span",
                  text: "Introducere: prezintă sezonul sau contextul articolului.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "seasonal-list",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "seasonal-list-span",
                  text: "Flori recomandate",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "seasonal-care",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "seasonal-care-span",
                  text: "Sfaturi de îngrijire",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "seasonal-final",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "seasonal-final-span",
                  text: "Recomandare finală",
                  marks: [],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
