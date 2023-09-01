// @ts-nocheck
import {useEffect} from "react"
import type {RefObject} from "react"
export default function useEnterKey (tableRef:RefObject) {
    useEffect(() => {
    const eventHandler = function(event:KeyboardEvent){
          
          
      if(event.code === "Enter"){
          event.preventDefault()
          
      try {
          event.target.parentNode.nextSibling.querySelector("." + event.target.className).focus()
      }
      catch {
          event.target.parentNode
          .insertAdjacentHTML("afterend", trString())
      event.target.parentNode.nextSibling.querySelector("." + event.target.className).focus()
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
}
