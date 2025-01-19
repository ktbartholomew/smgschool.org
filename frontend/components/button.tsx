import Link from "next/link";

export default function Button(props: {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  design?: "blue" | "green" | "red";
}) {
  let colorClasses = "";
  switch (props.design) {
    case "green":
      colorClasses = "bg-green-600 hover:bg-green-500 text-white";
      break;
    case "red":
      colorClasses = "bg-red-500 hover:bg-red-600 text-white";
      break;
    case "blue":
    default:
      colorClasses = "bg-sky-500 hover:bg-sky-600 text-white";
      break;
  }

  return (
    <Link
      href={props.href}
      target={props.target ?? "_self"}
      className="no-underline"
    >
      <button
        className={[
          colorClasses,
          props.className ?? "",
          "text-white transition-colors py-2 px-8 rounded-md",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {props.children}
      </button>
    </Link>
  );
}
