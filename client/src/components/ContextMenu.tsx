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

    if (!visible) return null;

    return (

        <div

            onMouseLeave={onClose}

            style={{

                position: "fixed",

                left: x,

                top: y,

                width: 240,

                background: "#1E293B",

                border: "1px solid #334155",

                borderRadius: 12,

                boxShadow: "0 12px 30px rgba(0,0,0,.35)",

                overflow: "hidden",

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

                cursor: "pointer",

                color: danger ? "#EF4444" : "white",

                borderBottom: "1px solid #334155",

                fontWeight: 500,

                transition: "background 0.2s"

            }}

            onMouseEnter={(e) => {

                e.currentTarget.style.background = "#334155";

            }}

            onMouseLeave={(e) => {

                e.currentTarget.style.background = "transparent";

            }}

        >

            {text}

        </div>

    );

}