import { QuestionsIDL } from '@hiredapp/anchor';

export default async function Index() {
  return (
    <div>
      <pre>{JSON.stringify(QuestionsIDL, null, 2)}</pre>
    </div>
  );
}
