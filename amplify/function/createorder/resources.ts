import { defineFunction, secret } from "@aws-amplify/backend"

export const createorder = defineFunction({
    name: "createorder",
    entry: "./createorderfunc.ts",
    environment: {
        XCLIENTID: secret("xclientID"),
        XCLIENTSECRET : secret("xclientsecret")
    }
});