
import React, { useEffect, useRef, useState } from 'react'
import useEnterKey from '@/hooks/useEnterKey'
interface Row {
  word: string
  pronunciation: string 
  explaination: string
}
export default function Home() {
        
     const tableRef = useRef<HTMLTableElement>(null)
     useEnterKey(tableRef)

    const [wordTable, setWordTable] = useState<Row[]>([])
   useEffect(() => {
          try {
              const data = localStorage.getItem("table")
              if(!data){
                throw new Error("localStorage 'table' Not Found")
              }
              setWordTable(() => JSON.parse(data))
              
          }catch {
            setWordTable(() => [{word:"", pronunciation:"", explaination:""}])
          }
     }, [])
  return (<>
    <div className="options">
        <button id="import">导入到Anki</button>
        <input type="checkbox" name="skip" />
        <label htmlFor="skip">若已经添加则跳过</label>
    </div>
    <table ref={tableRef}>
        <thead>
            <tr>
                <th>单 词</th>
                <th>读 音</th>
                <th>解 释</th>
            </tr>
        </thead>
        <tbody>
          {wordTable.map(({word, pronunciation,explaination}, index) => (
            <tr key={index}>
                <td className="word" contentEditable suppressContentEditableWarning >{word}</td>
                <td className="pronunciation" contentEditable suppressContentEditableWarning>{pronunciation}</td>
                <td className="explaination" contentEditable suppressContentEditableWarning>{explaination}</td>
            </tr>
          ))}
            
        </tbody>
    </table>
    
    </>
  )
}
