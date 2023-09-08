import { WithChildren } from "@/typings/props";
import Navbar from "./navbar";

export default function Layout({ children }: WithChildren) {
  return (
    <div className="w-[960px] m-auto">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
