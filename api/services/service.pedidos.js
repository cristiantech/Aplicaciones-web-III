
const pool = require('../libs/postgres.pool');

// Definimos una clase
class Pedidos{

  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => {throw new Error(err)});
  }

  async find(){
    const query = "select * from pedidos";
    const rta = await pool.query(query);
    return rta.rows;

  }
  async findOne(id){
    const query = "select * from pedidos";
    const rta = await pool.query(query);
    return rta.rows.find(pe => pe.pedidoid === id);
  }

  async create(data){
    const query = `insert into pedidos (fecha, estado, userid) values('${data.fecha}','${data.estado}', ${data.userid})`;
    const rta = await this.pool.query(query);
    const totat = await this.find()
    return totat[totat.length - 1 ];
  }

  async update(id, data){
    const query = `update pedidos set  where pedidoid = ${id}`;
    const rta = await this.pool.query(query);
    const totat = await this.find()
    return totat[totat.length - 1 ];
  }

  async delete(id){

  }

}

module.exports = Pedidos;
