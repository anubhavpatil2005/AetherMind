type Props={

    x:number;

    y:number;

    zoom:number;

}

export default function Grid({x,y,zoom}:Props){

    const size=40*zoom;

    return(

        <div

            style={{

                position:"absolute",

                inset:0,

                backgroundSize:`${size}px ${size}px`,

                backgroundPosition:`${-x*zoom}px ${-y*zoom}px`,

                backgroundImage:`

                linear-gradient(to right,#2f2f2f 1px,transparent 1px),

                linear-gradient(to bottom,#2f2f2f 1px,transparent 1px)

                `

            }}

        />

    )

}