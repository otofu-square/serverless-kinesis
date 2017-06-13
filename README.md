# serverless-kinesis

Collect webhook event on [LINE Messaging API](https://devdocs.line.me/en/#messaging-api) by kinesis powered by Server:zap:less framework.

# Requirements

- Node.js 8.x
- TypeScript 2.x
- Serverless Framework CLI

# Deploy

1. Move `.envrc.skeleton` to `.envrc`, and fill in your credentials.
2. `$ sls deploy`
3. Set your API Gateway URL to `Webhook URL` on LINE Channel Configure.
