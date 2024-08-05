import React from 'react'
import RandomColorCard from './RandomColorCard';

export default function RandomColorsGrid() {


    const arr = new Array(20).fill(0).map((_, i) => i + 1);



    return (
        <div
            className="grid grid-cols-4 gap-4"
        >{arr.map(i => <RandomColorCard key={i} />)}</div>
    )
}
