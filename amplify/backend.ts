import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { createorder } from './function/createorder/resources';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { confirmorder } from './function/confirmOrder/resources';
import { deletecartitem } from './function/deletecartitem/resources';
import { homepagequery } from './function/api-function/resources';
import { Stack } from "aws-cdk-lib";
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { HttpIamAuthorizer, HttpUserPoolAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { getpaymetstatus } from './function/getpaymetstatus/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
  createorder,
  confirmorder,
  deletecartitem,
  homepagequery,
  getpaymetstatus
});

const cfWebhookurlobj = backend.confirmorder.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})




backend.addOutput({
  custom: {
    confirmorder: cfWebhookurlobj.url,
  }
})
