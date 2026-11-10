import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { track } from "../../lib/analytics";

// Only follow callbacks back into this site, never off it
const safeDestination = (callbackUrl: unknown) => {
  if (typeof callbackUrl !== "string") return "/";

  try {
    const url = new URL(callbackUrl, window.location.origin);
    if (url.origin !== window.location.origin) return "/";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/";
  }
};

// NextAuth sends people here once, right after their account is created.
// Count the sign-up, then carry on to where they were going.
const Welcome = () => {
  const router = useRouter();
  // The router changes again while redirecting; count the sign-up once
  const counted = useRef(false);

  useEffect(() => {
    if (!router.isReady || counted.current) return;
    counted.current = true;

    track("sign_up", {});
    router.replace(safeDestination(router.query.callbackUrl));
  }, [router]);

  return null;
};

export default Welcome;
