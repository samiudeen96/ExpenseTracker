import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col items-start gap-5 mb-6 '>
            <div
                className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-md overflow-hidden'>
                    {icon ? (
                        <img src={icon} alt="Icon" className='w-12 h-12 object-cover' />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="absolute top-0 left-0 z-50 bg-white p-2 rounded-md w-full">

                    <div className='flex justify-end'>
                        <IoClose className='w-7 h-7 cursor-pointer'
                            onClick={() => setIsOpen(false)} />
                    </div>

                    <EmojiPicker
                        height={390}
                        width="100%"
                        onEmojiClick={(emojiData) => {
                            onSelect(emojiData?.imageUrl || "");
                            setIsOpen(false);
                        }}
                        skinTonesDisabled
                        previewConfig={{ showPreview: false }}
                        searchDisabled={false}
                        lazyLoadEmojis
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
