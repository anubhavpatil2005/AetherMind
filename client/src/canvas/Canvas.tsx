import {useState} from "react";

import Grid from "./Grid";

import {defaultCamera} from "./Camera";

export default function Canvas(){

    const[camera,setCamera]=useState(defaultCamera);

    return(

        <div

            style={{

                width:"100vw",

                height:"100vh",

                position:"relative",

                overflow:"hidden",

                background:"#111827"

            }}

        >

            <Grid

                x={camera.x}

                y={camera.y}

                zoom={camera.zoom}

            />

        </div>

    )

}

