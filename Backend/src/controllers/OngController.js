const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
    /*seleciona todas as ongs em connection */
       
        const ongs = await connection('ongs').select('*'); 
       
        return response.json(ongs);
    },

    async create(request, response) {
    /*Definicao da funcao como assincrona*/

    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX'); /* Gera 4Bytes de caracteres hexadecimais, atribuindo a um id*/

    await connection('ongs').insert({  /*await para esperar atribuir os dados no BD, para retornar */
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return response.json({ id });
    }
};