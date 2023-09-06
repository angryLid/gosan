
import React, { useEffect, useRef, useState } from 'react'
import useEnterKey from '@/hooks/useEnterKey'
import {Button} from '@/components/button'
import { trpc } from '@/utils/trpc-provider'
import saveCSV from '@/utils/gen-csv'
interface Row {
  word: string
  pronunciation: string 
  explaination: string
}

export default function Home() {
        
     const tableRef = useRef<HTMLTableElement>(null)
     

    const {wordTable, setWordTable} = useEnterKey(tableRef)
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
     }, [setWordTable])
     const courseInputRef = useRef<HTMLInputElement>(null)
    const {mutate} =  trpc.vocabulary.save.useMutation()
  const onClickSave = () => {
    try {
      mutate({courseName: courseInputRef.current?.value ?? new Date().toString(),list: wordTable})
    }catch {
      alert("Woops...")
    }
  }
  const onClickGen = () => {
    saveCSV(
      courseInputRef.current?.value ?? new Date().toString(), 
      ["front", "back"], 
      wordTable.filter(item => !!item.word).map(item => [item.word, `${item.pronunciation} ${item.explaination}`])
    )
    
  }
  return (<>
    <div className="options">
      <label htmlFor="course">course name</label>
      <input type="text" className='border-b border-slate-500 border-1 outline-none' name='course' ref={courseInputRef}/>

      <Button onClick={onClickSave}>保存到数据库</Button>
        <Button onClick={onClickGen}>导出为CSV</Button>
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
                <td data-target="1" className="border border-slate-900 word" contentEditable suppressContentEditableWarning >{word}</td>
                <td data-target="2" className="border border-slate-900 pronunciation" contentEditable suppressContentEditableWarning>{pronunciation}</td>
                <td data-target="3" className="border border-slate-900 explaination" contentEditable suppressContentEditableWarning>{explaination}</td>
            </tr>
          ))}
            
        </tbody>
    </table>
    
    </>
  )
}
