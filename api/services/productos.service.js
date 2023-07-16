const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

// Definimos una clase
class Product{

  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => {throw new Error(err)});
  }

  async find(){
    try {
      const query = `select name as Producto,
      description as Descripcion,
      precie as Precio from products`;
      const rta = await pool.query(query);
      return rta.rows;
    } catch (error) {
      throw boom.badRequest("Invalid get all products");
    }
  }

  async findOne(id){
    try {
      const query = `select name as Producto,
                    description as Descripcion,
                    precie as Precio from products where product_id = $1`;
      const rta = await pool.query(query, [id]);
      return rta.rows;
    } catch (error) {
      throw boom.badRequest("Invalid get one product");
    }

  }

  async create(data){
    try {
      const {name, description, precie} = data;
      const values = [name, description, precie]
      const query = `insert into products
                     (name, description, precie)
                     values($1,$2,$3)`;
      const rta = await this.pool.query(query, values);
      console.log(rta)
      if (rta.rowCount === 1) {
        const newProducts = await this.find()
        return newProducts[newProducts.length - 1 ];
      }
      return rta.rowCount;

    } catch (error) {
      throw boom.badRequest("Invalid created: "+ error);
    }

  }

  async update(id, data){
    try {
      const {name, description, precie} = data;
      const values = [name, description, precie, id]
      const query = `UPDATE products SET
                          name = $1,
                          description = $2,
                          precie = $3
                          WHERE product_id = $4`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        const updateProduct = await this.findOne(id)
        return updateProduct;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest("Invalid Update " + error);
    }

  }

  async delete(id){
    try {
      const deleteProduct = await this.findOne(id);
      const query = `delete from products where product_id = $1`;
      const rta = await this.pool.query(query, [id]);
      if (rta.rowCount === 1) {
        return deleteProduct;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest("Invalid delete");
    }

  }
}

module.exports = Product;
