import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { toISODateString } from "../../utils/dateHelpers";

import "./Calendar.css";

const getToday = () => toISODateString(new Date());

const getMonthDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const totalDays = new Date(year, month + 1, 0).getDate();

  const dates = [];

  for (let i = 0; i < firstDay; i++) dates.push(null);

  for (let day = 1; day <= totalDays; day++) dates.push(day);

  return dates;
};

export default function Calendar({
  selectedDate,
  onDateSelect,
  minDate,
  singleMonth = false,
  startDate,
  endDate,
  title = "Select pickup date",
}) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate || startDate || Date.now()),
  );
  const [hoverDate, setHoverDate] = useState(null);

  useEffect(() => {
    if (selectedDate || startDate) {
      setCurrentMonth(new Date(selectedDate || startDate));
    }
  }, [selectedDate, startDate]);

  const previousMonth = (e) => {
    e.stopPropagation();

    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() - 1, 1),
    );
  };

  const nextMonth = (e) => {
    e.stopPropagation();

    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + 1, 1),
    );
  };

  const isDisabled = (date) => {
    if (!minDate) return false;

    return new Date(`${date}T00:00:00`) < new Date(`${minDate}T00:00:00`);
  };

  const handleClick = (date) => {
    if (isDisabled(date)) return;

    onDateSelect(date);
  };

  const effStart = startDate || (endDate ? selectedDate : null);
  const effEnd =
    endDate || (startDate && selectedDate !== startDate ? selectedDate : null);

  const renderMonth = (monthDate) => {
    const year = monthDate.getFullYear();

    const month = monthDate.getMonth();

    const today = getToday();

    return (
      <div className="fsb-calendar-month">
        <div className="fsb-calendar-title">
          {monthDate.toLocaleString("default", { month: "long" })} {year}
        </div>

        <div className="fsb-calendar-weekdays">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div
          className="fsb-calendar-grid"
          onMouseLeave={() => setHoverDate(null)}
        >
          {getMonthDays(monthDate).map((day, index) => {
            if (!day) return <div key={index} className="fsb-calendar-empty" />;

            const date = `${year}-${String(month + 1).padStart(
              2,
              "0",
            )}-${String(day).padStart(2, "0")}`;

            const isStart = effStart && date === effStart;
            const isEnd = effEnd && date === effEnd;
            const isSelected = selectedDate === date || isStart || isEnd;
            const isInRange =
              effStart &&
              effEnd &&
              effStart < effEnd &&
              date > effStart &&
              date < effEnd;

            let isHoverInRange = false;
            if (hoverDate && effStart && hoverDate > effStart) {
              if (effEnd && effStart < effEnd) {
                if (hoverDate !== effEnd) {
                  isHoverInRange = date > effStart && date < hoverDate;
                }
              } else {
                isHoverInRange = date > effStart && date <= hoverDate;
              }
            }

            return (
              <button
                key={date}
                className={`fsb-calendar-day
                    ${isSelected ? "fsb-selected" : ""}
                    ${isStart ? "fsb-range-start" : ""}
                    ${isEnd ? "fsb-range-end" : ""}
                    ${isInRange ? "fsb-in-range" : ""}
                    ${
                      isHoverInRange && !isInRange && !isSelected
                        ? "fsb-in-range-hover"
                        : ""
                    }
                    ${today === date ? "fsb-today" : ""}
                    ${isDisabled(date) ? "fsb-disabled" : ""}
                `.trim()}
                onClick={(e) => {
                  e.stopPropagation();

                  handleClick(date);
                }}
                onMouseEnter={() => {
                  if (!isDisabled(date)) {
                    setHoverDate(date);
                  }
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`fsb-calendar ${singleMonth ? "fsb-single-month" : ""}`}>
      <div className="fsb-calendar-header">
        <button onClick={previousMonth} aria-label="Previous month" type="button">
          <LuChevronLeft />
        </button>

        <span>{title}</span>

        <button onClick={nextMonth} aria-label="Next month" type="button">
          <LuChevronRight />
        </button>
      </div>

      <div className="fsb-calendar-months">
        {renderMonth(currentMonth)}

        {!singleMonth &&
          renderMonth(
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1,
              1,
            ),
          )}
      </div>

      <div className="fsb-calendar-footer">
        <button onClick={() => handleClick(getToday())}>Today</button>

        <span>
          {effStart && effEnd && effStart < effEnd
            ? `${new Date(`${effStart}T00:00:00`).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })} - ${new Date(`${effEnd}T00:00:00`).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}`
            : selectedDate
            ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Pick a date"}
        </span>
      </div>
    </div>
  );
}

export { default as CustomDatePicker } from "./CustomDatePicker";

