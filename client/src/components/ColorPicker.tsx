interface Props {

    visible: boolean;

    x: number;

    y: number;

    onSelect: (
        color: string
    ) => void;

    onClose: () => void;

}

const COLORS = [

    "#3B82F6", // Blue

    "#10B981", // Green

    "#F59E0B", // Yellow

    "#8B5CF6", // Purple

    "#EF4444", // Red

    "#6B7280", // Gray

    "#EC4899", // Pink

    "#14B8A6"  // Teal

];

export default function ColorPicker({

    visible,

    x,

    y,

    onSelect,

    onClose

}: Props) {

    if (!visible) return null;

    return (

        <div

            style={{

                position: "fixed",

                left: x,

                top: y,

                display: "grid",

                gridTemplateColumns:

                    "repeat(4,40px)",

                gap: 10,

                padding: 14,

                background: "#1E293B",

                borderRadius: 12,

                border: "1px solid #334155",

                boxShadow:

                    "0 12px 30px rgba(0,0,0,.35)",

                zIndex: 10000

            }}

        >

            {

                COLORS.map(color => (

                    <div

                        key={color}

                        onClick={() => {

                            onSelect(color);

                            onClose();

                        }}

                        style={{

                            width: 34,

                            height: 34,

                            borderRadius: "50%",

                            background: color,

                            cursor: "pointer",

                            border:

                                "2px solid white"

                        }}

                    />

                ))

            }

        </div>

    );

}