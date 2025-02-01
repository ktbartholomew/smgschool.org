"use server";

export async function GoogleTagManager(props: { gaId: string }) {
  const script = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${props.gaId}');
  `;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(props.gaId)}`}
      ></script>
      <script dangerouslySetInnerHTML={{ __html: script }}></script>
    </>
  );
}
