import { index } from '@/routes/Jopcategoury';
import { Link } from '@inertiajs/react';

type props={
    href:string
}
function Archived({href}:props){
    return(
    <div className='p-4 flex gap-2 justify-start text-black'>
        <Link as={'button'}
         className='bg-[#173c3a]  cursor-pointer px-4 py-2 rounded-lg text-white font-bold'
        href={`${href}`}
        >
            Active
        </Link>
        <Link as={'button'}
        className=' rounded-lg cursor-pointer text-black font-bold'
        href={`${href}?Archive=true`}
        >
            Archive
        </Link>
	</div>
    )
}

export default Archived