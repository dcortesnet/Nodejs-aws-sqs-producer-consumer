const express = require('express');
const dotenv = require('dotenv');
const app = express();
const sqsClient = require('@aws-sdk/client-sqs');
const consumer = require('sqs-consumer');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config();

const messages = [];

const sqs = new sqsClient.SQS({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
  apiVersion: '2012-11-05',
});

const handlerSQSConsumer = consumer.Consumer.create({
  queueUrl: process.env.AWS_SQS_QUEUE_URL,
  handleMessage: async (message) => {
    console.log(message);
    messages.push({
      MessageId: message.MessageId,
      MD5OfBody: message.MD5OfBody,
      Body: JSON.parse(message.Body)
    });
  },
  sqs: sqs
});

handlerSQSConsumer.on("error", (err) => {
  console.log("AWS SQS error", err);
});

handlerSQSConsumer.on('processing_error', (err) => {
  console.log("AWS SQS processing error", err);
});

handlerSQSConsumer.on('timeout_error', (err) => {
  console.log("AWS SQS timeout error", err);
});

handlerSQSConsumer.start();

app.get("/messages", (req, res) => {
  try {
    return res.json({ messages });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    });
  }
});

app.listen(3002, () => {
  console.log("Server running port 3002");
});