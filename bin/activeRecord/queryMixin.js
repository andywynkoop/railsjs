const { ObjectId } = require('mongodb');

module.exports = {
  async all() {
    const db = await this.db();
    const records = await db.find().sort({ _id: 1 }).toArray();
    return records.map(record => new this(record));
  },

  async find(id) {
    const db = await this.db();
    const record = await db.findOne({ _id: ObjectId(id) });
    if (record) return new this(record);
    return null;
  },

  async findBy(params) {
    const db = await this.db();
    const record = await db.findOne(params);
    if (record) return new this(record);
    return null;
  },

  async where(params) {
    const db = await this.db();
    const records = await db.find(params).sort({ _id: 1 }).toArray();
    return records.map(record => new this(record));
  },

  async first() {
    let all = await this.all();
    return all[0];
  },

  async last() {
    let all = await this.all();
    return all.slice(-1)[0];
  },

  async destroyAll() {
    const db = await this.db();
    db.deleteMany();
  }
}
