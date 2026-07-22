import { useState } from "react";

interface Props {

    onSearch: (
        value: string
    ) => void;

}

export default function SearchBar({

    onSearch

}: Props) {

    const [value, setValue] = useState("");

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        const text = e.target.value;

        setValue(text);

        onSearch(text);

    }

    return (

        <div

            style={{

                position: "fixed",

                top: 20,

                left: "50%",

                transform: "translateX(-50%)",

                zIndex: 10000

            }}

        >

            <input

                value={value}

                onChange={handleChange}

                placeholder="Search nodes..."

                style={{

                    width: 320,

                    padding: "12px 18px",

                    borderRadius: 30,

                    border: "1px solid #334155",

                    outline: "none",

                    background: "#1E293B",

                    color: "white",

                    fontSize: 15

                }}

            />

        </div>

    );

}