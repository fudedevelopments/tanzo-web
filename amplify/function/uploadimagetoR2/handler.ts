import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "$amplify/env/uploadimagestoR2";

const s3 = new S3Client({
    credentials: {
        accessKeyId: env.AccessKeyR2,
        secretAccessKey: env.SecretKeyR2,
    },
    region: "auto",
    endpoint: env.EndpointR2,
});

export const handler = async (event: any) => {
    try {
        const contentType = event.headers["content-type"] || event.headers["Content-Type"];
        const fileName = event.headers["x-file-name"]; // Assuming the filename is passed in headers.

        if (!contentType) {
            throw new Error("Content-Type header is missing.");
        }

        if (!fileName) {
            throw new Error("File name not provided in the 'x-file-name' header.");
        }

        const fileBuffer = Buffer.from(event.body, "base64"); // Decode the base64-encoded file body.

        // Upload the file to R2
        const uploadCommand = new PutObjectCommand({
            Bucket: "mynewbucketr2",
            Key: "mynewfile",
            Body: fileBuffer,
            ContentType: "application/png", // Use the provided Content-Type header
        });

        await s3.send(uploadCommand);

        // Return the file URL or details
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ message: "File uploaded successfully"}),
        };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify({ message: "Failed to upload the file", error: error }),
        };
    }
};
