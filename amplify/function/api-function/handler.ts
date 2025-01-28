import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import AWS from "aws-sdk";

// Initialize the DynamoDB Document Client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Replace with the names of your DynamoDB tables
const HOME_PAGE_PRODUCTS_TABLE = "HomePageProducts-ltarpn4flzeszmmsztlm4llulq-NONE";
const PRODUCTS_TABLE = "Products-ltarpn4flzeszmmsztlm4llulq-NONE";
const CATEGORIES_TABLE = "Categories-ltarpn4flzeszmmsztlm4llulq-NONE";

// The name of the GSI
const GSI_NAME = "gsi-HomePageProducts.products";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    try {
        // Step 1: Scan the HomePageProducts table
        const homePageScanParams = {
            TableName: HOME_PAGE_PRODUCTS_TABLE,
        };

        const homePageScanResult = await dynamoDb.scan(homePageScanParams).promise();
        const homePageItems = (homePageScanResult.Items || []) as { title: string; id?: string }[];

        // Step 2: Filter out items without valid hpId
        const validItems = homePageItems.filter((item) => item.id);

        // Step 3: Query the Products table for each valid hpId
        const productsData = await Promise.all(
            validItems.map(async (item) => {
                const queryParams = {
                    TableName: PRODUCTS_TABLE,
                    IndexName: GSI_NAME,
                    KeyConditionExpression: "hpId = :hpId",
                    ExpressionAttributeValues: {
                        ":hpId": item.id,
                    },
                };

                const queryResult = await dynamoDb.query(queryParams).promise();

                // Map and filter product fields
                const products = (queryResult.Items || []).map((product) => ({
                    id: product.id,
                    name: product.name,
                    actualprice: product.actualPrice,
                    price: product.price,
                    image: product.images ? product.images[0] : null, // Get the first image
                }));

                return {
                    title: item.title,
                    products,
                };
            })
        );

        // Step 4: Query the Categories table
        const categoriesScanParams = {
            TableName: CATEGORIES_TABLE,
        };

        const categoriesScanResult = await dynamoDb.scan(categoriesScanParams).promise();
        const categories = (categoriesScanResult.Items || []).map((category) => ({
            id: category.id,
            name: category.name,
            image: category.image,
        }));

        // Step 5: Return the combined result
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                success: true,
                data: {
                    homePageProducts: productsData,
                    categories, // Add categories to the response
                },
            }),
        };
    } catch (error) {
        console.error("Error querying the tables:", error);

        // Return an error response
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({
                success: false,
                message: "Failed to fetch data.",
                error: error,
            }),
        };
    }
};
