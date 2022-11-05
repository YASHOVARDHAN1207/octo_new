"use strict";
const AWS = require("aws-sdk");

module.exports.createCustomer = async (event, context) => {
  console.log("event is ", event);

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      userId: event.request.userAttributes.sub,
      email: event.request.userAttributes.email,
      createdAt: Date.now(),
    },
    ConditionExpression: "attribute_not_exists(userId)",
  };
  try {
    await dynamoDb.put(putParams).promise();
  } catch (e) {
    console.log(e);
  }
  console.log("user created successfully");
  context.done(null, event);
};
