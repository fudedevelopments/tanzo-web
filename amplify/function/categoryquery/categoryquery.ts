import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const PRODUCTS_TABLE = "Products-ltarpn4flzeszmmsztlm4llulq-NONE";
const GSI_NAME = "gsi-Categories.products";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    try {
        // Parse query parameters
        const queryParams = event.queryStringParameters || {};
        const categoryId = queryParams.categoryId;
        const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
        const nextToken = queryParams.nextToken;

        // Validate required parameter
        if (!categoryId) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                },
                body: JSON.stringify({
                    success: false,
                    message: "categoryId is required in query parameters",
                }),
            };
        }

        // Set up query parameters
        const queryParamsDDB = {
            TableName: PRODUCTS_TABLE,
            IndexName: GSI_NAME,
            KeyConditionExpression: "categoryId = :categoryId",
            ExpressionAttributeValues: {
                ":categoryId": categoryId,
            },
            Limit: limit,
            ExclusiveStartKey: nextToken ? JSON.parse(Buffer.from(nextToken, 'base64').toString('utf8')) : undefined,
        };

        // Execute the query
        const result = await dynamoDb.query(queryParamsDDB).promise();

        // Process items
        const products = (result.Items || []).map((product) => ({
            id:product.id,
            name: product.name,
            actualprice: product.actualPrice,
            price: product.price,
            image: product.images?.[0] || null,
        }));

        // Prepare next token
        const newNextToken = result.LastEvaluatedKey
            ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64')
            : null;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                success: true,
                data: {
                    products,
                    nextToken: newNextToken,
                },
            }),
        };
    } catch (error) {
        console.error("Error querying products by category:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                success: false,
                message: "Failed to fetch products",
                error: error,
            }),
        };
    }
};