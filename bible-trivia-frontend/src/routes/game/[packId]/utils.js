/**
 * @param {string | any[]} array
 */
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
     // @ts-expect-error blah
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }