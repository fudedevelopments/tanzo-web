/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAdmin = /* GraphQL */ `subscription OnCreateAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onCreateAdmin(filter: $filter) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAdminSubscriptionVariables,
  APITypes.OnCreateAdminSubscription
>;
export const onCreateCartProducts = /* GraphQL */ `subscription OnCreateCartProducts(
  $filter: ModelSubscriptionCartProductsFilterInput
  $owner: String
) {
  onCreateCartProducts(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCartProductsSubscriptionVariables,
  APITypes.OnCreateCartProductsSubscription
>;
export const onCreateCategories = /* GraphQL */ `subscription OnCreateCategories(
  $filter: ModelSubscriptionCategoriesFilterInput
) {
  onCreateCategories(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCategoriesSubscriptionVariables,
  APITypes.OnCreateCategoriesSubscription
>;
export const onCreateCdetCustomer = /* GraphQL */ `subscription OnCreateCdetCustomer(
  $filter: ModelSubscriptionCdetCustomerFilterInput
  $owner: String
) {
  onCreateCdetCustomer(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCdetCustomerSubscriptionVariables,
  APITypes.OnCreateCdetCustomerSubscription
>;
export const onCreateCdetails = /* GraphQL */ `subscription OnCreateCdetails($filter: ModelSubscriptionCdetailsFilterInput) {
  onCreateCdetails(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCdetailsSubscriptionVariables,
  APITypes.OnCreateCdetailsSubscription
>;
export const onCreateCustomer = /* GraphQL */ `subscription OnCreateCustomer(
  $filter: ModelSubscriptionCustomerFilterInput
  $owner: String
) {
  onCreateCustomer(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCustomerSubscriptionVariables,
  APITypes.OnCreateCustomerSubscription
>;
export const onCreateHomePageProducts = /* GraphQL */ `subscription OnCreateHomePageProducts(
  $filter: ModelSubscriptionHomePageProductsFilterInput
) {
  onCreateHomePageProducts(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateHomePageProductsSubscriptionVariables,
  APITypes.OnCreateHomePageProductsSubscription
>;
export const onCreateOrders = /* GraphQL */ `subscription OnCreateOrders(
  $filter: ModelSubscriptionOrdersFilterInput
  $owner: String
) {
  onCreateOrders(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateOrdersSubscriptionVariables,
  APITypes.OnCreateOrdersSubscription
>;
export const onCreateProducts = /* GraphQL */ `subscription OnCreateProducts($filter: ModelSubscriptionProductsFilterInput) {
  onCreateProducts(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProductsSubscriptionVariables,
  APITypes.OnCreateProductsSubscription
>;
export const onDeleteAdmin = /* GraphQL */ `subscription OnDeleteAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onDeleteAdmin(filter: $filter) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAdminSubscriptionVariables,
  APITypes.OnDeleteAdminSubscription
>;
export const onDeleteCartProducts = /* GraphQL */ `subscription OnDeleteCartProducts(
  $filter: ModelSubscriptionCartProductsFilterInput
  $owner: String
) {
  onDeleteCartProducts(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCartProductsSubscriptionVariables,
  APITypes.OnDeleteCartProductsSubscription
>;
export const onDeleteCategories = /* GraphQL */ `subscription OnDeleteCategories(
  $filter: ModelSubscriptionCategoriesFilterInput
) {
  onDeleteCategories(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCategoriesSubscriptionVariables,
  APITypes.OnDeleteCategoriesSubscription
>;
export const onDeleteCdetCustomer = /* GraphQL */ `subscription OnDeleteCdetCustomer(
  $filter: ModelSubscriptionCdetCustomerFilterInput
  $owner: String
) {
  onDeleteCdetCustomer(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCdetCustomerSubscriptionVariables,
  APITypes.OnDeleteCdetCustomerSubscription
>;
export const onDeleteCdetails = /* GraphQL */ `subscription OnDeleteCdetails($filter: ModelSubscriptionCdetailsFilterInput) {
  onDeleteCdetails(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCdetailsSubscriptionVariables,
  APITypes.OnDeleteCdetailsSubscription
>;
export const onDeleteCustomer = /* GraphQL */ `subscription OnDeleteCustomer(
  $filter: ModelSubscriptionCustomerFilterInput
  $owner: String
) {
  onDeleteCustomer(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCustomerSubscriptionVariables,
  APITypes.OnDeleteCustomerSubscription
>;
export const onDeleteHomePageProducts = /* GraphQL */ `subscription OnDeleteHomePageProducts(
  $filter: ModelSubscriptionHomePageProductsFilterInput
) {
  onDeleteHomePageProducts(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteHomePageProductsSubscriptionVariables,
  APITypes.OnDeleteHomePageProductsSubscription
>;
export const onDeleteOrders = /* GraphQL */ `subscription OnDeleteOrders(
  $filter: ModelSubscriptionOrdersFilterInput
  $owner: String
) {
  onDeleteOrders(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOrdersSubscriptionVariables,
  APITypes.OnDeleteOrdersSubscription
>;
export const onDeleteProducts = /* GraphQL */ `subscription OnDeleteProducts($filter: ModelSubscriptionProductsFilterInput) {
  onDeleteProducts(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductsSubscriptionVariables,
  APITypes.OnDeleteProductsSubscription
>;
export const onUpdateAdmin = /* GraphQL */ `subscription OnUpdateAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onUpdateAdmin(filter: $filter) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAdminSubscriptionVariables,
  APITypes.OnUpdateAdminSubscription
>;
export const onUpdateCartProducts = /* GraphQL */ `subscription OnUpdateCartProducts(
  $filter: ModelSubscriptionCartProductsFilterInput
  $owner: String
) {
  onUpdateCartProducts(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCartProductsSubscriptionVariables,
  APITypes.OnUpdateCartProductsSubscription
>;
export const onUpdateCategories = /* GraphQL */ `subscription OnUpdateCategories(
  $filter: ModelSubscriptionCategoriesFilterInput
) {
  onUpdateCategories(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCategoriesSubscriptionVariables,
  APITypes.OnUpdateCategoriesSubscription
>;
export const onUpdateCdetCustomer = /* GraphQL */ `subscription OnUpdateCdetCustomer(
  $filter: ModelSubscriptionCdetCustomerFilterInput
  $owner: String
) {
  onUpdateCdetCustomer(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCdetCustomerSubscriptionVariables,
  APITypes.OnUpdateCdetCustomerSubscription
>;
export const onUpdateCdetails = /* GraphQL */ `subscription OnUpdateCdetails($filter: ModelSubscriptionCdetailsFilterInput) {
  onUpdateCdetails(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCdetailsSubscriptionVariables,
  APITypes.OnUpdateCdetailsSubscription
>;
export const onUpdateCustomer = /* GraphQL */ `subscription OnUpdateCustomer(
  $filter: ModelSubscriptionCustomerFilterInput
  $owner: String
) {
  onUpdateCustomer(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCustomerSubscriptionVariables,
  APITypes.OnUpdateCustomerSubscription
>;
export const onUpdateHomePageProducts = /* GraphQL */ `subscription OnUpdateHomePageProducts(
  $filter: ModelSubscriptionHomePageProductsFilterInput
) {
  onUpdateHomePageProducts(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateHomePageProductsSubscriptionVariables,
  APITypes.OnUpdateHomePageProductsSubscription
>;
export const onUpdateOrders = /* GraphQL */ `subscription OnUpdateOrders(
  $filter: ModelSubscriptionOrdersFilterInput
  $owner: String
) {
  onUpdateOrders(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOrdersSubscriptionVariables,
  APITypes.OnUpdateOrdersSubscription
>;
export const onUpdateProducts = /* GraphQL */ `subscription OnUpdateProducts($filter: ModelSubscriptionProductsFilterInput) {
  onUpdateProducts(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductsSubscriptionVariables,
  APITypes.OnUpdateProductsSubscription
>;
