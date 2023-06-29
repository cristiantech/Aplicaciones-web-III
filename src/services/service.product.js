const {faker} = require("@faker-js/faker");
const boom = require('@hapi/boom');

// Definimos una clase
class Product{

  constructor(){
    this.product = [];
    this.generate();
  }

  generate(){
    let limit = 100;
    for (let i = 0; i < limit; i++) {
      this.product.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        precie: faker.commerce.price(),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  find(){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(this.product)
      }, 5000);
    });
  }
  async findOne(id){
    const prducto = this.product.find(pr => pr.id === id);
    if(!prducto){
      throw boom.notFound("Product not found");
    }
    return prducto;
  }

  async create(data){
    // Validamr Información
    //const {name, lastName, precie, image} = data;

    const newProduct = {
      id: faker.string.uuid(),
      data
    }
    this.product.push(newProduct);
    return newProduct;
  }

  async update(id, data){
    const indexProduct = this.product.findIndex(pr => pr.id === id);
    if (indexProduct === -1) {
      // throw new Error("this product is not exist");
      throw boom.notFound("Product not found");
    }
    const cpProducts = this.product[indexProduct];
    this.product[indexProduct] = {
      ...cpProducts,
      ...data
    }
    return this.product[indexProduct];
  }

  async delete(id){
    const indexProduct = this.product.findIndex(pr => pr.id === id);
    if (indexProduct === -1) {
      // throw new Error("this product is not exist");
      throw boom.notFound("Product not found");
    }
    return this.product.splice(indexProduct, 1);
  }

}

module.exports = Product;
