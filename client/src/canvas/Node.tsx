import { useEffect, useRef, useState } from "react";

interface Props {

    id: number;

    title: string;

    x: number;

    y: number;

    color: string;

    selected?: boolean;

    highlight?: boolean;

    onSelect: (
        id: number
    ) => void;

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

    color,

    selected = false,

    highlight = false,

    onSelect,

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

    function pointerDown(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        if (editing) return;

        onSelect(id);

        dragging.current = true;

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

        if (!dragging.current) return;

        onMove(

            id,

            e.clientX - offset.current.x,

            e.clientY - offset.current.y

        );

    }

    function pointerUp(
        e: React.PointerEvent<HTMLDivElement>
    ) {

        dragging.current = false;

        onSave(id);

        e.currentTarget.releasePointerCapture(

            e.pointerId

        );

    }

    function finishEditing() {

        const newTitle = value.trim();

        if (!newTitle) {

            setValue(title);

        }

        else if (newTitle !== title) {

            onTitleChange(

                id,

                newTitle

            );

            onSave(id);

        }

        setEditing(false);

    }

    function handleContextMenu(
        e: React.MouseEvent<HTMLDivElement>
    ) {

        e.preventDefault();

        onSelect(id);

        onContextMenu(

            id,

            e.clientX,

            e.clientY

        );

    }

    return (

        <div

            onPointerDown={pointerDown}

            onPointerMove={pointerMove}

            onPointerUp={pointerUp}

            onDoubleClick={() =>

                setEditing(true)

            }

            onContextMenu={handleContextMenu}

            style={{

                position: "absolute",

                left: x,

                top: y,

                width: 220,

                minHeight: 90,

                padding: 18,

                borderRadius: 18,

                background: color,

                color: "white",

                border:

                    highlight

                        ? "3px solid #FACC15"

                        : selected

                            ? "3px solid white"

                            : "2px solid rgba(255,255,255,.15)",

                boxShadow:

                    highlight

                        ? "0 0 25px rgba(250,204,21,.75)"

                        : selected

                            ? "0 0 25px rgba(255,255,255,.45)"

                            : "0 10px 30px rgba(0,0,0,.35)",

                cursor:

                    editing

                        ? "text"

                        : dragging.current

                            ? "grabbing"

                            : "grab",

                transition: ".2s",

                userSelect: "none"

            }}

        >

            {

                editing

                    ? (

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

                                if (

                                    e.key === "Enter"

                                ) {

                                    finishEditing();

                                }

                                else if (

                                    e.key === "Escape"

                                ) {

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

                                fontWeight: 700,

                                fontSize: 16

                            }}

                        />

                    )

                    : (

                        <div

                            style={{

                                fontSize: 16,

                                fontWeight: 700,

                                wordBreak: "break-word",

                                lineHeight: 1.4

                            }}

                        >

                            {title}

                        </div>

                    )

            }

        </div>

    );

}