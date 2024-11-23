// Get DOM elements
const currentDayElem = document.getElementById('current-day');
const currentDateElem = document.getElementById('current-date');
const currentTimeElem = document.getElementById('current-time');
const todayTimeLeftElem = document.getElementById('today-time-left');
const monthlyTimeLeftElem = document.getElementById('monthly-time-left');
const yearlyTimeLeftElem = document.getElementById('yearly-time-left');

// Function to get the name of the day
function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

// Update date and time
function updateDateTime() {
    const now = new Date();

    // Get current day name
    const currentDay = getDayName(now.getDay());
    currentDayElem.textContent = currentDay;

    // Format date: DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    currentDateElem.textContent = `${day}/${month}/${year}`;

    // Format hours, minutes, and seconds
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time
    hours = hours % 12 || 12;

    // Update the current time in AM/PM format
    currentTimeElem.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Calculate remaining time for today
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const remainingToday = endOfDay - now;

    const remainingHours = Math.floor(remainingToday / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingToday / (1000 * 60)) % 60);
    const remainingSeconds = Math.floor((remainingToday / 1000) % 60);
    todayTimeLeftElem.textContent = `${remainingHours} hrs : ${remainingMinutes} minutes : ${remainingSeconds} seconds`;

    // Calculate remaining time for this month
    const endOfMonth = new Date(year, now.getMonth() + 1, 0, 23, 59, 59); // Last day of the current month
    const remainingMonth = endOfMonth - now;
    const remainingDaysInMonth = Math.floor(remainingMonth / (1000 * 60 * 60 * 24));
    const remainingHoursInMonth = Math.floor((remainingMonth / (1000 * 60 * 60)) % 24);
    const remainingMinutesInMonth = Math.floor((remainingMonth / (1000 * 60)) % 60);
    monthlyTimeLeftElem.textContent = `${remainingDaysInMonth} Days : ${remainingHoursInMonth} hrs : ${remainingMinutesInMonth} minutes`;

    // Calculate remaining time for this year
    const endOfYear = new Date(year, 11, 31, 23, 59, 59); // December 31
    const remainingYear = endOfYear - now;
    const remainingMonths = 11 - now.getMonth(); // Remaining months
    const remainingDaysInYear = Math.floor((remainingYear / (1000 * 60 * 60 * 24)) % 30); // Days not complete month
    const remainingHoursInYear = Math.floor((remainingYear / (1000 * 60 * 60)) % 24);
    yearlyTimeLeftElem.textContent = `${remainingMonths} Months : ${remainingDaysInYear} Days : ${remainingHoursInYear} hrs`;
}

// Update every second
setInterval(updateDateTime, 1000);

// Initialize on page load
updateDateTime();
