import { Button } from "@/components/button"
import useRecovery from "@/hooks/useRecovery"
import { FormEvent, useRef, useState } from "react"
interface LSCloze {
    cloze: string
    translation: string
}
export default function Cloze() {
    const [_, setCloze] = useState("")
    
    const ref0 = useRef<HTMLTextAreaElement>(null)
    const ref1 = useRef<HTMLTextAreaElement>(null)
    const highlightBar = useRef<HTMLDivElement>(null)
    useRecovery<LSCloze>("cloze", (data) => {
        if(!ref0.current || !ref1.current){
            return
        }
        ref0.current.value = data.cloze
        ref1.current.value = data.translation
    })
    const getLineNumber: React.KeyboardEventHandler = function getLineNumber(event) {
        const target = event.target as HTMLTextAreaElement
        const lineNumber = target.value.slice(0, target.selectionStart).split("\n").length;
        highlightBar.current!.style.top = `${(lineNumber) * 24 }px`
        highlightBar.current!.style.left = `${target.dataset.left}px`
        highlightBar.current!.style.width = "620px"
    }
    const resize = (event: FormEvent) => {
       
        if(!ref0.current || !ref1.current){
            return
        }
        const height = 
        Math.max(
            ref0.current.scrollHeight,
            ref1.current.scrollHeight,
        )+ 2 +  'px';
        ref0.current.style.height = height
        ref1.current.style.height = height
    }
    const onBlur = () => {
        highlightBar.current!.style.top = "-999px"
        localStorage.setItem("cloze", JSON.stringify({
            cloze: ref0.current!.value,
            translation: ref1.current!.value,
        }))
    }
    return <div>
        <Button>写入数据库</Button>
        <Button>导出为CSV</Button>
     <div className="w-full p-4 box-border relative">
        <div ref={highlightBar} className="w-5/12 absolute bg-violet-300 h-6 opacity-50 -top-96"></div>
        <textarea ref={ref0} data-left="686" onInput={resize} onBlur={onBlur} onKeyUp={getLineNumber}  className="w-5/12 mr-8 box-border  border outline-none focus:border-slate-600 resize-none p-2" />
        <textarea ref={ref1} data-left="26" onInput={resize} onBlur={onBlur} onKeyUp={getLineNumber}  className="w-5/12  border outline-none focus:border-slate-600 resize-none p-2" />
    </div></div>
}