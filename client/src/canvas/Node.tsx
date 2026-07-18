interface Props {

    title: string;

    x: number;

    y: number;

}

export default function Node({

    title,

    x,

    y

}: Props) {

    return (

        <div

            style={{

                position: "absolute",

                left: x,

                top: y,

                width: 180,

                minHeight: 70,

                padding: 18,

                borderRadius: 18,

                background: "#1E293B",

                color: "#fff",

                border: "1px solid #3B82F6",

                boxShadow:
                    "0 10px 25px rgba(59,130,246,.25)",

                fontWeight: 600,

                userSelect: "none",

                transition: ".2s",

                cursor: "grab"

            }}

        >

            {title}

        </div>

    );

}