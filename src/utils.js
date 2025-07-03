function sanitizeInput(input) {
    return input.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function parseDate(dateString) {
  const [day, month, yearAndTime] = dateString.split("/");
  const [year, time] = yearAndTime.split(" ");
  return new Date(`${year}-${month}-${day}T${time}:00`);
};

export { sanitizeInput, isValidEmail, parseDate };