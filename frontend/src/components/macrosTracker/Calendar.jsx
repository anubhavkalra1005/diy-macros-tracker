import { useState, useRef, useEffect } from "react";
import "./css/Calendar.css";

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
    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let d = 1; d <= daysInMonth; d++) dates.push(d);

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
        <>
            <button
                type="button"
                onClick={() => setShowCalendar((v) => !v)}
                className={buttonStyle}
            >
                {year}-{String(month + 1).padStart(2, "0")}-{String(selected).padStart(2, "0")}
            </button>
            <div className="calendar-container">

                {showCalendar && (
                    <div ref={calendarRef} className="calendar-popup">
                        <h3 className="calendar-header">
                            {today.toLocaleString("default", { month: "long" })} {year}
                        </h3>

                        <div className="calendar-grid">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="calendar-day-label">{day}</div>
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
                                        className={`calendar-date-btn ${isSelected ? "selected" : ""} ${isFuture ? "future" : ""}`}
                                    >
                                        {d}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
