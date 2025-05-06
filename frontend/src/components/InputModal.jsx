import React, { useContext } from 'react'
import { ExpContext } from '../context/ExpContext'
import { IoIosClose } from "react-icons/io";
import EmojiPickerPopup from './EmojiPickerPopup';

const InputModal = () => {
    const { setModal, modalFormFields, modalFormData, modalInputChangeHandler, onModalSubmitHandler } = useContext(ExpContext)

    const onCloseHandler = () => {
        setModal(false);
    }

    return (
        <>
            <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white  rounded-md shadow-sm relative w-full min-[600px]:w-8/12 min-[1080px]:w-4/12 m-5">
                    <div className='flex justify-between items-center border-b-2 border-background py-3'>
                        <h2 className=" font-semibold mx-5">{modalFormFields.modalName}</h2>
                        <IoIosClose onClick={() => onCloseHandler()} className='w-8 h-8 cursor-pointer mx-2' />
                    </div>
                    {/* <p className="mb-4">This is a modal content area.</p> */}
                    <form className='m-5' onSubmit={onModalSubmitHandler}>
                        <div className="space-y-3">

                            {/* <div> */}
                            <EmojiPickerPopup
                                icon={modalFormData.image}
                                onSelect={(emoji) =>
                                    modalInputChangeHandler({
                                        target: { name: "image", value: emoji },
                                    })
                                }
                            />


                            {/* </div> */}

                            <div>
                                <label className='text_primary' htmlFor={modalFormFields.name1}>{modalFormFields.label1}</label>
                                <input
                                    id={modalFormFields.name1}
                                    type="text"
                                    className="p-2 w-full bg-background rounded-md focus:outline-none"
                                    placeholder={modalFormFields.placeholder1}
                                    name={modalFormFields.name1}
                                    value={modalFormData.resource}
                                    onChange={modalInputChangeHandler}
                                />
                            </div>
                            {/* source: '', amount: '', image: '', date: '' */}
                            <div>
                                <label className='text_primary' htmlFor={modalFormFields.name2}>{modalFormFields.label2}</label>
                                <input
                                    id={modalFormFields.name2}
                                    type='number'
                                    className="p-2 w-full bg-background rounded-md focus:outline-none"
                                    placeholder={modalFormFields.placeholder2}
                                    name={modalFormFields.name2}
                                    value={modalFormData.amount}
                                    onChange={modalInputChangeHandler}
                                />
                            </div>

                            <div>
                                <label className='text_primary' htmlFor={modalFormFields.name3}>{modalFormFields.label3}</label>
                                <input
                                    id={modalFormFields.name3}
                                    type="date"
                                    className="p-2 w-full bg-background rounded-md focus:outline-none"
                                    name={modalFormFields.name3}
                                    value={modalFormData.date}
                                    onChange={modalInputChangeHandler}
                                />
                            </div>
                        </div>

                        <div className='flex justify-end mt-5'>
                            <button className='button_primary'>{modalFormFields.modalName}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InputModal