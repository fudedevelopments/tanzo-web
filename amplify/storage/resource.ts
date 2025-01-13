import { defineStorage } from "@aws-amplify/backend";
import { deletecartitem } from "../function/deletecartitem/resources";

export const storage = defineStorage({
    name: "tanzoWebStorage",
    access: (allow) => ({
        "product-images/*": [
            allow.guest.to(['read']),
            allow.authenticated.to(['read']),
            allow.groups(["ADMINS"]).to(['read', 'write', 'delete'])
        ],
        "category-images/*": [
            allow.guest.to(['read']),
            allow.authenticated.to(['read']),
            allow.groups(["ADMINS"]).to(['read', 'write', 'delete'])
        ],
        "customer-Cimages/*": [
            allow.authenticated.to(['read', 'write', 'delete']),
            allow.groups(["ADMINS"]).to(['read', 'write', 'delete']),
            allow.resource(deletecartitem).to(['read', 'write', 'delete']),
        ]

    })
})