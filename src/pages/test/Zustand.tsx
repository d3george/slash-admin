import { useCount, useCountActions } from '@/store';

function Zustand() {
  const count = useCount();
  const { increment, decrement } = useCountActions();
  return (
    <div className="">
      <button className="border-2 border-solid border-black p-4" onClick={increment}>
        +
      </button>
      <span className="mx-2 text-2xl text-pink-500">{count}</span>
      <button className="border-2 border-solid border-black p-4" onClick={decrement}>
        -
      </button>
    </div>
  );
}

export default Zustand;
