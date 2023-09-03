import { stringify } from "csv/browser/esm"
import { saveAs } from 'file-saver';

const generateCSV = (header: string[], payload:string[][]) => new Promise<string>((resolve, reject) => {
    stringify([
        header,
        ...payload,
      ],{delimiter:';'}, function(err, output){
        if(err){
            reject(err)
        }else {
            resolve(output)
        }
      });
})

const saveCSV = async (fileName: string, header: string[], payload:string[][]) => {

        const str = await generateCSV(header, payload);
        const blob = new Blob([str], {type: "text/csv;charset=utf-8"})
        saveAs(blob, fileName);

   
}
export default saveCSV