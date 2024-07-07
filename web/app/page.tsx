import { CounterIDL } from '@hiredapp/anchor';

export default async function Index() {
  return (
    <div>
      <pre>{JSON.stringify(CounterIDL, null, 2)}</pre>
    </div>
  );
}
