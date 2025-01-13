/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const createOrderCF = /* GraphQL */ `query CreateOrderCF(
  $customerEmail: String!
  $customerId: String!
  $customerName: String!
  $customerPhone: String!
  $order_amount: Float!
) {
  createOrderCF(
    customerEmail: $customerEmail
    customerId: $customerId
    customerName: $customerName
    customerPhone: $customerPhone
    order_amount: $order_amount
  )
}
` as GeneratedQuery<
  APITypes.CreateOrderCFQueryVariables,
  APITypes.CreateOrderCFQuery
>;
export const getAdmin = /* GraphQL */ `query GetAdmin($id: ID!) {
  getAdmin(id: $id) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAdminQueryVariables, APITypes.GetAdminQuery>;
export const getCartProducts = /* GraphQL */ `query GetCartProducts($id: ID!) {
  getCartProducts(id: $id) {
    cdeatails
    createdAt
    customer {
      createdAt
      email
      id
      name
      owner
      phone
      updatedAt
      __typename
    }
    id
    owner
    product
    quantity
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCartProductsQueryVariables,
  APITypes.GetCartProductsQuery
>;
export const getCategories = /* GraphQL */ `query GetCategories($id: ID!) {
  getCategories(id: $id) {
    createdAt
    id
    image
    name
    products {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCategoriesQueryVariables,
  APITypes.GetCategoriesQuery
>;
export const getCdetCustomer = /* GraphQL */ `query GetCdetCustomer($id: ID!) {
  getCdetCustomer(id: $id) {
    createdAt
    id
    images
    owner
    spotifySong
    text
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCdetCustomerQueryVariables,
  APITypes.GetCdetCustomerQuery
>;
export const getCdetails = /* GraphQL */ `query GetCdetails($id: ID!) {
  getCdetails(id: $id) {
    cId
    cNotePoints
    cdescription
    createdAt
    id
    isImageRequired
    isSpotify
    pDimensions
    product {
      actualPrice
      categoryId
      createdAt
      description
      hpId
      id
      images
      name
      price
      updatedAt
      __typename
    }
    requiredImages
    textRequired
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCdetailsQueryVariables,
  APITypes.GetCdetailsQuery
>;
export const getCustomer = /* GraphQL */ `query GetCustomer($id: String!) {
  getCustomer(id: $id) {
    cartproducts {
      nextToken
      __typename
    }
    createdAt
    email
    id
    name
    orders {
      nextToken
      __typename
    }
    owner
    phone
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerQueryVariables,
  APITypes.GetCustomerQuery
>;
export const getHomePageProducts = /* GraphQL */ `query GetHomePageProducts($id: ID!) {
  getHomePageProducts(id: $id) {
    createdAt
    id
    products {
      nextToken
      __typename
    }
    title
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetHomePageProductsQueryVariables,
  APITypes.GetHomePageProductsQuery
>;
export const getOrders = /* GraphQL */ `query GetOrders($id: ID!) {
  getOrders(id: $id) {
    cdeatails
    createdAt
    customer {
      createdAt
      email
      id
      name
      owner
      phone
      updatedAt
      __typename
    }
    id
    owner
    product
    quantity
    updatedAt
    userId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetOrdersQueryVariables, APITypes.GetOrdersQuery>;
export const getProducts = /* GraphQL */ `query GetProducts($id: ID!) {
  getProducts(id: $id) {
    actualPrice
    category {
      createdAt
      id
      image
      name
      updatedAt
      __typename
    }
    categoryId
    cdetails {
      cId
      cNotePoints
      cdescription
      createdAt
      id
      isImageRequired
      isSpotify
      pDimensions
      requiredImages
      textRequired
      updatedAt
      __typename
    }
    createdAt
    description
    homePageProduct {
      createdAt
      id
      title
      updatedAt
      __typename
    }
    hpId
    id
    images
    name
    price
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProductsQueryVariables,
  APITypes.GetProductsQuery
>;
export const listAdmins = /* GraphQL */ `query ListAdmins(
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      admin
      createdAt
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminsQueryVariables,
  APITypes.ListAdminsQuery
>;
export const listCartProducts = /* GraphQL */ `query ListCartProducts(
  $filter: ModelCartProductsFilterInput
  $limit: Int
  $nextToken: String
) {
  listCartProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cdeatails
      createdAt
      id
      owner
      product
      quantity
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCartProductsQueryVariables,
  APITypes.ListCartProductsQuery
>;
export const listCategories = /* GraphQL */ `query ListCategories(
  $filter: ModelCategoriesFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      image
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCategoriesQueryVariables,
  APITypes.ListCategoriesQuery
>;
export const listCdetCustomers = /* GraphQL */ `query ListCdetCustomers(
  $filter: ModelCdetCustomerFilterInput
  $limit: Int
  $nextToken: String
) {
  listCdetCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      images
      owner
      spotifySong
      text
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCdetCustomersQueryVariables,
  APITypes.ListCdetCustomersQuery
>;
export const listCdetails = /* GraphQL */ `query ListCdetails(
  $filter: ModelCdetailsFilterInput
  $limit: Int
  $nextToken: String
) {
  listCdetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cId
      cNotePoints
      cdescription
      createdAt
      id
      isImageRequired
      isSpotify
      pDimensions
      requiredImages
      textRequired
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCdetailsQueryVariables,
  APITypes.ListCdetailsQuery
>;
export const listCustomers = /* GraphQL */ `query ListCustomers(
  $filter: ModelCustomerFilterInput
  $id: String
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCustomers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      id
      name
      owner
      phone
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCustomersQueryVariables,
  APITypes.ListCustomersQuery
>;
export const listHomePageProducts = /* GraphQL */ `query ListHomePageProducts(
  $filter: ModelHomePageProductsFilterInput
  $limit: Int
  $nextToken: String
) {
  listHomePageProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      title
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHomePageProductsQueryVariables,
  APITypes.ListHomePageProductsQuery
>;
export const listOrders = /* GraphQL */ `query ListOrders(
  $filter: ModelOrdersFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cdeatails
      createdAt
      id
      owner
      product
      quantity
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrdersQueryVariables,
  APITypes.ListOrdersQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductsFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      actualPrice
      categoryId
      createdAt
      description
      hpId
      id
      images
      name
      price
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
