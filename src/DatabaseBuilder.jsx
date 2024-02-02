import React, { useState } from "react";
import {
  generateGraphQLSchemaa,
  generateMongooseSchemaa,
} from "./SchemaGenerator";
const DatabaseBuilder = () => {
  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "" }]);

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleFieldNameChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].name = event.target.value;
    setFields(updatedFields);
  };

  const handleFieldTypeChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].type = event.target.value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const generateGraphQLSchema = () => {
    // Implement logic to generate GraphQL schema based on state
    const graphqlSchema = generateGraphQLSchemaa(tableName, fields);
    console.log("Generated GraphQL Schema:", graphqlSchema);
  };

  const generateMongooseSchema = () => {
    // Implement logic to generate Mongoose schema based on state
    const mongooseSchema = generateMongooseSchemaa(fields);
    console.log("Generated GraphQL Schema:", mongooseSchema);
  };

  return (
    <div>
      <label>
        Table Name:
        <input type="text" value={tableName} onChange={handleTableNameChange} />
      </label>

      <div>
        <h3>Fields:</h3>
        {fields.map((field, index) => (
          <div key={index}>
            <label>
              Field Name:
              <input
                type="text"
                value={field.name}
                onChange={(e) => handleFieldNameChange(index, e)}
              />
            </label>
            <label>
              Field Type:
              <input
                type="text"
                value={field.type}
                onChange={(e) => handleFieldTypeChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button onClick={handleAddField}>Add Field</button>
      </div>

      <button onClick={generateGraphQLSchema}>Generate GraphQL Schema</button>
      <button onClick={generateMongooseSchema}>Generate Mongoose Schema</button>
    </div>
  );
};

export default DatabaseBuilder;
