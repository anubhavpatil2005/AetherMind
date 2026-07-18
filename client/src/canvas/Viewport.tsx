import type { ReactNode } from "react";

interface Props {

    x: number;

    y: number;

    zoom: number;

    children: ReactNode;

}

export default function Viewport({

    x,

    y,

    zoom,

    children

}: Props) {

    return (

        <div

            style={{

                position: "absolute",

                inset: 0,

                transform: `
                translate(${x}px,${y}px)
                scale(${zoom})
                `,

                transformOrigin: "0 0"

            }}

        >

            {children}

        </div>
        

    );

}