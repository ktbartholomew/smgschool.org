"use server";

export default async function FormEmbedBlock(props: {
  section: { url: string };
}) {
  let url;
  try {
    url = new URL(props.section.url);

    if (url.origin === "https://forms.office.com") {
      url.searchParams.set("embed", "true");
    }

    if (url.origin === "https://docs.google.com") {
      url.searchParams.set("embedded", "true");
    }
  } catch (e) {
    url = props.section.url;
  }

  return (
    <section>
      <iframe
        className="block w-full mx-auto"
        style={{
          border: "none",
          maxWidth: "100%",
          maxHeight: "100vh",
          minHeight: "80vh",
        }}
        src={url.toString()}
      >
        Loading…
      </iframe>
    </section>
  );
}
