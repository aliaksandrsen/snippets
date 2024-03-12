import { db } from '@/db';
import { notFound } from 'next/navigation';

interface SnippetShowPage {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage({ params }: SnippetShowPage) {
  const snippet = await db.snippet.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <p>{snippet?.title}</p>
      <code>{snippet?.code}</code>
    </div>
  );
}
