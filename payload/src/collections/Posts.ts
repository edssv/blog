import {
  HTMLConverterFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";

export const Posts: CollectionConfig = {
  slug: "posts",
  auth: false,
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      ru: "Пост",
    },
    plural: {
      ru: "Посты",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        ru: "Название",
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      label: {
        ru: "Описание",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
      label: {
        ru: "Обложка",
      },
    },
    {
      name: "content",
      type: "richText",
      editor: slateEditor({}),
      required: false,
      label: {
        ru: "Контент",
      },
    },
  ],
};
