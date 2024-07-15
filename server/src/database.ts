import * as mongodb from "mongodb";
import {Employee} from "./employee";

export const collections: {
    employees?: mongodb.Collection<Employee>;
} = {};

export async function connectToDatabase (uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("employee-mean-stack");
    await applySchemaValidation(db);

    collections.employees = db.collection<Employee>("Employees");
}

async function applySchemaValidation (db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "required string"
                },
                position: {
                    bsonType: "string",
                    description: "required string with minimum length 5",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "required enum: junior, middle or senior",
                    enum: ["junior", "middle", "senior"]
                }
            }
        }
    };

    await db.command({
        collMod: "employees",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === "NamespaceNotFound") {
           await db.createCollection("employees", {validator: jsonSchema});
       }
    });
}
