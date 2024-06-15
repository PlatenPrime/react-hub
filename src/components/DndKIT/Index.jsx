import React, { useState } from 'react'

import { Reorder, useDragControls } from 'framer-motion';






export default function Index() {

    const [items, setItems] = useState(["Sara", "John", "Fiona", "Mat", "Grace", "Liland", "Bonjovi", "Alex", "Girald", "Frencic"]);

    console.log(items);




    return (
        <div
            className="flex flex-col items-center space-y-4 container mx-auto "
        >

         

            <Reorder.Group values={items} onReorder={setItems}>
                {items.map((el, i) => (
                    <ItemWithHandle key={el} el={el} i={i} />
                ))}
            </Reorder.Group>
        </div>
    )
}




const ItemWithHandle = ({ el, i }) => {

    const controls = useDragControls()

    return (
        <Reorder.Item
            value={el}
            dragListener={false}
            dragControls={controls}
        >
            <div
                className=" p-2 m-4
                    bg-gradient-to-b from-teal-500 to-teal-900
                    text-white text-2xl 
                    grid grid-cols-3 place-content-center rounded-xl"
            >
                <span>{i}</span>
                <span>{el}</span>
                <div
                    className="rounded-full cursor-pointer p-4 dashed border hover:bg-green-300"
                    onPointerDown={(e) => controls.start(e)}
                />
            </div>
        </Reorder.Item>
    )
}   