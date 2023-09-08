import { Button } from "@/components/button";
import { trpc } from "@/utils/trpc-provider";
import Link from "next/link";
import { useState } from "react";

export default function Browse() {
  const [inputValue, setInputValue] = useState("");
  const { data, refetch } = trpc.course.getAll.useQuery();
  const { mutateAsync } = trpc.course.insertOne.useMutation();
  const add = () => {
    mutateAsync({ name: inputValue }).then(() => {
      setInputValue("");
      refetch();
    });
  };
  return (
    <div>
      <div className="mb-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="filter"
          className="outline-none border-b pl-2 pr-2 pt-1 pb-1"
          type="text"
        ></input>
        <Button className="ml-8" size="sm" variant="outline" onClick={add}>
          Add
        </Button>
      </div>

      {data
        ?.filter((course) => course.name.includes(inputValue))
        .map((course) => (
          <div key={course.id} className="flex pb-2">
            <span className="grow">{course.name}</span>
            <Link
              className="mr-4 text-sky-600 underline"
              href={`/${course.id}`}
            >
              词汇
            </Link>
            <Link
              className="mr-4 text-sky-600 underline"
              href={`/cloze/${course.id}`}
            >
              例句
            </Link>
          </div>
        ))}
    </div>
  );
}
