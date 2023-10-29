const generatePieChartData = (data) => {


    console.log(data)
    const series = []
    const labels = []
    const total_attendance = data.total_attendance
    console.log('total_attendance', total_attendance)
    for (let item in data.departments) {

        const attendance_percentage = (data.departments[item].attendance / total_attendance * 100)
        labels.push(item)


        series.push(parseFloat(attendance_percentage.toFixed(2)))
        //console.log(item, data.departments[item].attendance)


    }

    return {
        series:series,
        labels:labels
    }


}

export default generatePieChartData