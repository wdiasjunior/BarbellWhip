import { useState } from "react";

// this gambiarra circumvents  a problem that seems to be caused by react
// navigation where it would not load the first screen of the app properly and
// would flicker the drawer on the first load.

export function useInitialRender(): boolean {
  const [isInitialRender, setIsInitialRender] = useState(false);
  if(!isInitialRender) {
    setTimeout(() => setIsInitialRender(true), 1);
    return true;
  }
  return false;
}
