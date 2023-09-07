import { useEffect , type Dispatch, type SetStateAction} from "react";

type Setter = Dispatch<SetStateAction<any>>
export default function useRecovery<T>(key: string, onOk: (data: T) => void, onErr?: () => void) {
    
    useEffect(() => {
        try {
            const data = localStorage.getItem(key)
            if(!data){
              throw new Error(`localStorage '${key}' Not Found`)
            }
            onOk(JSON.parse(data) as T)  
        }catch {
          onErr ? onErr() : null
        }
    }, [])
}