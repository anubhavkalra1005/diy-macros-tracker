import { useState, useRef, useEffect } from "react";

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export default function Calendar({ onDateUpdate, buttonStyle }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const [selected, setSelected] = useState(today.getDate());
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const firstDay = new Date(year, month, 1).getDay();

    const dates = [];
    for (let i = 0; i < firstDay; i++) {
        dates.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        dates.push(d);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        }
        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    return (
        <div style={{ position: "relative" }}>
            <button
                type="button"
                onClick={() => setShowCalendar((v) => !v)}
                style={{
                    ...buttonStyle,
                    // borderRadius: 16,
                    // background: 'linear-gradient(90deg, #3a86ff 0%, #a1c4fd 100%)',
                    // padding: '0.65rem 1.6rem',
                    // boxShadow: '0 3px 10px rgba(58,134,255,0.3)',
                    // fontSize: '1rem',
                }}
            >
                {year}-{String(month + 1).padStart(2, "0")}-{String(selected).padStart(2, "0")}
            </button>

            {showCalendar && (
                <div
                    ref={calendarRef}
                    style={{
                        position: "absolute",
                        top: 60,
                        left: 0,
                        zIndex: 20,
                        background: "#ffffff",
                        borderRadius: 20,
                        boxShadow: "0 8px 24px rgba(161, 196, 253, 0.4)",
                        padding: 20,
                        minWidth: 300,
                    }}
                >
                    <h3
                        style={{
                            textAlign: "center",
                            color: "#3a86ff",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            marginBottom: 16,
                        }}
                    >
                        {today.toLocaleString("default", { month: "long" })} {year}
                    </h3>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: 8,
                        textAlign: "center"
                    }}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} style={{ fontWeight: 600, color: "#3a86ff", fontSize: '0.9rem' }}>{day}</div>
                        ))}

                        {dates.map((d, i) => {
                            if (d === null) return <div key={i}></div>;
                            const isFuture = d > today.getDate();
                            const isSelected = selected === d;

                            return (
                                <button
                                    key={i}
                                    disabled={isFuture}
                                    onClick={() => {
                                        setSelected(d);
                                        setShowCalendar(false);
                                        const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                                        onDateUpdate(selectedDate);
                                    }}
                                    style={{
                                        background: isSelected
                                            ? "linear-gradient(135deg, #3a86ff, #a1c4fd)"
                                            : "#ffffff",
                                        color: isSelected
                                            ? "#fff"
                                            : isFuture
                                                ? "#c0c0c0"
                                                : "#3a3a3a",
                                        border: "1.5px solid #a1c4fd88",
                                        borderRadius: 12,
                                        padding: "0.7em 0",
                                        fontWeight: 500,
                                        cursor: isFuture ? "not-allowed" : "pointer",
                                        opacity: isFuture ? 0.4 : 1,
                                        boxShadow: isSelected ? "0 2px 8px rgba(58,134,255,0.3)" : "none",
                                        transition: "all 0.25s ease-in-out",
                                        fontSize: '0.95rem',
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                        pointerEvents: isFuture ? 'none' : 'auto',
                                        userSelect: 'none'
                                    }}
                                >
                                    {d}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
