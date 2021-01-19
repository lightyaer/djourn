// Get the DynamoDB table name from environment variables
const tableName = process.env.JOURNAL_TABLE;

const _ = require("lodash");
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.createJournalHandler = async event => {
  console.info("received:", event);
  const body = JSON.parse(_.get(event, "body"));

  const newJournal = _.pick(body, [
    "content",
    "updated_at",
    "title",
    "created_at"
  ]);

  const params = {
    TableName: tableName,
    Item: newJournal
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({ body, status: result })
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
