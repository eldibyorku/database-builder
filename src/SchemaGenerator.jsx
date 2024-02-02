import mongoose from "mongoose";

export const generateGraphQLSchemaa = (tableName, fields) => {
  const graphqlFields = fields
    .map((field) => `${field.name}: ${field.type}`)
    .join("\n");
  const graphqlSchema = `
      type ${tableName} {
        ${graphqlFields}
      }
  
      input ${tableName}Input {
        ${graphqlFields}
      }
  
      type Query {
        get${tableName}(id: ID!): ${tableName}
        getAll${tableName}s: [${tableName}!]
      }
  
      type Mutation {
        create${tableName}(input: ${tableName}Input): ${tableName}
        update${tableName}(id: ID!, input: ${tableName}Input): ${tableName}
        delete${tableName}(id: ID!): ${tableName}
      }
    `;

  console.log("Generated GraphQL Schema:", graphqlSchema);
};

export const generateMongooseSchemaa = (fields) => {
  const mongooseFields = fields.reduce((acc, field) => {
    acc[field.name] = {
      type: field.type,
      required: true, // You can customize this based on your needs
    };
    return acc;
  }, {});

  const mongooseSchema = new mongoose.Schema(mongooseFields);

  console.log("Generated Mongoose Schema:", mongooseSchema);
};
