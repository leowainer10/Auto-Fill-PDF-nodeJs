const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const dotenv = require("dotenv");
dotenv.config();
const defaultFields = [
  'n_contrato',
  'resp_venda',
  'loja',
  'data_contrato',
  'tipo_contrato',
  'cpf_cnpj',
  'rg_inscEst',
  'data_nasc',
  'endereco_atual',
  'bairro',
  'cidade',
  'uf',
  'cep',
  'telefone',
  'email',
  'cliente_contratante',
]

async function createPdf(input, output) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));
    // pdf

    //Printa no terminal todos os nomes dos campos do Formulario

    // const fieldNames = pdfDoc.getForm().getFields().map(f => f.getName());
    // fieldNames.forEach(element =>{
    //     console.log(element);
    // });

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
