import { useEffect, useRef, useState } from "react";

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

    onContextMenu: (
        id: number,
        x: number,
        y: number
    ) => void;
}

export default function Node({

    id,

    title,

    x,

    y,

    onMove,

    onSave,

    onTitleChange,

    onContextMenu

}: Props) {

    const dragging = useRef(false);

    const offset = useRef({
        x: 0,
        y: 0
    });

    const [editing, setEditing] = useState(false);

    const [value, setValue] = useState(title);

    useEffect(() => {

        setValue(title);

    }, [title]);

    function handlePointerDown(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (editing) return;

        dragging.current = true;

        offset.current = {

            x: e.clientX - x,

            y: e.clientY - y

        };

        e.currentTarget.setPointerCapture(e.pointerId);

    }

    function handlePointerMove(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (!dragging.current) return;

        if (editing) return;

        onMove(

            id,

            e.clientX - offset.current.x,

            e.clientY - offset.current.y

        );

    }

    function handlePointerUp(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (!dragging.current) return;

        dragging.current = false;

        onSave(id);

        e.currentTarget.releasePointerCapture(
            e.pointerId
        );

    }

    function finishEditing() {

        const newTitle = value.trim();

        if (newTitle.length === 0) {

            setValue(title);

        } else if (newTitle !== title) {

            onTitleChange(

                id,

                newTitle

            );

            onSave(id);

        }

        setEditing(false);

    }

    function handleContext(
        e: React.MouseEvent<HTMLDivElement>
    ) {

        e.preventDefault();

        if (editing) return;

        onContextMenu(

            id,

            e.clientX,

            e.clientY

        );

    }

    return (

        <div

            onPointerDown={handlePointerDown}

            onPointerMove={handlePointerMove}

            onPointerUp={handlePointerUp}

            onContextMenu={handleContext}

            onDoubleClick={() => setEditing(true)}

            style={{

                position: "absolute",

                left: x,

                top: y,

                width: 210,

                minHeight: 90,

                padding: 18,

                borderRadius: 16,

                background: "#1E293B",

                border: editing

                    ? "2px solid #60A5FA"

                    : "1px solid #334155",

                color: "white",

                boxShadow:

                    "0 10px 25px rgba(0,0,0,.35)",

                cursor: editing

                    ? "text"

                    : "grab",

                transition: "0.2s",

                userSelect: "none"

            }}

        >

            {

                editing ? (

                    <input

                        autoFocus

                        value={value}

                        onChange={(e) =>

                            setValue(

                                e.target.value

                            )

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

                            background: "transparent",

                            border: "none",

                            outline: "none",

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

                            lineHeight: 1.5,

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