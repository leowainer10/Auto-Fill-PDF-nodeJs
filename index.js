const { PDFDocument } = require('pdf-lib');
const { readFile , writeFile } = require('fs/promises');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const dotenv = require('dotenv');
dotenv.config();
async function createPdf(input, output) {

    try{
    const pdfDoc = await PDFDocument.load(await readFile(input));

    //Printa no terminal todos os nomes dos campos do Formulario
    
    // const fieldNames = pdfDoc.getForm().getFields().map(f => f.getName());

    // fieldNames.forEach(element =>{
    //     console.log(element);
    // });

    //Lorem Ipsum para preencher campos MultiLinhas

    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
    });

    //Atribui valor para os FormFields

    const form = pdfDoc.getForm();
    
    form.getTextField('Nome').setText(`${process.env.Nome}`)
    form.getTextField('Email').setText(`${process.env.Email}`)
    form.getTextField('End_Entrega').setText(`${process.env.End_Entrega}`)
    form.getTextField('Vendedor').setText(`${process.env.Vendedor}`)
    form.getTextField('Gerente').setText(`${process.env.Gerente}`)
    form.getTextField('Data').setText(`${process.env.Data}`)
    form.getTextField('Data_Validade').setText(`${process.env.data_validade}`)
    form.getTextField('n_orcamento').setText(`${process.env.n_orcamento}`)
    form.getTextField('descricao').setText(lorem.generateParagraphs(5))
    
    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);
    console.log('PDF Created');

    }catch(err) {
        console.log(err.message)
    }

}

createPdf(`${process.env.BASE_FILE}`, `contratoId${process.env.n_orcamento}.pdf`)