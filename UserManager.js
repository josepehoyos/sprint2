const fs = require('fs');
const path = require('path');

class UserManager {
  constructor() {
    this.dataFolder = path.join(__dirname, 'data');
    this.usersFilePath = path.join(this.dataFolder, 'users.json');

    if (!fs.existsSync(this.dataFolder)) {
      fs.mkdirSync(this.dataFolder);
    }

    if (!fs.existsSync(this.usersFilePath)) {
      fs.writeFileSync(this.usersFilePath, '[]');
    }

    this.users = this.loadFromJson();
  }

  create(data) {
    const user = {
      id: this.users.length === 0 ? 1 : this.users[this.users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    this.users.push(user);
    this.saveToJson();

    console.log('Usuario creado:', user);
  }

  read() {
    console.log('Listado de Usuarios:', this.users);
    return this.users;
  }

  readOne(id) {
    const foundUser = this.users.find((user) => user.id === Number(id));
    console.log('Usuario encontrado:', foundUser);
    return foundUser;
  }

  loadFromJson() {
    const jsonData = fs.readFileSync(this.usersFilePath, 'utf-8');
    return JSON.parse(jsonData);
  }

  saveToJson() {
    fs.writeFileSync(this.usersFilePath, JSON.stringify(this.users, null, 2));
  }
}




