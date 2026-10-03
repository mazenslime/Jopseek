import { Head, Link, usePage } from '@inertiajs/react';
import {login} from '@/routes';
import { motion } from "motion/react";
export default function Welcome() {
    const { auth } = usePage().props
    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <main className='w-full h-100'>
                    <motion.div className={`w-1/2 mx-auto text-center items-center  translate-y-30  `}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration:1 }}
                    >
                      <h1 className='text-[#d86b3d] text-5xl font-bold '> Welcomee</h1>
                      <span className='inline-block text-white font-bold text-5xl italic'>to wazayif Zearo </span>
                      <p className='text-white'>Lorem ipsum dolor sit amet.</p>
                      <div className='mt-5 w-1/2 mx-auto flex justify-center'>
                        <Link 
                        className='w-1/2 cursor-pointer text-xl font-bold  bg-[#d86b3d] text-white rounded-lg  px-4 py-2 '
                        as={'button'}
                        href={login()}>Login</Link>
                      </div>
                    </motion.div>

                </main>
            </div>
        </>
    )}

