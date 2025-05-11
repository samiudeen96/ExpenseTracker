import React, { useContext } from 'react'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { ExpContext } from '../../context/ExpContext';


const ForgetPwd = () => {
    const { onChangeHandler, formData, onForgotPwdHandler } = useContext(ExpContext)
    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <form onSubmit={onForgotPwdHandler} className='px-5 py-10 shadow-md w-90 rounded-md bg-white'>
                    <div className='flex gap-5 items-center'>
                        <Link to="/"><BsArrowLeft className='w-5 h-5 cursor-pointer' /></Link>
                        <h2 className='font-medium'>Forgot Password</h2>
                    </div>
                    <div className="space-y-4 mt-5">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="p-2 h-12 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
                                placeholder="Enter your Email"
                                name="email"
                                value={formData.email}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <button
                            type="submit"
                            className="button_primary w-full bg-[#785bf8] text-white h-11 rounded hover:bg-[#674de0] transition"
                        >
                            Submit
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgetPwd