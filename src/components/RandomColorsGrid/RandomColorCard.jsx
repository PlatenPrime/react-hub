import React from 'react'

export default function RandomColorCard() {



    const arr = "0123456789ABCDEF".split("");

    const randomColor = () => {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += arr[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const rc = randomColor()


    return (
        <div
            style={{ backgroundColor: rc }}
            className="w-64 h-64 m-4 rounded-lg shadow-lg grid place-content-center"
        >

            {rc}
        </div>
    )
}
