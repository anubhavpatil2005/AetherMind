import { useRef, useState, useEffect } from "react";

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

    onTitleChange: (
        id: number,
        title: string
    ) => void;

}

export default function Node({

    id,

    title,

    x,

    y,

    onMove,

    onSave,

    onTitleChange

}: Props) {

    const drag = useRef(false);

    const offset = useRef({

        x: 0,

        y: 0

    });

    const [editing, setEditing] = useState(false);

    const [value, setValue] = useState(title);

    useEffect(() => {

        setValue(title);

    }, [title]);

    function pointerDown(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (editing) return;

        e.stopPropagation();

        drag.current = true;

        offset.current = {

            x: e.clientX - x,

            y: e.clientY - y

        };

        e.currentTarget.setPointerCapture(
            e.pointerId
        );

    }

    function pointerMove(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (!drag.current || editing) return;

        onMove(

            id,

            e.clientX - offset.current.x,

            e.clientY - offset.current.y

        );

    }

    function pointerUp(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (editing) return;

        drag.current = false;

        onSave(id);

        e.currentTarget.releasePointerCapture(
            e.pointerId
        );

    }

    function finishEditing() {

        setEditing(false);

        if (value.trim() === "") {

            setValue(title);

            return;

        }

        onTitleChange(id, value);

        onSave(id);

    }

    return (

        <div

            onPointerDown={pointerDown}

            onPointerMove={pointerMove}

            onPointerUp={pointerUp}

            onDoubleClick={() => setEditing(true)}

            style={{

                position: "absolute",

                left: x,

                top: y,

                width: 190,

                minHeight: 80,

                padding: 18,

                borderRadius: 18,

                background: "#1E293B",

                color: "white",

                border: "1px solid #3B82F6",

                boxShadow: "0 12px 30px rgba(0,0,0,.35)",

                cursor: editing ? "text" : "grab",

                userSelect: "none",

                transition: "0.2s"

            }}

        >

            {

                editing ? (

                    <input

                        autoFocus

                        value={value}

                        onChange={(e) =>

                            setValue(e.target.value)

                        }

                        onBlur={finishEditing}

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                finishEditing();

                            }

                            if (e.key === "Escape") {

                                setValue(title);

                                setEditing(false);

                            }

                        }}

                        style={{

                            width: "100%",

                            border: "none",

                            outline: "none",

                            background: "transparent",

                            color: "white",

                            fontSize: 16,

                            fontWeight: 600

                        }}

                    />

                ) : (

                    <div

                        style={{

                            fontSize: 16,

                            fontWeight: 600,

                            wordBreak: "break-word"

                        }}

                    >

                        {title}

                    </div>

                )

            }

        </div>

    );

}