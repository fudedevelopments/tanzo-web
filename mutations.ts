/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAdmin = /* GraphQL */ `mutation CreateAdmin(
  $condition: ModelAdminConditionInput
  $input: CreateAdminInput!
) {
  createAdmin(condition: $condition, input: $input) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAdminMutationVariables,
  APITypes.CreateAdminMutation
>;
export const createCartProducts = /* GraphQL */ `mutation CreateCartProducts(
  $condition: ModelCartProductsConditionInput
  $input: CreateCartProductsInput!
) {
  createCartProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCartProductsMutationVariables,
  APITypes.CreateCartProductsMutation
>;
export const createCategories = /* GraphQL */ `mutation CreateCategories(
  $condition: ModelCategoriesConditionInput
  $input: CreateCategoriesInput!
) {
  createCategories(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCategoriesMutationVariables,
  APITypes.CreateCategoriesMutation
>;
export const createCdetCustomer = /* GraphQL */ `mutation CreateCdetCustomer(
  $condition: ModelCdetCustomerConditionInput
  $input: CreateCdetCustomerInput!
) {
  createCdetCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCdetCustomerMutationVariables,
  APITypes.CreateCdetCustomerMutation
>;
export const createCdetails = /* GraphQL */ `mutation CreateCdetails(
  $condition: ModelCdetailsConditionInput
  $input: CreateCdetailsInput!
) {
  createCdetails(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCdetailsMutationVariables,
  APITypes.CreateCdetailsMutation
>;
export const createCustomer = /* GraphQL */ `mutation CreateCustomer(
  $condition: ModelCustomerConditionInput
  $input: CreateCustomerInput!
) {
  createCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateCustomerMutationVariables,
  APITypes.CreateCustomerMutation
>;
export const createHomePageProducts = /* GraphQL */ `mutation CreateHomePageProducts(
  $condition: ModelHomePageProductsConditionInput
  $input: CreateHomePageProductsInput!
) {
  createHomePageProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateHomePageProductsMutationVariables,
  APITypes.CreateHomePageProductsMutation
>;
export const createOrders = /* GraphQL */ `mutation CreateOrders(
  $condition: ModelOrdersConditionInput
  $input: CreateOrdersInput!
) {
  createOrders(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateOrdersMutationVariables,
  APITypes.CreateOrdersMutation
>;
export const createProducts = /* GraphQL */ `mutation CreateProducts(
  $condition: ModelProductsConditionInput
  $input: CreateProductsInput!
) {
  createProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateProductsMutationVariables,
  APITypes.CreateProductsMutation
>;
export const deleteAdmin = /* GraphQL */ `mutation DeleteAdmin(
  $condition: ModelAdminConditionInput
  $input: DeleteAdminInput!
) {
  deleteAdmin(condition: $condition, input: $input) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAdminMutationVariables,
  APITypes.DeleteAdminMutation
>;
export const deleteCartProducts = /* GraphQL */ `mutation DeleteCartProducts(
  $condition: ModelCartProductsConditionInput
  $input: DeleteCartProductsInput!
) {
  deleteCartProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCartProductsMutationVariables,
  APITypes.DeleteCartProductsMutation
>;
export const deleteCategories = /* GraphQL */ `mutation DeleteCategories(
  $condition: ModelCategoriesConditionInput
  $input: DeleteCategoriesInput!
) {
  deleteCategories(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCategoriesMutationVariables,
  APITypes.DeleteCategoriesMutation
>;
export const deleteCdetCustomer = /* GraphQL */ `mutation DeleteCdetCustomer(
  $condition: ModelCdetCustomerConditionInput
  $input: DeleteCdetCustomerInput!
) {
  deleteCdetCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCdetCustomerMutationVariables,
  APITypes.DeleteCdetCustomerMutation
>;
export const deleteCdetails = /* GraphQL */ `mutation DeleteCdetails(
  $condition: ModelCdetailsConditionInput
  $input: DeleteCdetailsInput!
) {
  deleteCdetails(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCdetailsMutationVariables,
  APITypes.DeleteCdetailsMutation
>;
export const deleteCustomer = /* GraphQL */ `mutation DeleteCustomer(
  $condition: ModelCustomerConditionInput
  $input: DeleteCustomerInput!
) {
  deleteCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteCustomerMutationVariables,
  APITypes.DeleteCustomerMutation
>;
export const deleteHomePageProducts = /* GraphQL */ `mutation DeleteHomePageProducts(
  $condition: ModelHomePageProductsConditionInput
  $input: DeleteHomePageProductsInput!
) {
  deleteHomePageProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteHomePageProductsMutationVariables,
  APITypes.DeleteHomePageProductsMutation
>;
export const deleteOrders = /* GraphQL */ `mutation DeleteOrders(
  $condition: ModelOrdersConditionInput
  $input: DeleteOrdersInput!
) {
  deleteOrders(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteOrdersMutationVariables,
  APITypes.DeleteOrdersMutation
>;
export const deleteProducts = /* GraphQL */ `mutation DeleteProducts(
  $condition: ModelProductsConditionInput
  $input: DeleteProductsInput!
) {
  deleteProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteProductsMutationVariables,
  APITypes.DeleteProductsMutation
>;
export const updateAdmin = /* GraphQL */ `mutation UpdateAdmin(
  $condition: ModelAdminConditionInput
  $input: UpdateAdminInput!
) {
  updateAdmin(condition: $condition, input: $input) {
    admin
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAdminMutationVariables,
  APITypes.UpdateAdminMutation
>;
export const updateCartProducts = /* GraphQL */ `mutation UpdateCartProducts(
  $condition: ModelCartProductsConditionInput
  $input: UpdateCartProductsInput!
) {
  updateCartProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCartProductsMutationVariables,
  APITypes.UpdateCartProductsMutation
>;
export const updateCategories = /* GraphQL */ `mutation UpdateCategories(
  $condition: ModelCategoriesConditionInput
  $input: UpdateCategoriesInput!
) {
  updateCategories(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCategoriesMutationVariables,
  APITypes.UpdateCategoriesMutation
>;
export const updateCdetCustomer = /* GraphQL */ `mutation UpdateCdetCustomer(
  $condition: ModelCdetCustomerConditionInput
  $input: UpdateCdetCustomerInput!
) {
  updateCdetCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCdetCustomerMutationVariables,
  APITypes.UpdateCdetCustomerMutation
>;
export const updateCdetails = /* GraphQL */ `mutation UpdateCdetails(
  $condition: ModelCdetailsConditionInput
  $input: UpdateCdetailsInput!
) {
  updateCdetails(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCdetailsMutationVariables,
  APITypes.UpdateCdetailsMutation
>;
export const updateCustomer = /* GraphQL */ `mutation UpdateCustomer(
  $condition: ModelCustomerConditionInput
  $input: UpdateCustomerInput!
) {
  updateCustomer(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateCustomerMutationVariables,
  APITypes.UpdateCustomerMutation
>;
export const updateHomePageProducts = /* GraphQL */ `mutation UpdateHomePageProducts(
  $condition: ModelHomePageProductsConditionInput
  $input: UpdateHomePageProductsInput!
) {
  updateHomePageProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateHomePageProductsMutationVariables,
  APITypes.UpdateHomePageProductsMutation
>;
export const updateOrders = /* GraphQL */ `mutation UpdateOrders(
  $condition: ModelOrdersConditionInput
  $input: UpdateOrdersInput!
) {
  updateOrders(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateOrdersMutationVariables,
  APITypes.UpdateOrdersMutation
>;
export const updateProducts = /* GraphQL */ `mutation UpdateProducts(
  $condition: ModelProductsConditionInput
  $input: UpdateProductsInput!
) {
  updateProducts(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateProductsMutationVariables,
  APITypes.UpdateProductsMutation
>;
