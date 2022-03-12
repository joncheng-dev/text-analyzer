// Business Logic

// Utility Logic
function noInputtedWord(word, text) {
  return text.trim().length === 0 || word.trim().length === 0;
}

// Function that counts number of words in a given text.
function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

// Function that bolds text the user is searching for.
function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== textArray.length - 1) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

// Function that counts how many times a word appears in a given text.
function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
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

// Function that returns the most common words in a passage.
function mostCommon(text) {
  const textArray = text.split(" ");
  const elementCount = [];

  textArray.forEach(function (element) {
    elementCount.push(numberOfOccurrencesInText(element, text));
  });
  console.log("Text in ea. position: " + textArray);
  console.log("# of each element: " + elementCount);
  // Loop through the text array positions, and then zero the elementCount array at the position.
  // Hi there hey yo hi hi yay yo whoa there whoa... yay!
  const uniqueWords = [];
  textArray.forEach(function (element) {
    // Hi,there,hey,yo,hi,hi,yay,yo,whoa,there,whoa...,yay!
    // 3,     2,  1, 2, 3, 3,  2, 2,   2,    2,   1,     1

    if (!uniqueWords.includes(element.toLowerCase())) {
      uniqueWords.push(element.toLowerCase());
    }
    // First, it goes to "Hi". This word has not been logged yet. Great.
    // Then it checks "there". This word has not been logged yet. Great.
    // ..
    // Then it sees "hi". This word has already been logged. Therefore zero the other array at this position --- elementCount[index] = 0;
  });
  console.log("Array of unique words: " + uniqueWords);
}

// User Interface Logic
$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();

    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);

    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#most-common").html(mostCommon(passage));
  });
});
