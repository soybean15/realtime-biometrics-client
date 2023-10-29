const generatePieChartData = (data) => {


    console.log(data)
    const series = []
    const labels = []
    const total_attendance = data.total_attendance
    console.log('total_attendance', total_attendance)
    for (let item in data.departments) {

        const attendance_percentage = data.departments[item].attendance;
        const total_attendance = data.total_attendance;
        
        // Check if attendance is 0, and return 0 in that case
        const percentage = attendance_percentage === 0 ? 0 : (attendance_percentage / total_attendance * 100);
        
        // Use the 'percentage' variable in your code
        
        labels.push(item)


        series.push(parseFloat(percentage.toFixed(2)))
        console.log(item, data.departments[item].attendance)


    }

    return {
        series:series,
        labels:labels
    }


}

export default generatePieChartData