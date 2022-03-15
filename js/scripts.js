// Business Logic

// Utility Logic
function noInputtedWord(word, text) {
  return text.trim().length === 0 || word.trim().length === 0;
}

// Utility function that takes a string and returns only alpha characters.
function lowerAlphaCharOnly(string) {
  const lowerCase = string.toLowerCase();

  const lowerAlphaCharWord = [];
  for (i = 0; i < lowerCase.length; i++) {
    if (lowerCase.charCodeAt(i) > 96 && lowerCase.charCodeAt(i) < 123) {
      lowerAlphaCharWord.push(lowerCase.charAt(i));
    }
  }
  const modifiedWord = lowerAlphaCharWord.join("");
  return modifiedWord;
}

// Utility function: Takes an array of words, and an array of occurrences.
// Removes any duplicate entries in the array of words.

// function removeDuplicateWords(wordList, wordCount) {
//   return;
// }

// Function that takes an array, and returns the largest number & index.
function largestNumber(numbersList) {
  let largest = numbersList[0];
  let largestIndex = 0;
  numbersList.forEach(function (value, index) {
    if (largest < value) {
      largest = value;
      largestIndex = index;
    }
  });
  console.log("Largest number: " + largest);
  console.log("Number's index: " + largestIndex);
  return largestIndex;
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

// Function that counts how many times a word appears in a given text.
function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    // Strings with non alphabet characters removed.
    const stringFromArray = lowerAlphaCharOnly(element);
    const wordOfInterest = lowerAlphaCharOnly(word);
    // Checks if the whole word matches.
    let charMatchCount = 0;
    for (i = 0; i < stringFromArray.length; i++) {
      if (stringFromArray.charAt(i) === wordOfInterest.charAt(i)) {
        charMatchCount++;
      } else {
        break;
      }
    }
    if (charMatchCount === wordOfInterest.length) {
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

// Function that returns the most common words in a passage.
function mostCommon(text) {
  const wordArray = text.split(" ");
  const elementCount = [];

  const charsOnlyArray = [];
  wordArray.forEach(function (element) {
    charsOnlyArray.push(lowerAlphaCharOnly(element));
  });
  charsOnlyArray.forEach(function (element) {
    // Keeps count of how many each word shows.
    elementCount.push(numberOfOccurrencesInText(element, text));
  });
  console.log("Chars only: " + charsOnlyArray);
  console.log("Char count: " + elementCount);
  // New array holds all unique words from array.
  const uniqueWords = [];
  const uniqueCount = [];
  charsOnlyArray.forEach(function (word, index) {
    if (!uniqueWords.includes(word)) {
      uniqueWords.push(word.toLowerCase());
      uniqueCount.push(elementCount[index]);
    }
  });
  console.log("Unique words: " + uniqueWords);
  console.log("Unique count: " + uniqueCount);
  // Go through the uniqueWordsCount array, and check for biggest counts.
  // Return that index position.
  let arrayIndex = largestNumber(uniqueCount);
  // Use the index position to print to the html the string and the count found in the text. ("hi", 3)..
  console.log("Most common word: " + uniqueWords[arrayIndex]);
  console.log("Times seen: " + uniqueCount[arrayIndex]);
  // Set this index position's count value to zero..
  uniqueCount[arrayIndex] = 0;
  // Use largest value function again.
  arrayIndex = largestNumber(uniqueCount);
  console.log("Most common word: " + uniqueWords[arrayIndex]);
  console.log("Times seen: " + uniqueCount[arrayIndex]);
  // And then again.
  uniqueCount[arrayIndex] = 0;
  arrayIndex = largestNumber(uniqueCount);
  console.log("Most common word: " + uniqueWords[arrayIndex]);
  console.log("Times seen: " + uniqueCount[arrayIndex]);
  // Run it 3 times, and this gives me the top 3 most common words, with number of occurrences.
}

// User Interface Logic
$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();

    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);

    // Find most common word
    // Display most common word
    // Delete entry in the array -- both string & count
    // x3
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#most-common").html(mostCommon(passage));
  });
});
