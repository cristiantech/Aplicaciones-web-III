const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

// Definimos una clase
class Pedidos{
  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => {throw new Error(err)});
  }

  async find(){
    try {
      const query = `select ord.state as Estado, us.firstname as Usuario
                     from orders as ord join users as us on ord.user_id = us.user_id`;
      const rta = await pool.query(query);
      return rta.rows;
    } catch (error) {
      throw boom.badRequest(`Ins not valid query:  ${query}`);
    }


  }

  async findOne(id){
    try {
      const query = `select ord.state as Estado, us.firstname as Usuario
                     from orders as ord
                     join users as us on ord.user_id = us.user_id
                     where order_id = $1`;
      const rta = await pool.query(query, [id]);
      if (rta.rowCount === 1) {
        return rta.rows;
      }
      return rta.rowCount
    } catch (error) {
      throw boom.badRequest(`Invalid get one order ${error}`);
    }

  }

  async create(data){
    try {
      const {state, user_id} = data;
      const values = [state, user_id]
      const query = `insert into orders
                     (state, user_id)
                     values($1,$2)`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        const newOrder = await this.find()
        return newOrder[newOrder.length - 1 ];
      }
      return rta.rowCount;

    } catch (error) {
      throw boom.badRequest(`Invalid created:  ${error}`);
    }

  }

  async update(id, data){
    try {
      const {state, user_id} = data;
      const values = [state, user_id, id]
      const query = `UPDATE orders SET
                          state = $1,
                          user_id = $2
                          WHERE order_id = $3`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        const updateOrder = await this.findOne(id)
        return updateOrder;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest(`Invalid Update ${error}`);
    }

  }

  async delete(id){
    try {
      const deleteOrder = await this.findOne(id);
      const query = `delete from orders where order_id = $1`;
      const rta = await this.pool.query(query, [id]);
      if (rta.rowCount === 1) {
        return deleteOrder;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest(`this is invalid query: ${error}`);
    }

  }
}

module.exports = Pedidos;
