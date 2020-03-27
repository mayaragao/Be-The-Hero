/*
* Rota // Recurso
*
* Metodos HTTP:
*
* GET - Buscar uma informacao no back-end
* POST: Criar uma informação no back-end
* PUT: Alterar uma informaçao no back-end
* DELETE: Deletar uma informação no back-end
*
*Tipos de parametros:
*
* Query Params: Parametros nomeados enviados na rota após (?). Geralmente eles servem para
* filtros, paginação...
*
* Route Params: Parametros utilizados para identificar recursos
*
* Request Body: Aquilo que sobra, o corpo da requisição utilizado
* para criar ou alterar recursos.
*
*/


const express = require('express'); /*pacote*/
const cors = require('cors'); /*importacao do modulo para seguranca */
const routes = require('./routes'); /*arquivo*/

const app = express();

app.use(cors(
    /* {origin: 'http://meuapp.com'} => define qual endereco vai poder acessar a aplicacao. No caso de botar para rodar */
));
app.use(express.json()); 
app.use(routes);

app.listen(3333);
