const express = require('express');
const dotenv = require('dotenv');
const { v4 } = require('uuid');
const aws = require('aws-sdk');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config();

const sqs = new aws.SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  apiVersion: '2012-11-05',
});

app.post('/messages', async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({
        detail: "The message property is required"
      });
    }
    const sqsMessage = {
      DelaySeconds: 10,
      MessageBody: JSON.stringify({
        id: v4(),
        message: req.body.message,
        date: new Date(),
      }),
      //MessageGroupId: "GroupId0001",
      //MessageDeduplicationId: "DeduplicationID001",
      QueueUrl: process.env.AWS_SQS_QUEUE_URL
    };
    const response = await sqs.sendMessage(sqsMessage).promise()
    console.log(`Publishing an SQS message using AWS SQS :${JSON.stringify(sqsMessage)}`);
    return res.json({
      detail: response
    });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    });
  }
});

app.listen(3001, () => {
  console.log("Server running port 3001");
});