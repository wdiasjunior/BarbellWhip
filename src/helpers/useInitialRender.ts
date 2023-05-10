import React, { useState } from "react";

// this is gambiarra to circumvent a problem that seems to be caused by react
// navigation where it would not load the first screen of the app properly and
// would flicker the drawer on the first load.

export const useInitialRender = () => {
  const [isInitialRender, setIsInitialRender] = useState(false);
  if (!isInitialRender) {
    setTimeout(() => setIsInitialRender(true), 1);
    return true;
  }
  return false;
}
