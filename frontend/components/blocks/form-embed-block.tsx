"use server";

export default async function FormEmbedBlock(props: {
  section: { url: string };
}) {
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
        src={props.section.url}
      >
        Loading…
      </iframe>
    </section>
  );
}
