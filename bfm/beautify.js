"use strict";

function beautify() {
  const text = document.querySelector(".typed-field").value;
  document.querySelector(".beautify-field").value = beautifyText(text) || "";
  return false;
}

function beautifyText(text) {
  const lineCherecters = document.querySelector(".input-number").value || 80;
  console.log(lineCherecters);
  let beautyText = "";

  let paragraphes = text.split('\n');

  paragraphes.forEach(function(paragraph) {
    let arrayOfStrings = paragraph.split(' ');

    let i = 0;
    let j = 0;
    let oneLineArray = [];
    while (j < arrayOfStrings.length) {
      j = getOneLineWords(i, arrayOfStrings, lineCherecters);
      oneLineArray = arrayOfStrings.slice(i, j);
      if (j === arrayOfStrings.length) {
        beautyText += getBeautyLine(oneLineArray, "last");
      } else {
        beautyText += getBeautyLine(oneLineArray);
      }
      i = j;
    }
  });
  return beautyText;
}

function getOneLineWords(i, arrayOfStrings, lineCherecters) {
  let totalLength = 0;
  let j;
  for (j = i; j < arrayOfStrings.length; j++) {
    if (totalLength < lineCherecters) {
      totalLength += arrayOfStrings[j].length;
    } else {
      break;
    }
  }
  return j;
}

function getBeautyLine(oneLineArray, key) {
  const beautyLine = oneLineArray.join(' ');
  if (key === "last") {
    return `"${beautyLine}"\n\n`;
  }
  return `"${beautyLine} " +\n`;
}

document.querySelector(".button-beautify").addEventListener('click', function() {
  beautify();
  return false;
});

document.querySelector(".button-clear").addEventListener('click', function() {
  document.querySelector(".typed-field").value = "";
  document.querySelector(".beautify-field").value = "";
  return false;
});
