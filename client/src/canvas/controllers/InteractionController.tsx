import { useRef } from "react";

import { useCameraStore } from "../../store/cameraStore";

interface Props{

    children:React.ReactNode;

}

export default function InteractionController({

    children

}:Props){

    const{

        move,

        zoomIn

    }=useCameraStore();

    const drag=useRef(false);

    const previous=useRef({

        x:0,

        y:0

    });

    function down(

        e:React.MouseEvent

    ){

        drag.current=true;

        previous.current={

            x:e.clientX,

            y:e.clientY

        };

    }

    function moveMouse(

        e:React.MouseEvent

    ){

        if(!drag.current)return;

        move(

            e.clientX-previous.current.x,

            e.clientY-previous.current.y

        );

        previous.current={

            x:e.clientX,

            y:e.clientY

        };

    }

    function up(){

        drag.current=false;

    }

    function wheel(

        e:React.WheelEvent

    ){

        e.preventDefault();

        zoomIn(

            e.deltaY>0

            ?-0.1

            :0.1

        );

    }

    return(

        <div

            onMouseDown={down}

            onMouseMove={moveMouse}

            onMouseUp={up}

            onMouseLeave={up}

            onWheel={wheel}

            style={{

                width:"100vw",

                height:"100vh",

                overflow:"hidden",

                position:"relative"

            }}

        >

            {children}

        </div>

    );

}