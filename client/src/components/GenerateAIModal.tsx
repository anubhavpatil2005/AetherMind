import { useState } from "react";

interface Props {

    open: boolean;

    onClose: () => void;

    onGenerate: (topic: string) => void;

}

export default function GenerateAIModal({

    open,

    onClose,

    onGenerate

}: Props) {

    const [topic, setTopic] = useState("");

    if (!open) return null;

    return (

        <div

            style={{

                position: "fixed",

                inset: 0,

                background: "rgba(0,0,0,.6)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 999

            }}

        >

            <div

                style={{

                    width: 500,

                    background: "#1E293B",

                    padding: 30,

                    borderRadius: 16

                }}

            >

                <h2>

                    ✨ Generate Mind Map with AI

                </h2>

                <input

                    value={topic}

                    onChange={(e) =>

                        setTopic(e.target.value)

                    }

                    placeholder="Example: Artificial Intelligence"

                    style={{

                        width: "100%",

                        padding: 14,

                        marginTop: 20

                    }}

                />

                <div

                    style={{

                        display: "flex",

                        justifyContent: "flex-end",

                        gap: 10,

                        marginTop: 20

                    }}

                >

                    <button onClick={onClose}>

                        Cancel

                    </button>

                    <button

                        onClick={() =>

                            onGenerate(topic)

                        }

                    >

                        Generate

                    </button>

                </div>

            </div>

        </div>

    );

}