import { defineFunction } from "@aws-amplify/backend";

export const uploadimagestoR2 = defineFunction({
    name: "uploadimagestoR2s",
    entry:"./handler.ts",
    environment: {
        AccessKeyR2: "8a0e3074f1d38877e9cd9fb6c4942391",
        SecretKeyR2: "5f14dfed1a66821612f870a725ae16d94c60217279eb5a2bc59e49aa6794c6ec",
        EndpointR2: "https://95b82fcb68e8f0864692afcf13ac17f0.r2.cloudflarestorage.com/productimages"
    }   
})