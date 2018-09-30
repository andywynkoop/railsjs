const Inflector = require('inflector-js');
const dbCollection = require('../mongo');
const schema = require('./schema');
const { ObjectId } = require('mongodb');
const schemaValidation = require('./schemaValidation');

class NoSQLObject {
  static columns() {
    let name = this.documentName();
    let tableSchema = schema[name];
    if (tableSchema) return Object.keys(tableSchema);
    else {
      return false;
    }
  }

  static documentName() {
    return Inflector.pluralize(this.name);
  }

  static async db() {
    const collection = this.documentName();
    const db = await dbCollection(collection);
    return db;
  }

  static async all() {
    const db = await this.db();
    const records = await db.find().sort({ _id: 1 }).toArray();
    return records.map(record => new this(record));
  }

  static async find(id) {
    const db = await this.db();
    const record = await db.findOne({ _id: ObjectId(id) });
    if (record) return new this(record);
    return null;
  }

  static async findBy(params) {
    const db = await this.db();
    const record = await db.findOne(params);
    if (record) return new this(record);
    return null;
  }

  static async where(params) {
    const db = await this.db();
    const records = await db.find(params).sort({ _id: 1 }).toArray();
    return records.map(record => new this(record));
  }

  static async first() {
    let all = await this.all();
    return all[0];
  }

  static async second() {
    let all = await this.all();
    return all[1];
  }

  static async third() {
    let all = await this.all();
    return all[2];
  }

  static async fourth() {
    let all = await this.all();
    return all[3];
  }

  static async fifth() {
    let all = await this.all();
    return all[4];
  }

  static async last() {
    let all = await this.all();
    return all.slice(-1)[0];
  }

  constructor(params) {
    this.defineAttributes();
    this.setSchema();
    const { attributes } = this;
    Object.keys(params).forEach(attr => {
      if (!attributes.hasOwnProperty(attr) && this.enforceAttrs) throw `Unknown attribute ${attr} for ${this.documentName()}`;
      attributes[attr] = params[attr];
    });

    Object.keys(attributes).forEach(attr => {
      this[attr] = value => {
        if (!value) return this.attributes[attr];
        return this.attributes[attr] = value;
      }
    });

    this.insert = this.insert.bind(this);
  }

  defineAttributes() {
    let attributes = {};
    this.columns = this.constructor.columns()
    const { columns } = this;
    if (columns) {
      columns.forEach(col => {
        attributes[col] = null;
      });
      attributes['_id'] = null;
      Object.preventExtensions(attributes);
      this.enforceAttrs = true;
      this.attributes = attributes;
    } else {
      // no schema defined
      this.enforceAttrs = false;
      this.attributes = {};
      this.attributes['_id'] = null;
    }
  }

  setSchema() {
    this.schema = schema[this.constructor.documentName()] || null;
  }

  checkSchemaConstraints() {
    if (!this.schema) {
      console.log(`No schema found for ${this.constructor.name}. Define one in the schema directory to enforce attributes.`);  
      return true;
    }
    return schemaValidation(this);
  }

  async insert() {
    const collection = this.constructor.documentName();
    const db = await dbCollection(collection);
    const response = await db.insertOne( this.attributes );
    const { insertedId } = response;
    if (insertedId) {
      this["_id"](insertedId);
      return this;
    } else {
      return false;
    }
  }

  async update() {
    const collection = this.constructor.documentName();
    const db = await dbCollection(collection);
    const query = { _id: ObjectId(this["_id"]()) };
    const response = await db.findOneAndUpdate(query, { $set: this.attributes });
    const { value } = response;
    if (value) return this;
    return false;
  }

  async save() {
    const errors = this.checkSchemaConstraints();
    if (errors.empty) {
      if (this.attributes._id) return this.update();
      return this.insert();
    } else {
      this.errors = errors;
      return false;
    }
  }

}

module.exports = NoSQLObject;