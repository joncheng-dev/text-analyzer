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
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

// User Interface Logic
$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    // Grab information user entered.
    // First, the block of text: #text-passage. Put this aside in a variable.
    const textEntered = $("#text-passage").val();
    // Next, the word for word counting: #word.
    const wordOfFocus = $("#word").val();

    // Put into existing functions. Store what they return into variables.
    const wordCountPassage = parseInt(wordCounter(textEntered));
    const wordToFind = parseInt(
      numberOfOccurrencesInText(wordOfFocus, textEntered)
    );
    // Display to html page.
    $("#total-count").html(wordCountPassage);
    $("#selected-count").html(wordToFind);
  });
});
