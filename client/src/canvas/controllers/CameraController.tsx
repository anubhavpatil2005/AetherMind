import { useCameraStore } from "../../store/cameraStore";

interface Props{

    children:React.ReactNode;

}

export default function CameraController({

    children

}:Props){

    const{

        x,

        y,

        zoom

    }=useCameraStore();

    return(

        <div

            style={{

                position:"absolute",

                inset:0,

                transform:`

                translate(${x}px,${y}px)

                scale(${zoom})

                `,

                transformOrigin:"0 0"

            }}

        >

            {children}

        </div>

    );

}