// Define an array of month names and day names
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Function to get the number of days in a month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Function to create a calendar object
function createCalendarObject(year) {
  const calendar = {};

  for (let month = 0; month < 12; month++) {
    const monthName = monthNames[month];
    const weeks = [];

    // Get the number of days in the current month
    const daysInMonth = getDaysInMonth(year, month);

    // Loop through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = day;
      const dayIndex = new Date(year, month, day).getDay();
      const dayName = dayNames[dayIndex];

      // Create a day object
      const dayObject = {
        name: dayName,
        date: date.toString(),
      };

      // Find the week to which the day belongs
      let weekIndex = Math.floor((day - 1 + dayIndex) / 7);

      // If the week doesn't exist in the weeks array, create it
      if (!weeks[weekIndex]) {
        weeks[weekIndex] = { days: [] };
      }

      // Add the day to the current week
      weeks[weekIndex].days.push(dayObject);
    }

    // Create the month object
    const monthObject = {
      name: monthName,
      weeks,
    };

    // Add the month object to the calendar
    calendar[month + 1] = monthObject;
  }

  return calendar;
}

// Example usage
const year = 2023;
export const calendarObject = createCalendarObject(year);
