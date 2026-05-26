import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { contactMessageType } from "./contactMessageType";
import { articleBlockTypes } from "./articleBlocks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    contactMessageType,
    ...articleBlockTypes,
  ],
};
