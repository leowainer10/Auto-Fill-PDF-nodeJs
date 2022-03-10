import { PDFDocument } from "pdf-lib";
import { readFile, writeFile } from "fs/promises";
import { LoremIpsum } from "lorem-ipsum";
import { config } from "dotenv";
config();

async function createPdf(input, output) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));
    // pdf
    
    //Printa no terminal todos os nomes dos campos do Formulario
    
    // const fieldNames = pdfDoc.getForm().getFields().map(f => f.getName());
    // fieldNames.forEach(element =>{
      //     console.log(element);
      // });
      
      const defaultFields = pdfDoc.getForm().getFields().map(f => f.getName());
      console.log (defaultFields)

      //Lorem Ipsum para preencher campos MultiLinhas

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    //Atribui valor para os FormFields

    const form = pdfDoc.getForm();

     
    defaultFields.forEach(field => {
      const value = process.env[field];
      form.getTextField(field).setText(value);
    });

    form.getTextField("ambiente1").setText(lorem.generateParagraphs(8));
    form.getTextField("ambiente2").setText(lorem.generateParagraphs(3));

    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);
    console.log("PDF Created");
  } catch (err) {
    console.log(err.message);
  }
}

createPdf(
  `${process.env.BASE_FILE}`,
  `contratoId${process.env.n_contrato}.pdf`
);
