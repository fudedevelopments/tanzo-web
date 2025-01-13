import { defineFunction } from "@aws-amplify/backend";

export const deletecartitem = defineFunction({
    name: "deletecartitem",
    entry: './handler.ts',
    environment:{
        
    }
})