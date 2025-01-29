import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { createorder } from "../function/createorder/resources";
import { confirmorder } from "../function/confirmOrder/resources";
import { deletecartitem } from "../function/deletecartitem/resources";

const schema = a.schema({

  Products: a
    .model({
      name: a.string().required(),
      actualPrice: a.float().required(),
      price: a.float().required(),
      description: a.string().required(),
      images: a.string().array(),
      categoryId: a.id(),
      category: a.belongsTo('Categories', 'categoryId'),
      hpId : a.id(),
      homePageProduct: a.belongsTo('HomePageProducts', 'hpId'),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.guest().to(['read']),
      allow.group('ADMINS')
    ]),
  
  Customer: a.model({
    id: a.string().required(),
    name: a.string(),
    email: a.string().required(),
    phone: a.string(),
    cartproducts: a.hasMany("CartProducts", "userId"),
    orders: a.hasMany("Orders", "userId"),
    payments: a.hasMany("Payments", "userId"),
    address: a.hasOne("address", "id")
  }).authorization((allow) => [
    allow.owner(),
    allow.group('ADMINS')
  ]),



  Orders: a.model({
    owner: a.string(),
    orderedtime:a.string(),
    quantity: a.float().required(),
    product: a.string(),
    cdeatails: a.string(),
    userId: a.string().required(),
    status: a.string().default("Order Placed"),
    statusmessage: a.string().default("Your order has been placed. Thank you"),
    customer: a.belongsTo("Customer", "userId")
  }).authorization((allow) => [
    allow.owner().to(['read']),
    allow.group('ADMINS'),
  ]),

  Payments: a.model({
    id: a.string().required(),
    userId: a.string(),
    amount: a.float(),
    paymentcurrency: a.string(),
    paymentmethod: a.string(),
    owner: a.string(),
    status: a.string().required(),
    customer: a.belongsTo("Customer", "userId")
  }).authorization((allow) => [
    allow.owner(),
    allow.group('ADMINS')
  ]),


  addressform: a.customType({
    firstName: a.string(),
    lastName: a.string(),
    phone: a.string(),
    email: a.string(),
    addressline1: a.string(),
    addressline2: a.string(),
    city: a.string(),
    state: a.string(),
    postalCode: a.string(),
    country: a.string(),
  }),

  address: a.model({
    id: a.string().required(),
    owner: a.string().required(),
    choosedIsfirst: a.boolean().default(true),
    address1: a.ref('addressform').required(),
    address2: a.ref('addressform'),
    customer : a.belongsTo("Customer","id")
  }).authorization((allow) => [
    allow.owner(),
    allow.group('ADMINS')
  ]),



  Cdetails: a.model({
      id: a.string().required(),
      isImageRequired : a.boolean(),
      requiredImages: a.float(),
      textRequired: a.boolean(),
      isSpotify: a.boolean(),
      cdescription: a.string(),
      cNotePoints: a.string(),
      pDimensions: a.string(),
    }).authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.guest().to(['read']),
      allow.group('ADMINS')
    ]),
  
  CdetCustomer: a.model({
    uploadedimagesurl: a.string().array(),
    images: a.string().array(),
    text: a.string(),
    spotifySong: a.string(),
  }).authorization((allow) => [
    allow.owner(),
    allow.group('ADMINS')
  ]),
  
  
  CartProducts: a.model({
    userId: a.string().required(),
    quantity : a.float().required(),
    product: a.string(),
    cdeatails : a.string(),
    customer : a.belongsTo("Customer", "userId")
  }).authorization((allow) => [
    allow.owner(),
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
      allow.group('ADMINS').to(['create','delete','get']),
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
    allow.group('ADMINS')
  ]),

  HomePageProducts: a.model({
    title : a.string().required(),
    products : a.hasMany("Products",'hpId')
  }).authorization(allow => [
    allow.authenticated(),
    allow.guest(),
    allow.group('ADMINS')
  ]),

}).authorization(allow => [allow.resource(confirmorder),
  allow.resource(deletecartitem)
])

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  name : "tanzo-web",
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
