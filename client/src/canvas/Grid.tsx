interface Props {

    x: number;

    y: number;

    zoom: number;

}

export default function Grid({

    x,

    y,

    zoom

}: Props) {

    const size = 50 * zoom;

    return (

        <div

            style={{

                position: "absolute",

                inset: 0,

                backgroundImage: `
                linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
                `,

                backgroundSize:

                    `${size}px ${size}px`,

                backgroundPosition:

                    `${x}px ${y}px`

            }}

        />

    );

}