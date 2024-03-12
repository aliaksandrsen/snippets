import { db } from '@/db';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <div key={snippet.id}>
      <p>{snippet.title}</p>
    </div>
  ));

  return <div>{renderedSnippets}</div>;
}
