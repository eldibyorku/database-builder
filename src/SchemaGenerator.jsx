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

      schema {
        query: Query
        mutation: Mutation
      }
    `;

  console.log("Generated GraphQL Schema:", graphqlSchema);
};

export const generateMongooseSchemaa = (tableName, fields) => {
  const mongooseFields = fields.reduce((acc, field) => {
    acc[field.name] = {
      type: field.type,
      required: true,
    };
    return acc;
  }, {});

  const mongooseSchema = new mongoose.Schema(mongooseFields);
  const mongooseModel = mongoose.model(tableName, mongooseSchema);

  console.log(`Generated Mongoose Model for ${tableName}:`);

  return mongooseModel;
};

export const generateResolverss = (tableName, mongooseModel) => {
  const resolvers = {
    Query: {
      [`get${tableName}`]: async (parent, { id }, context, info) => {
        // Implement logic to retrieve a single document by ID
        const result = await mongooseModel.findById(id);
        return result;
      },
      [`getAll${tableName}s`]: async (parent, args, context, info) => {
        // Implement logic to retrieve all documents
        const result = await mongooseModel.find();
        return result;
      },
    },
    Mutation: {
      [`create${tableName}`]: async (parent, { input }, context, info) => {
        // Implement logic to create a new document
        const result = await mongooseModel.create(input);
        return result;
      },
      [`update${tableName}`]: async (parent, { id, input }, context, info) => {
        // Implement logic to update a document by ID
        const result = await mongoose
          .model(tableName)
          .findByIdAndUpdate(id, input, { new: true });
        return result;
      },
      [`delete${tableName}`]: async (parent, { id }, context, info) => {
        // Implement logic to delete a document by ID
        const result = await mongooseModel.findByIdAndDelete(id);
        return result;
      },
    },
  };

  console.log("Generated Resolvers for", tableName);
  console.log(resolvers);
  return resolvers;
};
