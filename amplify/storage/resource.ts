import { defineStorage } from "@aws-amplify/backend";

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
        ]

    })
})