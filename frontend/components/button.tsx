export default function Button(props: { children: React.ReactNode }) {
  return (
    <button className="bg-sky-500 hover:bg-sky-600 text-white transition-colors py-2 px-8 block w-full rounded-md">
      {props.children}
    </button>
  );
}
