 const getChipColor = (key) => {
    const colors = {
      late: "orange",
      no_time_in: "red",
      no_time_out: "red",
      undertime:'orange',
      normal: "green",

      // Add more key-value pairs as needed
    };

    return colors[key];
  }

  export default getChipColor