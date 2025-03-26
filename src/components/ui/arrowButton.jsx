"use client"

const { default: Image } = require("next/image");

export function ArrowButton({ img, clickBehvaiour }) {
    return (
        <button onClick={clickBehvaiour} className="bg-gray-600 rounded-lg w-[50px] h-[50px] flex justify-center items-center">
            <Image
                className="dark:invert"
                src={img}
                alt="Deck List logo"
                width={50}
                height={50}
                style={{width: "37px", height:"37px"}}
                priority
            />
        </button>
    );
}