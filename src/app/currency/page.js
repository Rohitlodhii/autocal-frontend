/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import {React , useState} from 'react'


const currencies = {
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Renminbi Yuan",
  CZK: "Czech Koruna",
  DKK: "Danish Krone",
  EUR: "Euro",
  GBP: "British Pound",
  HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  ISK: "Icelandic Króna",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Złoty",
  RON: "Romanian Leu",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  USD: "United States Dollar",
  ZAR: "South African Rand",
};


const page = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [oldState ,setOldState] = useState('');
  const [converted , setConverted] = useState('')
  const [loading , setLoading] = useState(false);

  const {toast} = useToast();



  const handleSubmit = async() => {
    setLoading(true)
    try {
      const res =await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      const data = await res.json();

      setConverted(data.rates[toCurrency]+ " " + toCurrency);
      setOldState(amount);
      setAmount('');
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Arrey Yarr! Something went wrong.",
        description: "Write Something...",
        
      })
      setLoading(false)
    } 
  }




  return (
    <div className='h-[90vh] flex items-center justify-center'>
      <Card className="w-72">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent>

        <div className="flex flex-col  justify-center gap-4">

          <div>
        <Label className="text-sm mr-1" htmlFor="name">Enter Amount</Label>
        <Input id="name" type="text" value={amount} placeholder="00.00"
          onChange={(e) => setAmount(e.target.value)} />
        </div>

    <div>
<Label className="text-sm mr-1" htmlFor="from">From Currency</Label>
        <Select id="from" defaultValue={fromCurrency} onValueChange={setFromCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="From Currency" />
          </SelectTrigger>
          <SelectContent>
              
          {Object.entries(currencies).map(([code, name]) => (
        <p key={code}>
          <SelectItem value={code} >{name} ({code})</SelectItem>
        </p>
      ))}



          </SelectContent>
        </Select>
        </div>

        <div>
<Label className="text-sm mr-1" htmlFor="to">To Currency</Label>
        <Select id="to" defaultValue={toCurrency} onValueChange={setToCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="From Currency" />
          </SelectTrigger>
          <SelectContent>
              
          {Object.entries(currencies).map(([code, name]) => (
        <p key={code}>
          <SelectItem value={code} >{name} ({code})</SelectItem>
        </p>
      ))}



          </SelectContent>
        </Select>
        </div>
      {!loading ?

        <Button onClick={handleSubmit} >Convert</Button>

        :

        <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>

      }

        </div>



        </CardContent>
        <CardFooter>
        {converted ? 
          <CardDescription className="bg-zinc-900 h-10 w-full rounded-xl flex items-center justify-center">

           
           
          <span>{oldState} {fromCurrency} = {converted}</span> 
         
          </CardDescription>
           : ""}
        </CardFooter>

      </Card>
    </div>
  )
}

export default page
