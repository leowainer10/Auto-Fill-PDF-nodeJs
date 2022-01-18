const { PDFDocument } = require('pdf-lib');
const { readFile , writeFile } = require('fs/promises');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;


async function createPdf(input, output) {

    try{
    const pdfDoc = await PDFDocument.load(await readFile(input));

    //Printa no terminal todos os nomes dos campos do Formulario
    const fieldNames = pdfDoc.getForm().getFields().map(f => f.getName());

    fieldNames.forEach(element =>{
        console.log(element);
    });

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
    
    form.getTextField('n_contrato').setText('00001')
    form.getTextField('resp_venda').setText('Vendedor Y')
    form.getTextField('loja').setText('Empresa X')
    form.getTextField('data_contrato').setText('19/01/2022')
    form.getTextField('tipo_contrato').setText('Normal')
    form.getTextField('cpf_cnpj').setText('00000000000')
    form.getTextField('rg_inscEst').setText('000000000')
    form.getTextField('data_nasc').setText('19/11/1999')
    form.getTextField('endereco_atual').setText('Rua Node JS')
    form.getTextField('bairro').setText('Jardim PDF')
    form.getTextField('cidade').setText('JavaScript')
    form.getTextField('uf').setText('JS')
    form.getTextField('cep').setText('')
    form.getTextField('telefone').setText('')
    form.getTextField('email').setText('')
    form.getTextField('cliente_contratante').setText('Leonardo Wainer')
    form.getTextField('ambiente1').setText(lorem.generateParagraphs(8))
    form.getTextField('ambiente2').setText(lorem.generateParagraphs(3))
    
    const pdfBytes = await pdfDoc.save();

    await writeFile(output, pdfBytes);
    console.log('PDF Created');


    }catch(err) {}

}

createPdf('arquivo.pdf', 'arquivoPreenchido.pdf')