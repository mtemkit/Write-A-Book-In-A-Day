import { Configuration, OpenAIApi } from "openai"; //npm i openai and dotenv
import * as dotenv from 'dotenv'; //hiding api keys or private info into .env files
dotenv.config()

let novelInfo = {
  currentChapterNumber: 1,
  mainName: process.env.NOVEL_MAIN_CHARACTER_NAME, 
  mainPersonality: process.env.NOVEL_MAIN_CHARACTER_PERSONALITY,
  mainPurpose: process.env.NOVEL_MAIN_CHARACTER_PURPOSE,
  startScenario: process.env.NOVEL_STARTING_SCENARIO,
  setting: process.env.NOVEL_SETTING, 
  plot: process.env.NOVEL_PLOT,
  lesson: process.env.NOVEL_LESSON,
  ending: process.env.NOVEL_ENDING,
  extraInfo: process.env.NOVEL_EXTRA_INFORMATION,
  numberOfChapters: parseInt(process.env.NUMBER_OF_CHAPTERS),
  chapterWordLength: parseInt(process.env.CHAPTER_WORD_LENGTH)
}

function processText(text) {
  // Remove leading and trailing spaces
  text = text.trim();

  // Split the text into an array of paragraphs
  let paragraphs = text.split('\n');

  // Remove leading and trailing spaces from each paragraph
  paragraphs = paragraphs.map(p => p.trim());

  // Remove empty strings from the array
  paragraphs = paragraphs.filter(p => p !== '');

  return paragraphs;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function returnPrompt(novelInformation){

  let storySummary = `a main character named ${novelInformation.mainName} whose personality is 
  ${novelInformation.mainPersonality}. Make sure that the main character ${novelInformation.mainName} 
  acts in a manner that is consistent with his personality. 

  The main character ${novelInformation.mainName} lives in ${novelInformation.setting}. His purpose is
  ${novelInformation.mainPurpose}. The story begins with ${novelInformation.startScenario}.

  For the plot of the story, make sure that ${novelInformation.plot}. The main lesson of the story is 
  that ${novelInformation.lesson}.

  As extra information about the story, it is important to remember that ${novelInformation.extraInfo}`


  let firstChapterPrompt = `Write the first chapter of a story about ${storySummary}. 

  Make sure to randomly generate vivid descriptions, the specific name of the location for the setting inside of 
  the provided world, and to provide the names of the side-characters that the main character interacts with for
  this chapter. Make sure to end this chapter on a subtle cliff hanger. 

  You should assume that this story will have a total of ${novelInformation.numberOfChapters} chapters and that 
  each chapter should be ${novelInformation.chapterWordLength} words long. Make sure to slow down the pacing of the story 
  with the assumption that it will last for ${novelInformation.numberOfChapters} chapters. For the ending, assume that 
  ${novelInformation.mainName} will ${novelInformation.ending}. However, DO NOT include this information in 
  the chapter. This is just context for when you're writing the first chapter. Make sure to include a chapter title.`

  //console.log(novelInformation.currentChapterNumber)
  if (novelInformation.currentChapterNumber == 1)
  {
    return firstChapterPrompt;
  }

  let continuedChapterInstructions = `These were the previous chapters of the story (for a maximum of up to three previous chapters remembered): ###`

  let continuedChaptersPrompt = `Aim to continue the next chapter of this story about ${storySummary}. 
  
  This is chapter number ${novelInformation.currentChapterNumber}. Make sure to include a chapter title with the current chapter number.
  
  Make sure to have continuity with the plot of the story, make sure that the main character acts in a manner 
  that is consistent with his personality, to randomly generate vivid descriptions, and to include the specific names of the main character, 
  side characters, and locations when they need to be used. Also end this chapter on a subtle cliff hanger. 
  This is chapter number ${novelInformation.currentChapterNumber} of the story.

  You should assume that this story will have a total of ${novelInformation.numberOfChapters} chapters and that 
  each chapter should be ${novelInformation.chapterWordLength} words long. Make sure to slow down the pacing of the story 
  with the assumption that it will last for ${novelInformation.numberOfChapters} chapters. For the ending, assume that 
  ${novelInformation.mainName} will ${novelInformation.ending}. However, DO NOT include this information in 
  the chapter. This is just context for when you're writing the current chapter.`

  for (let i=1; i < novelInformation.currentChapterNumber; i++) {
    
    if (novelInformation.currentChapterNumber>4){
      if (i<novelInformation.currentChapterNumber-4){
        continue;
      }
    }
    else {
      if (i>4){
        break;
      }
    }

    let pastChapterArray = novelInformation[`ChapterNumber${i}`];
    //console.log(`PAST CHAPTER ARRAY: ${pastChapterArray}`);
    let pastChapter = "";

    for (let j = 0; j < pastChapterArray.length; j++) {
      pastChapter += pastChapterArray[j] + " ";
    }

    continuedChapterInstructions += pastChapter;    
  }

  continuedChapterInstructions += "###";

  continuedChaptersPrompt += continuedChapterInstructions;

  //console.log(continuedChapterInstructions);

  return continuedChaptersPrompt;
}


async function loopNewChapters(){
  for (let currentChapter = 1; currentChapter <= novelInfo.numberOfChapters; currentChapter++) {

    novelInfo.currentChapterNumber = currentChapter;

    await useOpenAiApi(novelInfo).then((res) => 
    {
      console.log(processText(res.data.choices[0].text));
      novelInfo[`ChapterNumber${novelInfo.currentChapterNumber}`] = processText(res.data.choices[0].text);
      sleep(1000);
    });  
  }
  return novelInfo;
}

async function useOpenAiApi(novelInformation){

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  
  return openai.createCompletion({
    model: "text-davinci-003",
    prompt: returnPrompt(novelInformation),
    max_tokens: 750,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
}

//loopNewChapters();
export { loopNewChapters };