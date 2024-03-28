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
