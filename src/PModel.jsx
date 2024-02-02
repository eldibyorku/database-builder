// PModel.js
import mongoose from "mongoose";

const generateDynamicModel = (tableName, fields) => {
  const mongooseFields = fields.reduce((acc, field) => {
    acc[field.name] = {
      type: field.type,
      required: true, // You can customize this based on your needs
    };
    return acc;
  }, {});

  const mongooseSchema = new mongoose.Schema(mongooseFields);

  return mongoose.model(tableName, mongooseSchema);
};

export default generateDynamicModel;
