const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count()
        /* contador a qtd total de incidents*/

        const incidents = await connection('incidents')
            .join('ongs' , 'ongs.id', '=', 'incidents.ong_id' ) /*trazendo dados da tabela ongs dos quais ong_id = id na tabela ong */
            .limit( 5 )
            .offset( (page - 1) * 5 ) /* paginação */
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request,response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; 
        /*guarda informacoes do contexto da requisição, do
        * cabeçalho da requisição como autenticacao do usuario,
        * dados sobre o idioma, etc
        * OBS: Queremos o login da Ong_id que faz a requisicao*/

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        /* se const result = await... ->
        * const id = result[0];
        * pois adiciona um unico registro */

        return response.json( {id} );
    },

    async delete(request,response) {
        const { id } = request.params; 
        /*pega o parametro do endereco*/
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); /*para retornar apenas um resultado*/

        if (incident.ong_id != ong_id ){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
        /*status 204: Retornar uma resposta pro front-end
        * que nao tem conteudo. */
    }
};