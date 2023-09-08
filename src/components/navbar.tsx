import Link from "next/link";

export default function Navbar() {
  return (
    <div className="p-4">
      <Link className="underline mr-4" href="/cloze">
        Cloze
      </Link>
      <Link className="underline mr-4" href="/">
        Vocabulary
      </Link>
    </div>
  );
}
