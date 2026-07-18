import { useNavigate } from "react-router-dom";

interface MindMap {

    id: number;

    title: string;

    description: string;

    created_at: string;

}

interface Props {

    map: MindMap;

    onDelete: () => void;

}

export default function MindMapCard({

    map,

    onDelete

}: Props) {

    const navigate = useNavigate();

    return (

        <div

            style={{

                background: "#1E293B",

                borderRadius: 16,

                padding: 24,

                border: "1px solid #334155",

                boxShadow: "0 10px 30px rgba(0,0,0,.2)",

                transition: "0.2s"

            }}

        >

            <h2>{map.title}</h2>

            <p

                style={{

                    color: "#CBD5E1",

                    minHeight: 60

                }}

            >

                {

                    map.description ||

                    "No description."

                }

            </p>

            <small

                style={{

                    color: "#94A3B8"

                }}

            >

                Created{" "}

                {new Date(

                    map.created_at

                ).toLocaleDateString()}

            </small>

            <div

                style={{

                    display: "flex",

                    gap: 12,

                    marginTop: 20

                }}

            >

                <button

                    style={{

                        flex: 1,

                        padding: 10,

                        background: "#2563EB",

                        color: "white",

                        border: "none",

                        borderRadius: 8,

                        cursor: "pointer"

                    }}

                    onClick={() =>

                        navigate(

                            `/mindmap/${map.id}`

                        )

                    }

                >

                    Open

                </button>

                <button

                    style={{

                        flex: 1,

                        padding: 10,

                        background: "#DC2626",

                        color: "white",

                        border: "none",

                        borderRadius: 8,

                        cursor: "pointer"

                    }}

                    onClick={onDelete}

                >

                    Delete

                </button>

            </div>

        </div>

    );

}