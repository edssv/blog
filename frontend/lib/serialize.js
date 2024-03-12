import escapeHTML from 'escape-html';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { Text } from 'slate';

import { absoluteUrlImageFromPayload } from '@/lib/utils';

export const serialize = (children) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return (
          <h1 key={i} className='mt-2 scroll-m-20 text-4xl font-bold tracking-tight'>
            {serialize(node.children)}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={i} className='mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0'>
            {serialize(node.children)}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={i} className='mt-8 scroll-m-20 text-2xl font-semibold tracking-tight'>
            {serialize(node.children)}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={i} className='mt-8 scroll-m-20 text-xl font-semibold tracking-tight'>
            {serialize(node.children)}
          </h4>
        );
      case 'h5':
        return (
          <h5 key={i} className='mt-8 scroll-m-20 text-lg font-semibold tracking-tight'>
            {serialize(node.children)}
          </h5>
        );
      case 'h6':
        return (
          <h6 key={i} className='mt-8 scroll-m-20 text-base font-semibold tracking-tight'>
            {serialize(node.children)}
          </h6>
        );
      case 'blockquote':
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case 'ul':
        return (
          <ul key={i} className='my-6 ml-6 list-disc'>
            {serialize(node.children)}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i} className='my-6 ml-6 list-decimal'>
            {serialize(node.children)}
          </ol>
        );
      case 'li':
        return (
          <li key={i} className='mt-2'>
            {serialize(node.children)}
          </li>
        );
      case 'link':
        return (
          <a key={i} href={escapeHTML(node.url)}>
            {serialize(node.children)}
          </a>
        );
      case 'upload':
        return (
          <Image
            alt='aa'
            className='rounded-md'
            height={node.value.height}
            src={absoluteUrlImageFromPayload(node.value.url)}
            width={node.value.width}
          />
        );

      default:
        return (
          <p key={i} className='leading-7 [&:not(:first-child)]:mt-6'>
            {serialize(node.children)}
          </p>
        );
    }
  });
