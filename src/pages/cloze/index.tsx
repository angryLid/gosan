import useRecovery from "@/hooks/useRecovery"
import { FormEvent, useRef, useState } from "react"

export default function Cloze() {
    const [_, setCloze] = useState("")
    
    const ref0 = useRef<HTMLTextAreaElement>(null)
    const ref1 = useRef<HTMLTextAreaElement>(null)

    useRecovery<string>("cloze", (data) => {
        if(!ref0.current || !ref1.current){
            return
        }
        ref0.current.value = data
        ref1.current.value = data
    })
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
    return <div className="w-full m-4">
        
        <textarea ref={ref0} onInput={resize}  className="w-5/12 mr-8 box-border  border outline-none focus:border-slate-600 resize-none p-2" />
        <textarea ref={ref1} onInput={resize}  className="w-5/12  border outline-none focus:border-slate-600 resize-none p-2" />
    </div>
}