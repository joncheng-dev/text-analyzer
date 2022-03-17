// Business Logic

// Utility Logic
function noInputtedWord() {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false;
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

// Function that filters specified words.
function wordFilter(text) {
  const wordArray = text.split(" ");
  const wordsToFilter = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"];
  const noPunctuationArray = [];
  // Whole array has punctuation removed. Words only now.
  wordArray.forEach(function (element) {
    noPunctuationArray.push(lowerAlphaCharOnly(element));
  });
  // Go through each element in array, check to see if matches wordsToFilter.
  noPunctuationArray.forEach(function (element, index) {
    // Checks if the whole word matches.
    for (i = 0; i < wordsToFilter.length; i++) {
      let charMatchCount = 0;
      for (j = 0; j < element.length; j++) {
        if (element.charAt(j) === wordsToFilter[i].charAt(j)) {
          charMatchCount++;
        } else {
          break;
        }
        if (charMatchCount === wordsToFilter[i].length) {
          noPunctuationArray.splice(index, 1);
        }
      }
    }
  });
  return noPunctuationArray.join(" ");
}

function firstInstanceOfWord(word, text) {
  const textArray = text.split(" ");
  for (let i = 0; i < textArray.length; i++) {
    console.log(i);
    if (word === textArray[i]) {
      return i;
    }
  }
}

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
  return largestIndex;
}

// Function that counts number of words in a given text.
function wordCounter(text) {
  if (noInputtedWord(text)) {
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
    let charMatchCount = 0;
    for (i = 0; i < element.length; i++) {
      if (element.charAt(i) === word.charAt(i)) {
        charMatchCount++;
      } else {
        break;
      }
    }
    if (charMatchCount === element.length && charMatchCount === word.length) {
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

// Function that appends html page Most common words
function appendMostCommon(nestedArray) {
  let list = "<ul>";
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 1; j++) {
      list = list.concat(
        "<li>" + nestedArray[i][j] + ": " + nestedArray[i][j + 1] + "</li>"
      );
    }
  }
  return list + "</u>";
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
  // New array holds all unique words from array.
  const uniqueWords = [];
  const uniqueCount = [];
  charsOnlyArray.forEach(function (word, index) {
    if (!uniqueWords.includes(word)) {
      uniqueWords.push(word.toLowerCase());
      uniqueCount.push(elementCount[index]);
    }
  });
  // Make a nested array to return:
  const commonWordsAndCount = [];
  // Go through the uniqueWordsCount array, and check for biggest counts.
  // Return that index position.
  let arrayIndex = [];
  // Use the index position to print to the html the string and the count found in the text. ("hi", 3)..
  for (i = 0; i < 3; i++) {
    arrayIndex = largestNumber(uniqueCount);
    commonWordsAndCount.push([
      uniqueWords[arrayIndex],
      uniqueCount[arrayIndex],
    ]);
    uniqueCount[arrayIndex] = 0;
  }
  return commonWordsAndCount;
}

// User Interface Logic
$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();

    // Text after filtering words.
    const afterFiltering = wordFilter(passage);

    const wordCount = wordCounter(afterFiltering);
    const occurrencesOfWord = numberOfOccurrencesInText(word, afterFiltering);

    const print = appendMostCommon(mostCommon(afterFiltering));

    $("#filtered-text").html(afterFiltering);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, afterFiltering));
    $("#most-common").html(print);
  });
});
