/**
 * Returns a string with properly formatted bullet points
 *
 * @param {string} text - transcribed text that uses 'Number ${n}' or 'Number next' to represent bullet points
 * @returns {string}
 */
export function transformText(text: string): string {
  let transformed = '';
  const numStringToNum = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  const words = text.split(' ');
  let currNum: number;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === 'Number') {
      if (!currNum) {
        if (numStringToNum[words[i + 1]]) {
          currNum = numStringToNum[words[++i]];
          transformed += `\n${currNum}.`;

          //if next word if in bounds(covers case where 'next' is last word of input text)
          if (i + 1 < words.length) {
            transformed += ` ${capitalizeFirstLetter(words[++i])}`;
          }
        } else {
          transformed += ` ${words[i]}`;
        }
      } else {
        if (words[i + 1] === 'next') {
          transformed += `\n${++currNum}.`;
          i++;

          //if next word if in bounds(covers case where 'next' is last word of input text)
          if (i + 1 < words.length) {
            transformed += ` ${capitalizeFirstLetter(words[++i])}`;
          }
        } else {
          transformed += ` ${words[i]}`;
        }
      }
    } else {
      transformed += ` ${words[i]}`;
    }
  }

  //Trim transformed[0] to account for extra ' ' getting added on first iteration of loop
  return transformed.length > 1 ? transformed.slice(1) : '';
}

function capitalizeFirstLetter(word: string): string {
  return word[0].toUpperCase() + word.slice(1);
}
