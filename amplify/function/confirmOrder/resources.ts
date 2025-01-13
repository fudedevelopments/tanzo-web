import { defineFunction, secret } from "@aws-amplify/backend";


export const confirmorder = defineFunction({
    name: 'confirmorderFunc',
    entry: "./confirmorder.ts",
        environment: {
            XCLIENTID: secret("xclientID"),
            XCLIENTSECRET : secret("xclientsecret")
        }
})