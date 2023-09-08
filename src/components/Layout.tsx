import { WithChildren } from "@/typings/props";
import Navbar from "./navbar";

export default function Layout({ children }: WithChildren) {
  return (
    <div className="w-[880px] m-auto">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
