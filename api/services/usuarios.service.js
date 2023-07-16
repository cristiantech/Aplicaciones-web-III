
const pool = require('../libs/postgres.pool');

// Definimos una clase
class Usuarios{

  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => {throw new Error(err)});
  }

  async find(){
    try {
      const query = `select firstname as nombre,
      lastname as apellido,
      email as correo from users`;
      const rta = await pool.query(query);
      return rta.rows;
    } catch (error) {
      throw new Error("Error: "+ error);
    }
  }

  async findOne(id){
    try {
      const query = `select firstname as nombre,
                          lastname as apellido,
                          email as correo
                          from users where user_id = $1`;
      const rta = await pool.query(query, [id]);
      return rta.rows;
    } catch (error) {
      throw new Error("Error: "+ error);
    }

  }

  async login(user, pass){
    try {
      const values = [user, pass]
      const query = `select firstname as nombre,
                     lastname as apellido,
                     email as correo
                     from users where email = $1 AND password = $2`;
      const rta = await this.pool.query(query, values);
      if (rta.rowCount === 1) {
        return rta.rows;
      }
      return rta.rowCount;
    } catch (error) {
      throw new Error("Error: "+ error);
    }

  }

  async create(data){
    try {
      const {firstname, lastname, email, password} = data;
      const values = [firstname, lastname, email, password]
      const query = `insert into users (firstname, lastname, email, password)
                     values($1,$2,$3,$4)`;
      const rta = await this.pool.query(query, values);
      console.log(rta)
      if (rta.rowCount === 1) {
        const totat = await this.find()
        return totat[totat.length - 1 ];
      }
      return rta.rowCount;

    } catch (error) {
      throw new Error(error);
    }

  }

  async update(id, data){
      const {firstname, lastname, email, password} = data;
      const values = [firstname, lastname, email, password, id]
      const query = `UPDATE users SET
                          firstname = $1,
                          lastname = $2,
                          email = $3,
                          password = $4
                          WHERE user_id = $5`;
    const rta = await this.pool.query(query, values);
    if (rta.rowCount === 1) {
      const updateUser = await this.findOne(id)
      return updateUser;
    }
    return rta.rowCount;
  }

  async delete(id){
    const deleteUser = await this.findOne(id);
    const query = `delete from users where user_id = $1`;
    const rta = await this.pool.query(query, [id]);
    if (rta.rowCount === 1) {
      return deleteUser;
    }
    return rta.rowCount;
  }

}


module.exports = Usuarios;
