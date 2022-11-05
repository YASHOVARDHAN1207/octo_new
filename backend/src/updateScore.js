"use strict";
const AWS = require("aws-sdk");

module.exports.updateScore = async (event, context) => {
  console.log("event for updating is ", event);
  const body = JSON.parse(Buffer.from(event.body, "base64").toString());
  console.log("body is ", body);
  const exerciseName = body.name;
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
      userId: body.userId,
    },
    UpdateExpression: "SET #var = :y",
    ExpressionAttributeNames: {
      "#var": exerciseName,
    },
    ExpressionAttributeValues: {
      ":y": { value: body.value, at: Date.now() },
    },
    // Item: {
    //   //   userId: event.request.userAttributes.sub,
    //   userId: body.userId,
    //   score: {},
    // },
  };
  //   putParams.Item.score[exerciseName] = { value: body.value, at: Date.now() };
  try {
    await dynamoDb.update(putParams).promise();
  } catch (e) {
    console.log(e);
  }
  console.log("score updates successfully");
  context.done(null, event);
};
