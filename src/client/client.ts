import AWS from "aws-sdk";
import DynamoDB, { DocumentClient, TableNameList } from "aws-sdk/clients/dynamodb";
import { TableName } from "../domain/TableName";

AWS.config.update({
  region: "us-west-2",
});

export class Client {
  dynamoDb :DynamoDB;
  client :DocumentClient;
  tableNamePattern = /^([a-zA-Z]+)-([a-z0-9]+)-([a-z]+)$/;

  constructor() {
    const options = {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID,
    };
    this.dynamoDb = new AWS.DynamoDB(options);
    this.client = new AWS.DynamoDB.DocumentClient(options);
  }

  async scan(tableName :string) :Promise<DocumentClient.ScanOutput> {
    return new Promise((resolve, reject) => {
      this.client.scan({ TableName: tableName}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async listTablesByEnv() :Promise<TableList> {
    const tables = await new Promise<TableNameList>((resolve, reject) => {
      this.dynamoDb.listTables({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.TableNames);
        }
      });
    });
    const tableListList :TableList = {};
    return tables.reduce((accumelator, table) => {
      const env = TableName.getEnv(table);
      if (!accumelator[env]) {
        accumelator[env] = [];
      }
      accumelator[env].push(table);
      return accumelator;
    }, tableListList);
  }
}

export interface TableList {
  [envName :string] : string[]
}
