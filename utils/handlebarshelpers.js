module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_datetime: (date) => {
    return date.toLocaleTimeString() +" on "+ date.toLocaleDateString();
  }
};
