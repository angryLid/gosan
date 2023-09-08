import { Button } from "@/components/button";
import useRecovery from "@/hooks/useRecovery";
import { trpc } from "@/utils/trpc-provider";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
interface LSCloze {
  cloze: string;
  translation: string;
}
export default function Cloze() {
  const router = useRouter();

  const id = +(router.query.id ?? 0);
  const { data } = trpc.course.getById.useQuery({
    id,
  });
  const { data: clozes } = trpc.cloze.getAllByCourse.useQuery({
    id,
  });
  const { mutateAsync } = trpc.cloze.save.useMutation();

  const ref0 = useRef<HTMLTextAreaElement>(null);
  const ref1 = useRef<HTMLTextAreaElement>(null);
  const highlightBar = useRef<HTMLDivElement>(null);

  useRecovery<LSCloze>("cloze", (data) => {
    if (!ref0.current || !ref1.current) {
      return;
    }
    ref0.current.value = data.cloze;
    ref1.current.value = data.translation;
  });
  const getLineNumber: React.KeyboardEventHandler = function getLineNumber(
    event
  ) {
    return;
    const target = event.target as HTMLTextAreaElement;
    const lineNumber = target.value
      .slice(0, target.selectionStart)
      .split("\n").length;
    highlightBar.current!.style.top = `${lineNumber * 24}px`;
    highlightBar.current!.style.left = `${target.dataset.left}px`;
    highlightBar.current!.style.width = "620px";
  };
  const resize = () => {
    const height = `${
      Math.max(ref0.current!.scrollHeight, ref1.current!.scrollHeight) + 2
    }px`;
    ref0.current!.style.height = height;
    ref1.current!.style.height = height;
  };
  const onBlur = () => {
    highlightBar.current!.style.top = "-999px";
    localStorage.setItem(
      "cloze",
      JSON.stringify({
        cloze: ref0.current!.value,
        translation: ref1.current!.value,
      })
    );
  };
  const updateDatabase = () => {
    const a = ref0.current!.value.split("\n\n");
    const b = ref1.current!.value.split("\n\n");
    mutateAsync({
      content: a.map((_, index) => JSON.stringify([a[index], b[index]])),
      id,
    }).then(() => {
      ref0.current!.value = "";
      ref1.current!.value = "";
    });
  };
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <span className="font-bold grow">{data?.name}</span>
        <Button variant="outline" size="sm" onClick={updateDatabase}>
          更新数据库
        </Button>
        <Button variant="outline" size="sm">
          导出为CSV
        </Button>
      </div>

      <div className="mt-4 w-full box-border relative flex justify-between gap-x-4 ">
        <div
          ref={highlightBar}
          className="w-full absolute bg-violet-300 h-6 opacity-50 -top-96"
        ></div>
        <textarea
          ref={ref0}
          data-left="686"
          onFocus={resize}
          onInput={resize}
          onBlur={onBlur}
          onKeyUp={getLineNumber}
          className="rounded-sm grow box-border  border outline-none focus:border-slate-600 resize-none p-2"
        ></textarea>
        <textarea
          ref={ref1}
          data-left="26"
          onFocus={resize}
          onInput={resize}
          onBlur={onBlur}
          onKeyUp={getLineNumber}
          className="rounded-sm grow border outline-none focus:border-slate-600 resize-none p-2"
        />
      </div>
      <div>{clozes?.map((c) => c.content)}</div>
    </div>
  );
}
