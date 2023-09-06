import {useEffect, useState} from "react"
import type {RefObject} from "react"
import type { Row } from "@/typings/props"
export default function useEnterKey (tableRef:RefObject<HTMLTableElement>) {
    const [wordTable, setWordTable] = useState<Row[]>([])
    useEffect(() => {
    const eventHandler = function(event:KeyboardEvent){
          
          
      if(event.code === "Enter"){
          event.preventDefault()
      const focus = () => event.target.parentNode.nextSibling.querySelector(`[data-target="${event.target.dataset.target}"]`).focus()
      try {
        focus()
          
      }
      catch {
        setWordTable(prev => [...prev, {word:"", pronunciation:"", explaination:""}])
      setTimeout(focus, 0);
      } finally {
          const data = document.querySelector("tbody").innerText.split('\n').map(row => {
              const [word, pronunciation, explaination ] = row.split('\t')
              return {
                  word, explaination, pronunciation
              }
          })
          localStorage.setItem("table", JSON.stringify(data))
      }
  }
  }
  const ref = tableRef.current
    ref?.addEventListener("keydown", eventHandler)

    return () => {
      ref?.removeEventListener("keydown", eventHandler)
    }

   },[tableRef])

   return { wordTable, setWordTable}
}
