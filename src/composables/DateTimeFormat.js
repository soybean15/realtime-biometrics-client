import moment from 'moment';

class DateTimeFormatter {
  constructor(date) {
    this.date = moment(date);
    this.formatStr = "MMM D, YYYY";
  }

  format(fmt) {
    this.formatStr = fmt;
    return this; // Return the object itself for chaining
  }

  toString() {
    return this.date.format(this.formatStr);
  }
}

const formatTime = (timestamp)=>{
  return new DateTimeFormatter(timestamp).format("MMM D, YYYY");
}

export default formatTime