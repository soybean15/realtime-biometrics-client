 const getChipColor = (key) => {
    const colors = {
      late: "orange",
      no_time_in: "red",
      no_time_out: "red",
      undertime:'orange',
      normal: "green",
      half_day_out: "orange",
      half_day_in: "orange"

      // Add more key-value pairs as needed
    };

    return colors[key];
  }

  export default getChipColor