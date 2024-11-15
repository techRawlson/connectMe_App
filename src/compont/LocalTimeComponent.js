const LocalTimeComponent = (date) => {
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // for 12-hour format (true for AM/PM, false for 24-hour format)
    });
};

export default LocalTimeComponent