import  { loopNewChapters } from './bookGenerator.js';
import fs from 'fs'


async function main() {


    let novelInfo = await loopNewChapters();
    //console.log(novelInfo);

    let arrayOfArrays = [];


    for (let i=1; i <= novelInfo.numberOfChapters; i++) {
        let currentChapterArray = novelInfo[`ChapterNumber${i}`];

        arrayOfArrays.push(currentChapterArray);
    }

    function flattenArray(arr) {
        return arr.flat();
    }
      
    const flattenedArray = flattenArray(arrayOfArrays);
    
    const storyText = flattenedArray.join("\n\n");
    
    fs.writeFile(`Story of ${novelInfo.mainName}.txt`, storyText, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("Text file successfully written.");
    }
    });


}

main();