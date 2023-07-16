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
      const query = `select name as Categoria,
      description as Descripcion
      from category`;
      const rta = await pool.query(query);
      return rta.rows;
    } catch (error) {
      throw boom.badRequest("Invalid get all category");
    }
  }

  async findOne(id){
    try {
      const query = `select name as Categoria,
                    description as Descripcion
                    from category where category_id = $1`;
      const rta = await pool.query(query, [id]);
      if (rta.rowCount === 1) {
        return rta.rows;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest("Invalid get one category");
    }

  }

  async create(data){
    try {
      const {name, description} = data;
      const values = [name, description]
      const query = `insert into category
                     (name, description)
                     values($1,$2)`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        const newcategory = await this.find()
        return newcategory[newcategory.length - 1 ];
      }
      return rta.rowCount;

    } catch (error) {
      throw boom.badRequest("Invalid created: "+ error);
    }

  }

  async update(id, data){
    try {
      const {name, description} = data;
      const values = [name, description, id]
      const query = `UPDATE category SET
                          name = $1,
                          description = $2
                          WHERE category_id = $3`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        const updateCategory = await this.findOne(id)
        return updateCategory;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest("Invalid Update " + error);
    }

  }

  async delete(id){
    try {
      const deleteCategory = await this.findOne(id);
      const query = `delete from category where category_id = $1`;
      const rta = await this.pool.query(query, [id]);
      if (rta.rowCount === 1) {
        return deleteCategory;
      }
      return rta.rowCount;
    } catch (error) {
      throw boom.badRequest("Invalid delete");
    }

  }
}

module.exports = Pedidos;
