import { useState } from "react";

// this gambiarra circumvents a problem that seems to be caused by react
// navigation where the first time a screen is loaded causes a layout shift/glitch,
// so I added this and a loading spinner to every component/page where this happens.
// for some reason in ProgramPage this does not help in the first page load of the app.

export function useInitialRender(): boolean {
  const [isInitialRender, setIsInitialRender] = useState(false);

  if(!isInitialRender) {
    setTimeout(() => setIsInitialRender(true), 1);
    return true;
  }

  return false;
}
