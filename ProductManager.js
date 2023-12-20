const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.dataFolder = path.join(__dirname, 'data');
    this.productsFilePath = path.join(this.dataFolder, 'products.json');

    if (!fs.existsSync(this.dataFolder)) {
      fs.mkdirSync(this.dataFolder);
    }

    if (!fs.existsSync(this.productsFilePath)) {
      fs.writeFileSync(this.productsFilePath, '[]');
    }

    this.products = this.loadFromJson();
  }

  create(data) {
    const product = {
      id: this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    this.products.push(product);
    this.saveToJson();

    console.log('Producto creado:', product);
  }

  read() {
    console.log('Listado de Productos:', this.products);
    return this.products;
  }

  readOne(id) {
    const foundProduct = this.products.find((product) => product.id === Number(id));
    console.log('Producto encontrado:', foundProduct);
    return foundProduct;
  }

  loadFromJson() {
    const jsonData = fs.readFileSync(this.productsFilePath, 'utf-8');
    return JSON.parse(jsonData);
  }

  saveToJson() {
    fs.writeFileSync(this.productsFilePath, JSON.stringify(this.products, null, 2));
  }
}




