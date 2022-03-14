// Business Logic

// Utility Logic
function noInputtedWord(word, text) {
  return text.trim().length === 0 || word.trim().length === 0;
}

// Function that takes a string and returns only alpha characters.
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

// Function that takes an array, and returns its largest number and index.
function largestNumber(nestedArray) {
  let largestNumber = nestedArray[0][0];
  let largestIndex = 0;
  console.log("The largest number is " + largestNumber);
  console.log("The largest number's index is: " + largestIndex);
  nestedArray.forEach(function (value, index) {
    if (largestNumber < value) {
      largestNumber = value;
      largestIndex = index;
    }
  });
  console.log("The largest number is " + largestNumber);
  console.log("The largest number's index is: " + largestIndex);
  return largestNumber, largestIndex;
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
  console.log("Array with Chars only: " + charsOnlyArray);
  console.log("Count how many of each: " + elementCount);

  // Nested array keeps track of element and times it shows.
  const uniqueWordsAndCount = [];
  console.log("All unique words & count: " + uniqueWordsAndCount);

  for (i = 0; i < charsOnlyArray.length; i++) {
    if (!uniqueWordsAndCount.includes(charsOnlyArray[i])) {
      uniqueWordsAndCount.push([charsOnlyArray[i], elementCount[i]]);
    }
  }

  // charsOnlyArray.forEach(function (element, index) {
  //   if (!uniqueWordsAndCount.includes(element)) {
  //     uniqueWordsAndCount.push([element, elementCount[index]]);
  //   }
  // });

  console.log("All unique words & count: " + uniqueWordsAndCount);
  console.log("Array[0]: " + uniqueWordsAndCount[0]);
  console.log("Array[1]: " + uniqueWordsAndCount[1]);
  console.log("Array[2]: " + uniqueWordsAndCount[2]);
  console.log("Array[3]: " + uniqueWordsAndCount[3]);
  console.log("Array[4]: " + uniqueWordsAndCount[4]);
  console.log("Array[0][0]: " + uniqueWordsAndCount[0][0]);
  console.log("Array[0][1]: " + uniqueWordsAndCount[0][1]);
  console.log("Array[1][0]: " + uniqueWordsAndCount[1][0]);
  console.log("Array[1][1]: " + uniqueWordsAndCount[1][1]);
  // Go through the uniqueWordsCount array, and check for biggest counts.
  // largestNumber(uniqueWordsAndCount);

  // How to proceed with find most common function:
  // Get rid of the nested array.. back to 2 separate arrays, one with string, one with count. .
  // Use largest value function.. to find the largest number in the count array.. and return that index position.
  // Use the index position to print to the html the string and the count found in the text. ("hi", 3)..
  // Set this index position's count value to zero..
  // Use largest value function again.
  // And then again.
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

    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#most-common").html(mostCommon(passage));
  });
});
