import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { createorder } from './function/createorder/resources';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { confirmorder } from './function/confirmOrder/resources';
import { deletecartitem } from './function/deletecartitem/resources';
import { myApiFunction } from './function/api-function/resources';
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
  myApiFunction,
  getpaymetstatus
});

const cfWebhookurlobj = backend.confirmorder.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})


const apiStack = backend.createStack("api-stack");

const iamAuthorizer = new HttpIamAuthorizer();

const userPoolAuthorizer = new HttpUserPoolAuthorizer(
  "userPoolAuth",
  backend.auth.resources.userPool,
  {
    userPoolClients: [backend.auth.resources.userPoolClient],
  }
);


const httpLambdaIntegration = new HttpLambdaIntegration(
  "LambdaIntegration",
  backend.myApiFunction.resources.lambda
);


const httpApi = new HttpApi(apiStack, "HttpApi", {
  apiName: "myHttpApi",
  corsPreflight: {
    // Modify the CORS settings below to match your specific requirements
    allowMethods: [
      CorsHttpMethod.GET,
      CorsHttpMethod.POST,
      CorsHttpMethod.PUT,
      CorsHttpMethod.DELETE
      
    ],
    // Restrict this to domains you trust
    allowOrigins: ["*"],
    // Specify only the headers you need to allow
    allowHeaders: ["*"],
  },
  createDefaultStage: true,
});

httpApi.addRoutes({
  path: "/items",
  methods: [HttpMethod.GET, HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE],
  integration: httpLambdaIntegration,
  authorizer: iamAuthorizer,
});


httpApi.addRoutes({
  path: "/items/{proxy+}",
  methods: [HttpMethod.ANY],
  integration: httpLambdaIntegration,
  authorizer: iamAuthorizer,
});

// add the options method to the route
httpApi.addRoutes({
  path: "/items/{proxy+}",
  methods: [HttpMethod.OPTIONS],
  integration: httpLambdaIntegration,
});

httpApi.addRoutes({
  path: "/cognito-auth-path",
  methods: [HttpMethod.GET],
  integration: httpLambdaIntegration,
  authorizer: userPoolAuthorizer,
});


const apiPolicy = new Policy(apiStack, "ApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${httpApi.arnForExecuteApi("*", "/items")}`,
        `${httpApi.arnForExecuteApi("*", "/items/*")}`,
        `${httpApi.arnForExecuteApi("*", "/cognito-auth-path")}`,
      ],
    }),
  ],
});


backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiPolicy);


backend.addOutput({
  custom: {
    API: {
      [httpApi.httpApiName!]: {
        endpoint: httpApi.url,
        region: Stack.of(httpApi).region,
        apiName: httpApi.httpApiName,
      },
    },
    confirmorder: cfWebhookurlobj.url,
  }
})
