class usersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age }) {
    this.storage[id] = { id, firstName, lastName, email, age };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

module.exports = new usersStorage();
