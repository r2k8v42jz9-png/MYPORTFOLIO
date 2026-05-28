import Script from "next/script";

const CLARITY_PROJECT_ID = "wy84j82uw2";

/**
 * Microsoft Clarity analytics — loaded once, globally, for every locale/page
 * (rendered from the root layout). Production-only so local/dev sessions don't
 * pollute analytics. Uses next/script with `afterInteractive` so it never
 * blocks first paint or causes hydration issues, and the unique `id` prevents
 * duplicate injection across client-side navigations.
 */
export default function Clarity() {
  if (process.env.NODE_ENV !== "production" || !CLARITY_PROJECT_ID) {
    return null;
  }

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`}
    </Script>
  );
}
