'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export const editSnippet = async (id: number, code: string) => {
  const snippet = await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect(`/snippets/${snippet.id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {
      id,
    },
  });

  redirect('/');
};

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  const title = formData.get('title');
  const code = formData.get('code');

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be at least 3 characters',
    };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be at least 10 characters',
    };
  }

  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  console.log(snippet);

  redirect('/');
};
