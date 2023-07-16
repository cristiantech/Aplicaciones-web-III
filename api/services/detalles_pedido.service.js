const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

// Definimos una clase
class DetailPedidos{

  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => {throw new Error(err)});
  }

  async find(){
    try {
      const query = `select ord.state as Estado, pr.name as Producto,
                     dor.quantity as Cantidad, dor.observation as Observaciones
                     from detail_order as dor
                     join orders as ord on dor.order_id = ord.order_id
                     join products as pr on dor.product_id = pr.product_id`;
      const rta = await pool.query(query);
      if (rta.rowCount > 0) {
        return rta.rows;
      }
      return rta.rowCount
    } catch (error) {
      throw boom.badRequest(`Ins not valid query:  ${query}`);
    }


  }

  async findOne(id){
    try {
      const query = `select ord.state as Estado, pr.name as Product,
                      dor.quantity as Cantidad, dor.observation as Observaciones
                      from detail_order as dor
                      join orders as ord on dor.order_id = ord.order_id
                      join products as pr on dor.product_id = pr.product_id
                      where detail_order_id = $1`;
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
      const {order_id, product_id, quantity, observation} = data;
      const values = [order_id, product_id, quantity, observation]
      const query = `insert into detail_order
                     (order_id, product_id, quantity, observation)
                     values($1,$2,$3,$4)`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        const newDeatilOrder = await this.find()
        return newDeatilOrder[newDeatilOrder.length - 1 ];
      }
      return rta.rowCount;

    } catch (error) {
      throw boom.badRequest(`Invalid created:  ${error}`);
    }

  }

  async update(id, data){
    try {
      const {order_id, product_id, quantity, observation} = data;
      const values = [order_id, product_id, quantity, observation, id]
      const query = `UPDATE detail_order SET
                            order_id = $1,
                            product_id = $2,
                            quantity = $3,
                            observation = $4
                            WHERE detail_order_id = $5`;
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
      const deleteDetailOrder = await this.findOne(id);
      const query = `delete from detail_order where detail_order_id = $1`;
      const rta = await this.pool.query(query, [id]);
      if (rta.rowCount === 1) {
        return deleteDetailOrder;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest(`this is invalid query: ${error}`);
    }

  }

}

module.exports = DetailPedidos;
