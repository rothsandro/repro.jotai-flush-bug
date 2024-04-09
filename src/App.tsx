import { atom, useAtomValue } from "jotai";
import { ScopeProvider } from "jotai-scope";
import { useAtomCallback } from "jotai/utils";
import { useCallback, useState } from "react";

const demoAtom = atom(0);

function Demo() {
  // 0. Ensure you use Jotai 2.7.0 or higher
  //    The bug does not occur with Jotai 2.6.5

  // 1. Wrap the component in a ScopeProvider (jotai-scope)
  // <ScopeProvider atoms={[]}>
  //   <Demo>
  // </ScopeProvider>

  // 2. Create a callback atom
  const callback = useAtomCallback(useCallback((get) => get(demoAtom), []));

  // 3. Do NOT use the atom here.
  //    The bug does not occur if the atom is used here.
  // useAtomValue(demoAtom);

  // 4. Call the callback function on render
  //    A common use case is to initialize a ref on render if it's undefined
  useState(() => callback());

  return <div>Open DevTools to see the error</div>;
}

function App() {
  return (
    <ScopeProvider atoms={[]}>
      <Demo />
    </ScopeProvider>
  );
}

export default App;
