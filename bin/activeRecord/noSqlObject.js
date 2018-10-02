const Inflector = require('inflector-js');
const dbCollection = require('../mongo');
const schema = require('./schema');
const { ObjectId } = require('mongodb');
const schemaValidation = require('./schemaValidation');

class NoSQLObject {

  // Class
  static documentName() {
    return Inflector.pluralize(this.name);
  }

  static async db() {
    const collection = this.documentName();
    const db = await dbCollection(collection);
    return db;
  }

  // Instance

  constructor(params) {
    this.setSchema();
    this.defineAttributes();
    this.assignAttributes(params);
    this.defineAttrAccessor();
  }

  setSchema() {
    this.schema = schema[this.constructor.documentName()] || null;
  }

  defineAttributes() {
    const { schema } = this;
    let attributes = {};
    if (schema) {
      const attrs = Object.keys(schema);
      attrs.forEach(attr => attributes[attr] = null);
      attributes['_id'] = null;
      Object.preventExtensions(attributes);
      this.enforceAttrs = true;
      this.attributes = attributes;
    } else {
      this.enforceAttrs = false;
      this.attributes = {};
      this.attributes['_id'] = null;
    }
  }

  assignAttributes(params) {
    const { attributes } = this;
    Object.keys(params).forEach(attr => {
      if (!attributes.hasOwnProperty(attr) && this.enforceAttrs) {
        throw `Unknown attribute ${attr} for ${this.documentName()}`;
      }
      attributes[attr] = params[attr];
    });
  }

  defineAttrAccessor() {
    Object.keys(this.attributes).forEach(attr => {
      this[attr] = value => {
        if (!value) return this.attributes[attr];
        return this.attributes[attr] = value;
      }
    });
  }

  checkSchemaConstraints() {
    if (!this.enforceAttrs) {
      console.log(`No schema found for ${this.constructor.name}. Define one in the schema directory to enforce attributes.`);  
      return true;
    }
    return schemaValidation(this);
  }

  async insert() {
    const db = await this.constructor.db();
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
    const db = await this.constructor.db();
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

  async destroy() {
    const db = await this.constructor.db();
    await db.deleteOne({ _id: ObjectId(this._id) });
  }
}

module.exports = NoSQLObject;