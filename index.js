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
    
    form.getTextField('n_contrato').setText(`${process.env.n_contrato}`)
    form.getTextField('resp_venda').setText(`${process.env.resp_venda}`)
    form.getTextField('loja').setText(`${process.env.loja}`)
    form.getTextField('data_contrato').setText(`${process.env.data_contrato}`)
    form.getTextField('tipo_contrato').setText(`${process.env.tipo_contrato}`)
    form.getTextField('cpf_cnpj').setText(`${process.env.cpf_cnpj}`)
    form.getTextField('rg_inscEst').setText(`${process.env.rg_inscEst}`)
    form.getTextField('data_nasc').setText(`${process.env.data_nasc}`)
    form.getTextField('endereco_atual').setText(`${process.env.endereco_atual}`)
    form.getTextField('bairro').setText(`${process.env.bairro}`)
    form.getTextField('cidade').setText(`${process.env.cidade}`)
    form.getTextField('uf').setText(`${process.env.uf}`)
    form.getTextField('cep').setText(`${process.env.cep}`)
    form.getTextField('telefone').setText(`${ process.env.telefone}`)
    form.getTextField('email').setText(`${process.env.email}`)
    form.getTextField('cliente_contratante').setText(`${process.env.cliente_contratante}`)
    form.getTextField('ambiente1').setText(lorem.generateParagraphs(8))
    form.getTextField('ambiente2').setText(lorem.generateParagraphs(3))
    
    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);
    console.log('PDF Created');

    }catch(err) {
        console.log(err.message)
    }

}

createPdf(`${process.env.BASE_FILE}`, 'arquivoPreenchido.pdf')