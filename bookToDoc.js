//WORK IN PROGRESS. FOCUS FOR NOW ON IMPROVING THE CONTENT & EXPORTING WITH TXT! DOC EXPORTING IS NOT A PRIORITY

/*
import  { loopNewChapters } from './bookGenerator.js';
import pkg from 'docx';
const {Document, Packer} = pkg;
import fs from 'fs'



async function main() {


    let novelInfo = await loopNewChapters();
    //console.log(novelInfo);


    // Create a new instance of Document for the docx module
    let doc = new Document();

    doc.theme = {
        font: {
        normal: {
            family: "Calibri",
            color: "000000"
        },
        header: { family: "Calibri" }
        },
        title: {
        color: "000000"
        },
        headings: {
        one: {
            color: "000000"
        },
        two: {
            color: "000000"
        }
        }
    };
    
    
    //-------------------------------------------------------------------------------------------------------------------------------------
    //TEXT STYLING TYPES (EX. CUSTOM NORMAL & CUSTOM NORMAL CENTRE), ALIGNMENT, 
    //SPACING, FONT SIZING (DIVIDE SIZE NUMBER BY 2 FOR ACTUAL TRANSLATED FONT SIZE) ETC.
    doc.Styles.createParagraphStyle("customHeading", "Custom Heading")
        .basedOn("Heading 1")
        .next("Normal")
        .quickFormat()
        .font(doc.theme.font.header.family)
        .size(30)
        .bold()
        .color(doc.theme.headings.one.color)
        .center()
        .spacing({ after: 250 });
    doc.Styles.createParagraphStyle("customTitle", "Custom Title")
        .basedOn("Title")
        .next("Normal")
        .quickFormat()
        .font(doc.theme.font.header.family)
        .size(28)
        .bold()
        .color(doc.theme.font.normal.color)
        .spacing({ after: 250 });
    doc.Styles.createParagraphStyle("customNormal", "Custom Normal for Body")
        .basedOn("Normal")
        .quickFormat()
        .font(doc.theme.font.normal.family)
        .size(24)
        .color(doc.theme.font.normal.color)
        .spacing({ after: 195 });
    
    
    //-------------------------------------------------------------------------------------------------------------------------------------
    //THE ACTUAL TEXT IN THE DOC!!! ADD VARIABLES OR SPACES HERE!!! 
    
    doc.createParagraph(`The Story Of {${novelInfo.mainName}}`).style("customHeading");
    
    for (let i=0; i < novelInfo.numberOfChapters; i++) {
        let currentChapter = novelInfo[`ChapterNumber${i}`];

        for (let j=0; j < currentChapter.length; j++) {

            if (j==0) {
                doc.createParagraph(`${currentChapter[j]}`).style("customTitle"); 
            }

            doc.createParagraph(`${currentChapter[j]}`).style("customNormal");
        }
    }

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`story Of ${novelInfo.mainName}.docx`, buffer);
    });
    //writeToDocument((doc, `story Of ${novelInfo.mainName}.docx`))
}

main();*/

/*
function writeToDocument(doc, fileName) {
    // Create new instance of Packer for the docx module
    const packer = new Packer();
    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    // Create a Blob containing the Document instance and the mimeType
    packer.toBlob(doc).then(blob => {
      const docblob = blob.slice(0, blob.size, mimeType);
  
      // write to document
      fs.writeFileSync(fileName, docblob);
    });
}*/

    /*loopNewChapters().then((novelInfo) => {
        console.log(novelInfo);
      });*/