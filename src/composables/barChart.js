
 const generateBarChartData = (data)=>{

    const latesData = [];
    const attendendData = [];
  
    const categories = [];
  
    for (let date in data) {
      console.log(data[date].month);
  
      const lates = data[date].total_lates;
      const attendance = data[date].total_attendance;

      const attendance_rate = 100 - data[date].absentee_rate
      const late_rate =lates == 0 ? 0 : (lates / attendance) * 100

      const late_percentage= (attendance_rate/100)*late_rate
  
      latesData.push(late_percentage.toFixed(2));
      attendendData.push(attendance_rate.toFixed(2));
      categories.push(date);

    }


    return {
        series: [
          {
            name: "Attendance",
            data: attendendData,
          },
          {
            name: "Lates",
            data: latesData,
          },
        ],
        categories: categories,
      };


}

export default generateBarChartData