import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';

export const Posts: CollectionConfig = {
  slug: 'posts',
  auth: false,
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      ru: 'Пост',
    },
    plural: {
      ru: 'Посты',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        ru: 'Название',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: {
        ru: 'Описание',
      },
    },
    {
      name: 'cover', // required
      type: 'upload', // required
      relationTo: 'media', // required
      required: true,
      label: {
        ru: 'Обложка',
      },
    },
    {
      name: 'content', // required
      type: 'richText', // required
      editor: lexicalEditor({}),
      required: true,
      label: {
        ru: 'Контент',
      },
    },
  ],
};
