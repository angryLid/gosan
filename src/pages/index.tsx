
import React, { useEffect, useRef, useState } from 'react'
import useEnterKey from '@/hooks/useEnterKey'
import {Button} from '@/components/button'
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
     const courseInputRef = useRef<HTMLInputElement>(null)
  return (<>
    <div className="options">
      <label htmlFor="course">course name</label>
      <input type="text" className='border-b border-slate-500 border-1 outline-none' name='course' ref={courseInputRef}/>

      <Button>保存到数据库</Button>
        <Button>导出为CSV</Button>
        <input type="checkbox" name="skip" />
        <label htmlFor="skip">若已经添加则跳过</label>
    </div>
    <table className='w-1/2' ref={tableRef}>
        <thead>
            <tr>
                <th className='border border-slate-900 w-1/3'>单 词</th>
                <th className='border border-slate-900 w-1/3'>读 音</th>
                <th className='border border-slate-900 w-1/3'>解 释</th>
            </tr>
        </thead>
        <tbody>
          {wordTable.map(({word, pronunciation,explaination}, index) => (
            <tr key={index}>
                <td className="border border-slate-900 word" contentEditable suppressContentEditableWarning >{word}</td>
                <td className="border border-slate-900 pronunciation" contentEditable suppressContentEditableWarning>{pronunciation}</td>
                <td className="border border-slate-900 explaination" contentEditable suppressContentEditableWarning>{explaination}</td>
            </tr>
          ))}
            
        </tbody>
    </table>
    
    </>
  )
}
