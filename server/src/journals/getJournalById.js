// Get the DynamoDB table name from environment variables
const tableName = process.env.JOURNAL_TABLE;

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.getJournalsByIdHandler = async event => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getJournals only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  const params = {
    TableName: tableName
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items)
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
