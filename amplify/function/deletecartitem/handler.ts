import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { generateClient } from 'aws-amplify/api';
import { env } from "$amplify/env/deletecartitem";

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);


// Generate Amplify Data Client
const client = generateClient<Schema>();

const s3Client = new S3Client();

export const handler = async (event: any) => {
    try {
        const getcdetail = await client.models.CdetCustomer.get({
            id: event.arguments.cdeatails
        })
        if (getcdetail.data?.images) {
            for (const image of getcdetail.data.images) {
                const res = await s3Client.send(
                    new DeleteObjectCommand({
                        Bucket: "customer-Cimages",
                        Key: ""
                    })
                )
           }
        }
    } catch (e) {
        
    }
    
}