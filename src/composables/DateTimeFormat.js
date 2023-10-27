import moment from 'moment';

class DateTimeFormatter {
  constructor(date, format) {

    this.date = moment(date);

    if(!format){
      this.formatStr = format;
     }else{
      this.formatStr = "MMM D, YYYY";
     }


  }

  format(fmt) {
    if (fmt) {
      this.formatStr = fmt;
    }

    return this;
  }

  toString() {
    return this.date.format(this.formatStr);
  }
}

const formatTime = (timestamp, format) => {
  return new DateTimeFormatter(timestamp, format).format(format);
}

export default formatTime