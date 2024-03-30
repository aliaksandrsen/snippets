import { db } from '@/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as actions from '@/actions';

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${params.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded" type="submit">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
