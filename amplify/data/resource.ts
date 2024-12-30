import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { createorder } from "../function/createorder/resources";

const schema = a.schema({

  Products: a
    .model({
      name: a.string().required(),
      actualPrice: a.float().required(),
      price: a.float().required(),
      description: a.string().required(),
      images: a.string().array(),
      categoryId: a.id(),
      category: a.belongsTo('Categories','categoryId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.guest().to(['read']),
      allow.group('ADMINS')
    ]),
  
    Categories: a
    .model({
      name: a.string().required(),
      image: a.string().required(),
      products : a.hasMany("Products", "categoryId")
    })
      .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read']),
      allow.group('ADMINS'),
      ]),

    Admin: a.model({
      admin: a.string().required(),
    }).authorization((allow) => [
      allow.group('ADMINS')
    ]),

  createOrderCF: a
    .query()
    .arguments({
      order_amount: a.float().required(),
      customerId : a.string().required(),
      customerName : a.string().required(),
      customerEmail : a.string().required(),
      customerPhone : a.string().required(),
    })
    .returns(a.json())
    .handler(a.handler.function(createorder))
  .authorization(allow => [
    allow.authenticated(),
    allow.guest(),
    allow.group('ADMINS')
  ])

  
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  name : "tanzo-web",
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
