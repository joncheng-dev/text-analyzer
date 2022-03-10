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

// User Interface Logic
$(document).ready(function () {});
