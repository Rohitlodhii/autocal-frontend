import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { AlertDialogAction, AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setResult } from '@/redux/store'
import { Button } from './ui/button'

const ResultDialog = () => {

    

    const dispatch = useDispatch();

    const resultData = useSelector((state)=>state.result.result);

    const hasData = resultData?.data?.length > 0 ;

    const resultExpr = resultData?.data?.map(item => item.expr);
    const resultAns = resultData?.data?.map(item => item.result);
    
    const handleCancel =()=> {

        dispatch(setResult(null));
    }


  return (
    <>
    { hasData && (
    <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Answer</AlertDialogTitle> 
            </AlertDialogHeader>
            <AlertDialogDescription>
                <div className="flex flex-col gap-2">
                    <div>Expression : {resultExpr}</div>
                    <div>Result : {resultAns} </div>

                </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
          <AlertDialogCancel><Button>Cancel</Button></AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}><Button>Save</Button></AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>

    </AlertDialog>
    )}
    </>
  )
}

export default ResultDialog
