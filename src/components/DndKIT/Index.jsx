import React, { useState } from 'react'

import { Reorder } from 'framer-motion';






export default function Index() {

    const [items, setItems] = useState(["Sara", "John", "Fiona", "Mat", "Grace", "Liland", "Bonjovi", "Alex", "Girald", "Frencic"]);

    console.log(items);


    return (
        <div
            className="flex flex-col items-center space-y-4 container mx-auto "
        >

            <Reorder.Group values={items} onReorder={setItems}>
                {items.map((el, i) => (
                    <Reorder.Item   key={el} value={el} >
                        <div
                            key={i}
                            className="w-[200px] p-2 m-4
                    bg-gradient-to-b from-sky-500 to-sky-900
                    text-white text-2xl 
                    grid grid-cols-1 place-content-center rounded-xl"
                        >
                            <span>{i}</span>
                            <span>{el}</span>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    )
}
