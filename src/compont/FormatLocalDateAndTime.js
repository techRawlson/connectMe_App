export default FormatLocalDateAndTime = (date) => {
    // 2024-08-10T12:24:00.000Z => 2024-08-10T12:24:00    convert Time

    // year-month(2)-date(2)Thours(2):minits(2):secend(2) Formet
    let newDate = new Date(date);
    let year = newDate.getFullYear()
    let month = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
    let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()

    let hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours()
    let minit = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()
    let secend = newDate.getSeconds() < 10 ? "0" + newDate.getSeconds() : newDate.getSeconds()

    return `${year}-${month}-${day}T${hours}:${minit}:${secend}`
}