import { useState } from "react";

import { ApologyCard } from "./ApologyCard";
import { SuccessScreen } from "./SuccessScreen";

export function Hero() {
  const [yes, setYes] = useState(false);

  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-10">

      <ApologyCard onYes={() => setYes(true)} />

      {yes && <SuccessScreen />}
    </main>
  );
}