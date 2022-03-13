// Business Logic

// Utility Logic
function noInputtedWord(word, text) {
  return text.trim().length === 0 || word.trim().length === 0;
}

// Function that takes a string and returns only alpha characters.
function lowerAlphaCharOnly(string) {
  const lowerCase = string.toLowerCase();
  console.log("String is now lowercased: " + lowerCase);

  const lowerAlphaCharWord = [];
  for (i = 0; i < lowerCase.length; i++) {
    if (lowerCase.charCodeAt(i) > 96 && lowerCase.charCodeAt(i) < 123) {
      lowerAlphaCharWord.push(lowerCase.charAt(i));
    }
  }
  const modifiedWord = lowerAlphaCharWord.join("");
  console.log("Word with only characters: " + modifiedWord);
  return modifiedWord;
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
    // Strings with non alphabet characters removed.
    const stringFromArray = lowerAlphaCharOnly(element);
    const wordOfInterest = lowerAlphaCharOnly(word);
    // Checks if the whole word matches.
    let charMatchCount = 0;
    for (i = 0; i < stringFromArray.length; i++) {
      if (stringFromArray.charAt(i) === wordOfInterest.charAt(i)) {
        console.log("Char at " + i + " location matches.");
        charMatchCount++;
      } else {
        console.log("Char at " + i + " does not match.");
        break;
      }
    }
    if (charMatchCount === wordOfInterest.length) {
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
  // Hi there hey yo hi hi yay yo whoa there whoa... yay!
  const uniqueWords = [];
  textArray.forEach(function (element) {
    // Hi,there,hey,yo,hi,hi,yay,yo,whoa,there,whoa...,yay!
    // 3,     2,  1, 2, 3, 3,  2, 2,   2,    2,   1,     1
    if (!uniqueWords.includes(element.toLowerCase())) {
      uniqueWords.push(element.toLowerCase());
    }

    for (i = 0; i <= element.length; i++) {}
    // Make an if statement.. that checks to see if the strings match.
    // If there's punctuation, ignore the punctuation.
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
