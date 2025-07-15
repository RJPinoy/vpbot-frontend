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

const AiModelAvailable = [
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
  'gpt-4',
  'gpt-4o-mini-2024-07-18',
  'gpt-4o-mini-2024-11-20',
  'gpt-4o-mini-2024-08-06',
  'gpt-4o-mini-2024-05-13',
  'gpt-4-turbo-preview',
  'gpt-4-turbo-2024-04-09',
  'gpt-4-1106-preview',
  'gpt-4-0613',
  'gpt-4-0125-preview',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-1106',
  'gpt-3.5-turbo-0125',
]

export { sanitizeInput, isValidEmail, parseDate, AiModelAvailable };