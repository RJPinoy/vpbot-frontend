function sanitizeInput(input) {
  return input.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
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

function initialMessage(message) {
  return {
    role: 'assistant',
    content: [
      {
        text: {
          value: message
        }
      }
    ]
  }
}

const fetchFailed = {
  role: 'assistant',
  content: [
    {
      text: {
        value: "Oops.. We're sorry.. Something went wrong. Please reload or try again. If the problem persists, please contact our support."
      }
    }
  ]
}

function parseMarkdown(text) {
  // Replace headers
  text = text.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  text = text.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  text = text.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Replace bold and italic
  text = text.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  
  // Replace links
  text = text.replace(/\[(.*?)\]\((.*?)\)/gim, '<a class="extranet-bot-messages-link" href="$2" target="_blank">$1</a>');
  
  // Replace unordered lists
  text = text.replace(/^\* (.*$)/gim, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  
  // Replace line breaks
  text = text.replace(/\n/gim, '<br>');
  
  // Replace annotations【10†source】from prompt response
  let pattern = /【.*?】/g;
  text = text.replace(pattern, '');
  
  // Remove backslashes before special characters
  text = text.replace(/\\(.)/g, '$1');
  
  // Replace code blocks (```language ... ```)
  text = text.replace(/```(\w+)?\s*([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="${lang ? `language-${lang}` : ''}">${code}</code></pre>`;
  });    
  
  return text.trim();
}

function setDefaultLocalStorage() {
  if (!localStorage.getItem('extranet-threadIds')) {
    localStorage.setItem('extranet-threadIds', JSON.stringify({
      'public': {
        'threadId': null,
      },
      'private': {},
    }));
  }
}

export { sanitizeInput, getCookie, isValidEmail, parseDate, AiModelAvailable, initialMessage, fetchFailed, parseMarkdown, setDefaultLocalStorage };