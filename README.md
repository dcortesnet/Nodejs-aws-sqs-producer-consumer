# Nodejs AWS SQS producer/consumer ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Basic flow of producer and consumption of AWS SQS queues.
The project consists of 2 services, one to producer and one to consume.
NOTE: The consumer polls the queue continuously for messages using a long poll.

## Prerequisites

- Account to AWS
- AWS user with `AmazonSQSFullAccess` policies
- Create SQS queue standard

## ENV variables

| ENV | Description |
| :------------------ | :------------------------------ |
| `AWS_ACCESS_KEY_ID` | access key ID |
| `AWS_SECRET_KEY` | secret access key |
| `AWS_REGION` | SQS Region |
| `AWS_SQS_QUEUE_URL` | Queue url to interact |


# Endpoints

| Service | Method | Endpoint | body | Description
|:--------|:--------|:--------|:--------| :--------|
|`Service send` | POST |http://localhost:3001/messages | {message: "Hello world"} | Create new resource
|`Service consumer` | GET | http://localhost:3002/messages |  | Get all resources

## Team

Developed by Diego Cortés

* dcortes.net@gmail.com