import { useEffect, useRef } from "react";

interface Props {

    x: number;

    y: number;

    visible: boolean;

    onAddChild: () => void;

    onRename: () => void;

    onColor: () => void;

    onDuplicate: () => void;

    onExpandAI: () => void;

    onDelete: () => void;

    onClose: () => void;

}

export default function ContextMenu({

    x,

    y,

    visible,

    onAddChild,

    onRename,

    onColor,

    onDuplicate,

    onExpandAI,

    onDelete,

    onClose

}: Props) {

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        function handleClick(e: MouseEvent) {

            if (

                menuRef.current &&

                !menuRef.current.contains(e.target as Node)

            ) {

                onClose();

            }

        }

        if (visible) {

            window.addEventListener(

                "mousedown",

                handleClick

            );

        }

        return () => {

            window.removeEventListener(

                "mousedown",

                handleClick

            );

        };

    }, [visible, onClose]);

    if (!visible) return null;

    return (

        <div

            ref={menuRef}

            style={{

                position: "fixed",

                left: x,

                top: y,

                width: 250,

                background: "#1E293B",

                border: "1px solid #334155",

                borderRadius: 14,

                overflow: "hidden",

                boxShadow:

                    "0 14px 35px rgba(0,0,0,.4)",

                zIndex: 9999

            }}

        >

            <MenuItem

                text="➕ Add Child"

                onClick={onAddChild}

            />

            <MenuItem

                text="✏ Rename"

                onClick={onRename}

            />

            <MenuItem

                text="🎨 Change Color"

                onClick={onColor}

            />

            <MenuItem

                text="📄 Duplicate"

                onClick={onDuplicate}

            />

            <MenuItem

                text="✨ Expand with AI"

                onClick={onExpandAI}

            />

            <MenuItem

                text="🗑 Delete"

                onClick={onDelete}

                danger

            />

        </div>

    );

}

interface ItemProps {

    text: string;

    onClick: () => void;

    danger?: boolean;

}

function MenuItem({

    text,

    onClick,

    danger = false

}: ItemProps) {

    return (

        <div

            onClick={onClick}

            style={{

                padding: "14px 18px",

                display: "flex",

                alignItems: "center",

                cursor: "pointer",

                fontSize: 15,

                fontWeight: 500,

                color: danger

                    ? "#EF4444"

                    : "white",

                borderBottom:

                    "1px solid #334155",

                transition:

                    "background .15s"

            }}

            onMouseEnter={(e) => {

                e.currentTarget.style.background =

                    "#334155";

            }}

            onMouseLeave={(e) => {

                e.currentTarget.style.background =

                    "transparent";

            }}

        >

            {text}

        </div>

    );

}