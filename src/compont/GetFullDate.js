const GetFullDate = (currentDate) => {
    let newDate = new Date(currentDate);
    // return newDate;
    // return `${newDate.getDate()<10?"0"+newDate.getDate():newDate.getDate()}/${(newDate.getMonth()+1)<10?"0"+(newDate.getMonth()+1):(newDate.getMonth()+1)}/${newDate.getFullYear()}`;
    return `${newDate.getDate()}/${(newDate.getMonth()+1)}/${newDate.getFullYear()}`;
}

export default GetFullDate