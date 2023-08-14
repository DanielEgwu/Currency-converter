import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
function Currency() {
    const [Base, setBase] = useState('');
    const [Target, setTarget] = useState('');
    const [Amount, setAmount] = useState('');
    const [Result, setResult] = useState('');
    const [ShowResult, setShowResult] = useState(false);
    const [exchangeRate, setexchangeRate] = useState(0)

    const currency = ['USD', 'EURO'];
    const customId = "error-tost";
    const success = "success";
    const factor = "factor"

    const baseCurrencyHandler = e => {
        const base = e.target.value;
        setBase(base);
        console.log(Base)
    }
    const TargetCurrencyHandler = e => {
        const target = e.target.value;
        setTarget(target);
    }
    const AmountHandler = e => {
        const amount = e.target.value;
        setAmount(amount);
    }

    useEffect(() => {
        if (Base === 'EURO' && Target === 'USD') {
            setexchangeRate(1.09);
        }
        if (Base === 'USD' && Target === 'EURO') {
            setexchangeRate(0.91);
        }
       
    }, [Base, Target])

    const Convert = () => {
        if (Base == '' || Target == '' || Amount == '') {
            toast.error('please fill up all fields', {
                toastId: customId
            })
            setShowResult(false)
        } else {
            if (Base == Target) {
                toast.error('Base and Target value cannot be the same', {
                    toastId: factor
                })
            } else {
                setShowResult(true)
                let value = (Amount * exchangeRate).toFixed(1);
                setResult(value)
                toast.success('Amount has been converted', {
                    toastId: success
                })
            }
        }

    }


    return (
        <div className='bg-rose-600 rounded-lg p-5 h-96 w-96 font-sans'>
            <div>

                {ShowResult &&
                    <div className='pb-4'>
                        <p className='text-white bg-black focus:outline-blue-400 shadow-sm rounded-md w-full h-12 px-2 pt-3'>{Result}</p>
                    </div>
                }

                <label className='text-lime-400 font-semibold'>Base Currency</label>
                <select className='shadow-none focus:outline-blue-400 rounded-md w-full h-9 px-3  mb-2' onChange={baseCurrencyHandler}>
                    <option>Choose Base Currency</option>
                    {
                        currency.map((value, index) => (
                            <option key={index} className='bg-slate-200' value={value}>{value}</option>
                        ))
                    }

                </select>
                <label className='text-lime-400 font-semibold '>Target Currency</label>
                <select className='shadow-none focus:outline-blue-400 rounded-md w-full h-9 px-3 mt-2 mb-2' onChange={TargetCurrencyHandler}>
                    <option >Choose Target Currency</option>

                    {
                        currency.map((value, index) => (
                            <option key={index} className=' bg-slate-200' value={value}>{value}</option>
                        ))
                    }
                </select>
                <label className='text-lime-400 font-semibold '>Amount</label>
                <input value={Amount} placeholder="Enter Amount..." type='number' className='text-slate-600 focus:outline-blue-400 shadow-sm rounded-md w-full h-9 px-2' onChange={AmountHandler} />

                <div className='text-center'>
                    <button className='bg-green-400 rounded-lg py-3 px-6 mt-5 border-none box- text-white' onClick={Convert}>Convert</button>
                </div>
            </div>


        </div>
    )
}

export default Currency