import { defineFunction, secret } from "@aws-amplify/backend"

export const getpaymetstatus = defineFunction({
    name: "getpaymentstatus",
    entry: "./getpaymentstatus.ts",
    environment: {
        XCLIENTID: secret("xclientID"),
        XCLIENTSECRET : secret("xclientsecret")
    }
});