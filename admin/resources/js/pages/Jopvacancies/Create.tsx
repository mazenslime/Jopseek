import { Button } from '@/components/ui/button';
import { store } from '@/routes/Jopvacancies';
import { useForm, usePage } from '@inertiajs/react';
import { number } from 'motion/react';
import { useEffect, useState } from 'react';
type category={
    id:string,
    Name:string,
}
type enumty='Full-time'|'Contract'|'Remote'|'Hybrid'
type CreateCompanyProps = {
    onClose: () => void;
    categories:category[]
};
type comp={
    id:string
}


export default function JOpvacances({onClose,categories}: CreateCompanyProps) {    
    const { auth } = usePage().props;
    useEffect(()=>{
        console.log(auth.user.company.id);
    },[])
    const { data, setData, post, processing, errors } = useForm({
        Title: '',
        Description: '',
        Location: '',
        Type:'Full-time',
        Salary:Number(),
        Requiredskills: '',
        Viewcount:0,
        Companyid:auth.user.company.id,
        Categouryid:'',
    });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => onClose(),
        });
        console.log('end');
        
    };

    return (
        <div className="fixed inset-0 overflow-y-auto h-full w-1/2 mx-auto z-50 flex items-center justify-center  p-4 scrollbar-none">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-5 flex justify-between  items-center gap-2 pt-4">
                    <div className={`flex  items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold  bg-[#173c3a] text-white`}>
                        Create Jopvacance 
                    </div>
                    <button type="button" onClick={onClose} className="text-sm text-slate-500 hover:text-slate-800">
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">title</label>
                                <input
                                    type="text"
                                    value={data.Title}
                                    onChange={(e) => setData('Title', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.Title && <p className="mt-1 text-xs text-red-500">{errors.Title}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Requiredskills</label>
                                <input
                                    type="text"
                                    value={data.Requiredskills}
                                    onChange={(e) => setData('Requiredskills', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.Requiredskills && <p className="mt-1 text-xs text-red-500">{errors.Title}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
                                <input
                                    type="text"
                                    value={data.Location}
                                    onChange={(e) => setData('Location', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.Location && <p className="mt-1 text-xs text-red-500">{errors.Location}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                                <input
                                    type="text"
                                    value={data.Description}
                                    onChange={(e) => setData('Description', e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.Description && <p className="mt-1 text-xs text-red-500">{errors.Description}</p>}
                            </div>

                            <div>
                                <select name="Type" id="" 
                                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2
                                text-gray-700 outline-none
                                focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                value={data.Type}
                                onChange={(e)=>{setData('Type',e.target.value)}}>
                                    <option className='text-black' value="Full-time">Full-time</option>
                                    <option className='text-black' value="Contract">Contract</option>
                                    <option className='text-black' value="Hybrid">Hybrid</option>
                                    <option className='text-black' value="Remote">Remote</option>
                                </select>
                                {errors.Type && <p className="mt-1 text-xs text-red-500">{errors.Type}</p>}
                            </div>
                            <div className='flex justify-between gap-2'>
                             <div className='w-1/2'>
                                <label className="mb-1 block text-sm font-medium text-slate-700">categoury</label>
                                <select name="categoury"
                                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2
                                text-gray-700 outline-none
                                focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                                value={data.Categouryid}
                                onChange={(e)=>{setData('Categouryid',e.target.value)}}>
                                    {
                                        categories.map((ele)=>{
                                            console.log(ele.id)
                                            return(
                                                <option className='text-black' key={ele.id} value={ele.id}>{ele.Name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {errors.Categouryid && <p className="mt-1 text-xs text-red-500">{errors.Type}</p>}
                            </div>
                                <div className='w-1/2'>
                                <label className="mb-1 block text-sm font-medium text-slate-700">salary</label>
                                <input
                                    type="number"
                                    value={data.Salary}
                                    onChange={(e) => setData('Salary',Number(e.target.value))}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#173c3a]"
                                />
                                {errors.Salary && <p className="mt-1 text-xs text-red-500">{errors.Type}</p>}
                            </div>
                            </div>

                            <div className='w-full flex justify-end'>
                                <Button className='text-[#173c3a] font-bold cursor-pointer'>
                                    {processing?'save vacance...':'save vacance'}
                                </Button>
                            </div>
                        </>
                </form>
            </div>
        </div>
    );
}
