import { useRef } from "react";

interface Props {

    id: number;

    title: string;

    x: number;

    y: number;

    onMove: (
        id: number,
        x: number,
        y: number
    ) => void;

    onSave: (
        id: number
    ) => void;

}

export default function Node({

    id,

    title,

    x,

    y,

    onMove,

    onSave

}: Props){

    const drag = useRef(false);

    const offset = useRef({

        x:0,

        y:0

    });

    function pointerDown(
        e:React.PointerEvent<HTMLDivElement>
    ){

        e.stopPropagation();

        drag.current=true;

        offset.current={

            x:e.clientX-x,

            y:e.clientY-y

        };

        e.currentTarget.setPointerCapture(

            e.pointerId

        );

    }

    function pointerMove(

        e:React.PointerEvent<HTMLDivElement>

    ){

        if(!drag.current)return;

        onMove(

            id,

            e.clientX-offset.current.x,

            e.clientY-offset.current.y

        );

    }

    function pointerUp(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        drag.current = false;

        onSave(id);

        e.currentTarget.releasePointerCapture(
            e.pointerId
        );

    }

    return(

        <div

            onPointerDown={pointerDown}

            onPointerMove={pointerMove}

            onPointerUp={pointerUp}

            style={{

                position:"absolute",

                left:x,

                top:y,

                width:190,

                minHeight:80,

                padding:18,

                borderRadius:18,

                background:"#1E293B",

                color:"white",

                border:"1px solid #3B82F6",

                boxShadow:"0 12px 30px rgba(0,0,0,.35)",

                cursor:"grab",

                userSelect:"none",

                transition:"box-shadow .2s"

            }}

        >

            {title}

        </div>

    );

}