// Business Logic

// Function that counts number of words in a given text.
function wordCounter(text) {
  // If text length is zero, then return 0.
  if (text.trim().length === 0) {
    return 0;
  }
  // If text length is not zero, then count how many words there are.
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

// Function that counts how many times a word appears in a given text.
function numberOfOccurrencesInText(word, text) {
  if (text.trim().length === 0) {
    return 0;
  }

  const wordArray = text.split(" ");
  let wordCount = 0;

  wordArray.forEach(function (element) {
    if (word.toLowerCase() === element.toLowerCase()) {
      wordCount++;
    }
  });
  return wordCount;
}

// User Interface Logic
$(document).ready(function () {});
