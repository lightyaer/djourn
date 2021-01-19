const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.JOURNAL_TABLE;

exports.updateJournalHandler = async event => {
  // All log statements are written to CloudWatch
  console.info("received:", event);

  // Get id and name from the body of the request
  const body = JSON.parse(event.body);
  const id = body.id;
  const name = body.name;

  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  var params = {
    TableName: tableName,
    Item: { id: id, name: name }
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(body)
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
