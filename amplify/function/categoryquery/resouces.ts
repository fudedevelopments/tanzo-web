import { defineFunction } from "@aws-amplify/backend";

export const categoryquery = defineFunction({
    name: "categoryquery",
    entry: "./categoryquery.ts",
});