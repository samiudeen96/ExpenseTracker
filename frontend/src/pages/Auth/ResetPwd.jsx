import React, { useEffect } from 'react'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { ExpContext } from '../../context/ExpContext';
import { useContext } from 'react';


const ResetPwd = () => {
    const { onChangeHandler, formData, onPwdResetHandler, path, setResetToken } = useContext(ExpContext)

    useEffect(() => {

        const params = new URLSearchParams(path.search)
        const newToken = params.get("token");

        if (newToken) {
            // getUserInfo();
            setResetToken(newToken);
        } else {
            // toast.error("Reset token not found")
            console.log("Reset token not found");
            
        }
    }, [path.search]);

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <form onSubmit={onPwdResetHandler} className='px-5 py-10 shadow-md w-90 rounded-md bg-white'>
                    <div className='flex gap-5 items-center'>
                        <Link to="/"><BsArrowLeft className='w-5 h-5 cursor-pointer' /></Link>
                        <h2 className='font-medium'>Reset Password</h2>
                    </div>
                    <div className="space-y-4 mt-5">
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input
                                id="password"
                                type="password"
                                className="p-2 h-13 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
                                placeholder="Enter your new password"
                                name="password"
                                value={formData.password}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="p-2 h-13 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
                                placeholder="Confirm your new password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
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

export default ResetPwd