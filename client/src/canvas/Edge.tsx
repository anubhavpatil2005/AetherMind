interface EdgeProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    selected?: boolean;
}

export default function Edge({
    x1,
    y1,
    x2,
    y2,
    selected = false
}: EdgeProps) {

    const dx = Math.abs(x2 - x1) * 0.5;

    const path = `
        M ${x1} ${y1}
        C ${x1 + dx} ${y1},
          ${x2 - dx} ${y2},
          ${x2} ${y2}
    `;

    return (

        <path
            d={path}
            fill="none"
            stroke={selected ? "#3B82F6" : "#64748B"}
            strokeWidth={3}
            strokeLinecap="round"
        />

    );

}