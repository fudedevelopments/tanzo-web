/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Admin = {
  __typename: "Admin",
  admin: string,
  createdAt: string,
  id: string,
  updatedAt: string,
};

export type CartProducts = {
  __typename: "CartProducts",
  cdeatails?: string | null,
  createdAt: string,
  customer?: Customer | null,
  id: string,
  owner?: string | null,
  product?: string | null,
  quantity: number,
  updatedAt: string,
  userId: string,
};

export type Customer = {
  __typename: "Customer",
  cartproducts?: ModelCartProductsConnection | null,
  createdAt: string,
  email: string,
  id: string,
  name?: string | null,
  orders?: ModelOrdersConnection | null,
  owner?: string | null,
  phone?: string | null,
  updatedAt: string,
};

export type ModelCartProductsConnection = {
  __typename: "ModelCartProductsConnection",
  items:  Array<CartProducts | null >,
  nextToken?: string | null,
};

export type ModelOrdersConnection = {
  __typename: "ModelOrdersConnection",
  items:  Array<Orders | null >,
  nextToken?: string | null,
};

export type Orders = {
  __typename: "Orders",
  cdeatails?: string | null,
  createdAt: string,
  customer?: Customer | null,
  id: string,
  owner?: string | null,
  product?: string | null,
  quantity: number,
  updatedAt: string,
  userId: string,
};

export type Categories = {
  __typename: "Categories",
  createdAt: string,
  id: string,
  image: string,
  name: string,
  products?: ModelProductsConnection | null,
  updatedAt: string,
};

export type ModelProductsConnection = {
  __typename: "ModelProductsConnection",
  items:  Array<Products | null >,
  nextToken?: string | null,
};

export type Products = {
  __typename: "Products",
  actualPrice: number,
  category?: Categories | null,
  categoryId?: string | null,
  cdetails?: Cdetails | null,
  createdAt: string,
  description: string,
  homePageProduct?: HomePageProducts | null,
  hpId?: string | null,
  id: string,
  images?: Array< string | null > | null,
  name: string,
  price: number,
  updatedAt: string,
};

export type Cdetails = {
  __typename: "Cdetails",
  cId?: string | null,
  cNotePoints?: string | null,
  cdescription?: string | null,
  createdAt: string,
  id: string,
  isImageRequired?: boolean | null,
  isSpotify?: boolean | null,
  pDimensions?: string | null,
  product?: Products | null,
  requiredImages?: number | null,
  textRequired?: boolean | null,
  updatedAt: string,
};

export type HomePageProducts = {
  __typename: "HomePageProducts",
  createdAt: string,
  id: string,
  products?: ModelProductsConnection | null,
  title: string,
  updatedAt: string,
};

export type CdetCustomer = {
  __typename: "CdetCustomer",
  createdAt: string,
  id: string,
  images?: Array< string | null > | null,
  owner?: string | null,
  spotifySong?: string | null,
  text?: string | null,
  updatedAt: string,
};

export type ModelAdminFilterInput = {
  admin?: ModelStringInput | null,
  and?: Array< ModelAdminFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAdminFilterInput | null,
  or?: Array< ModelAdminFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelAdminConnection = {
  __typename: "ModelAdminConnection",
  items:  Array<Admin | null >,
  nextToken?: string | null,
};

export type ModelCartProductsFilterInput = {
  and?: Array< ModelCartProductsFilterInput | null > | null,
  cdeatails?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelCartProductsFilterInput | null,
  or?: Array< ModelCartProductsFilterInput | null > | null,
  owner?: ModelStringInput | null,
  product?: ModelStringInput | null,
  quantity?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelCategoriesFilterInput = {
  and?: Array< ModelCategoriesFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCategoriesFilterInput | null,
  or?: Array< ModelCategoriesFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCategoriesConnection = {
  __typename: "ModelCategoriesConnection",
  items:  Array<Categories | null >,
  nextToken?: string | null,
};

export type ModelCdetCustomerFilterInput = {
  and?: Array< ModelCdetCustomerFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  images?: ModelStringInput | null,
  not?: ModelCdetCustomerFilterInput | null,
  or?: Array< ModelCdetCustomerFilterInput | null > | null,
  owner?: ModelStringInput | null,
  spotifySong?: ModelStringInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCdetCustomerConnection = {
  __typename: "ModelCdetCustomerConnection",
  items:  Array<CdetCustomer | null >,
  nextToken?: string | null,
};

export type ModelCdetailsFilterInput = {
  and?: Array< ModelCdetailsFilterInput | null > | null,
  cId?: ModelIDInput | null,
  cNotePoints?: ModelStringInput | null,
  cdescription?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isImageRequired?: ModelBooleanInput | null,
  isSpotify?: ModelBooleanInput | null,
  not?: ModelCdetailsFilterInput | null,
  or?: Array< ModelCdetailsFilterInput | null > | null,
  pDimensions?: ModelStringInput | null,
  requiredImages?: ModelFloatInput | null,
  textRequired?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelCdetailsConnection = {
  __typename: "ModelCdetailsConnection",
  items:  Array<Cdetails | null >,
  nextToken?: string | null,
};

export type ModelCustomerFilterInput = {
  and?: Array< ModelCustomerFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCustomerFilterInput | null,
  or?: Array< ModelCustomerFilterInput | null > | null,
  owner?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection",
  items:  Array<Customer | null >,
  nextToken?: string | null,
};

export type ModelHomePageProductsFilterInput = {
  and?: Array< ModelHomePageProductsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelHomePageProductsFilterInput | null,
  or?: Array< ModelHomePageProductsFilterInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelHomePageProductsConnection = {
  __typename: "ModelHomePageProductsConnection",
  items:  Array<HomePageProducts | null >,
  nextToken?: string | null,
};

export type ModelOrdersFilterInput = {
  and?: Array< ModelOrdersFilterInput | null > | null,
  cdeatails?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelOrdersFilterInput | null,
  or?: Array< ModelOrdersFilterInput | null > | null,
  owner?: ModelStringInput | null,
  product?: ModelStringInput | null,
  quantity?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelProductsFilterInput = {
  actualPrice?: ModelFloatInput | null,
  and?: Array< ModelProductsFilterInput | null > | null,
  categoryId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  hpId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  images?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelProductsFilterInput | null,
  or?: Array< ModelProductsFilterInput | null > | null,
  price?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelAdminConditionInput = {
  admin?: ModelStringInput | null,
  and?: Array< ModelAdminConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelAdminConditionInput | null,
  or?: Array< ModelAdminConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateAdminInput = {
  admin: string,
  id?: string | null,
};

export type ModelCartProductsConditionInput = {
  and?: Array< ModelCartProductsConditionInput | null > | null,
  cdeatails?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelCartProductsConditionInput | null,
  or?: Array< ModelCartProductsConditionInput | null > | null,
  owner?: ModelStringInput | null,
  product?: ModelStringInput | null,
  quantity?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateCartProductsInput = {
  cdeatails?: string | null,
  id?: string | null,
  product?: string | null,
  quantity: number,
  userId: string,
};

export type ModelCategoriesConditionInput = {
  and?: Array< ModelCategoriesConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  image?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCategoriesConditionInput | null,
  or?: Array< ModelCategoriesConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCategoriesInput = {
  id?: string | null,
  image: string,
  name: string,
};

export type ModelCdetCustomerConditionInput = {
  and?: Array< ModelCdetCustomerConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  images?: ModelStringInput | null,
  not?: ModelCdetCustomerConditionInput | null,
  or?: Array< ModelCdetCustomerConditionInput | null > | null,
  owner?: ModelStringInput | null,
  spotifySong?: ModelStringInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCdetCustomerInput = {
  id?: string | null,
  images?: Array< string | null > | null,
  spotifySong?: string | null,
  text?: string | null,
};

export type ModelCdetailsConditionInput = {
  and?: Array< ModelCdetailsConditionInput | null > | null,
  cId?: ModelIDInput | null,
  cNotePoints?: ModelStringInput | null,
  cdescription?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  isImageRequired?: ModelBooleanInput | null,
  isSpotify?: ModelBooleanInput | null,
  not?: ModelCdetailsConditionInput | null,
  or?: Array< ModelCdetailsConditionInput | null > | null,
  pDimensions?: ModelStringInput | null,
  requiredImages?: ModelFloatInput | null,
  textRequired?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCdetailsInput = {
  cId?: string | null,
  cNotePoints?: string | null,
  cdescription?: string | null,
  id?: string | null,
  isImageRequired?: boolean | null,
  isSpotify?: boolean | null,
  pDimensions?: string | null,
  requiredImages?: number | null,
  textRequired?: boolean | null,
};

export type ModelCustomerConditionInput = {
  and?: Array< ModelCustomerConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelCustomerConditionInput | null,
  or?: Array< ModelCustomerConditionInput | null > | null,
  owner?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCustomerInput = {
  email: string,
  id?: string | null,
  name?: string | null,
  phone?: string | null,
};

export type ModelHomePageProductsConditionInput = {
  and?: Array< ModelHomePageProductsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelHomePageProductsConditionInput | null,
  or?: Array< ModelHomePageProductsConditionInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateHomePageProductsInput = {
  id?: string | null,
  title: string,
};

export type ModelOrdersConditionInput = {
  and?: Array< ModelOrdersConditionInput | null > | null,
  cdeatails?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelOrdersConditionInput | null,
  or?: Array< ModelOrdersConditionInput | null > | null,
  owner?: ModelStringInput | null,
  product?: ModelStringInput | null,
  quantity?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateOrdersInput = {
  cdeatails?: string | null,
  id?: string | null,
  product?: string | null,
  quantity: number,
  userId: string,
};

export type ModelProductsConditionInput = {
  actualPrice?: ModelFloatInput | null,
  and?: Array< ModelProductsConditionInput | null > | null,
  categoryId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  hpId?: ModelIDInput | null,
  images?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelProductsConditionInput | null,
  or?: Array< ModelProductsConditionInput | null > | null,
  price?: ModelFloatInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateProductsInput = {
  actualPrice: number,
  categoryId?: string | null,
  description: string,
  hpId?: string | null,
  id?: string | null,
  images?: Array< string | null > | null,
  name: string,
  price: number,
};

export type DeleteAdminInput = {
  id: string,
};

export type DeleteCartProductsInput = {
  id: string,
};

export type DeleteCategoriesInput = {
  id: string,
};

export type DeleteCdetCustomerInput = {
  id: string,
};

export type DeleteCdetailsInput = {
  id: string,
};

export type DeleteCustomerInput = {
  id: string,
};

export type DeleteHomePageProductsInput = {
  id: string,
};

export type DeleteOrdersInput = {
  id: string,
};

export type DeleteProductsInput = {
  id: string,
};

export type UpdateAdminInput = {
  admin?: string | null,
  id: string,
};

export type UpdateCartProductsInput = {
  cdeatails?: string | null,
  id: string,
  product?: string | null,
  quantity?: number | null,
  userId?: string | null,
};

export type UpdateCategoriesInput = {
  id: string,
  image?: string | null,
  name?: string | null,
};

export type UpdateCdetCustomerInput = {
  id: string,
  images?: Array< string | null > | null,
  spotifySong?: string | null,
  text?: string | null,
};

export type UpdateCdetailsInput = {
  cId?: string | null,
  cNotePoints?: string | null,
  cdescription?: string | null,
  id: string,
  isImageRequired?: boolean | null,
  isSpotify?: boolean | null,
  pDimensions?: string | null,
  requiredImages?: number | null,
  textRequired?: boolean | null,
};

export type UpdateCustomerInput = {
  email?: string | null,
  id: string,
  name?: string | null,
  phone?: string | null,
};

export type UpdateHomePageProductsInput = {
  id: string,
  title?: string | null,
};

export type UpdateOrdersInput = {
  cdeatails?: string | null,
  id: string,
  product?: string | null,
  quantity?: number | null,
  userId?: string | null,
};

export type UpdateProductsInput = {
  actualPrice?: number | null,
  categoryId?: string | null,
  description?: string | null,
  hpId?: string | null,
  id: string,
  images?: Array< string | null > | null,
  name?: string | null,
  price?: number | null,
};

export type ModelSubscriptionAdminFilterInput = {
  admin?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCartProductsFilterInput = {
  and?: Array< ModelSubscriptionCartProductsFilterInput | null > | null,
  cdeatails?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionCartProductsFilterInput | null > | null,
  owner?: ModelStringInput | null,
  product?: ModelSubscriptionStringInput | null,
  quantity?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionCategoriesFilterInput = {
  and?: Array< ModelSubscriptionCategoriesFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCategoriesFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCdetCustomerFilterInput = {
  and?: Array< ModelSubscriptionCdetCustomerFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  images?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCdetCustomerFilterInput | null > | null,
  owner?: ModelStringInput | null,
  spotifySong?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionCdetailsFilterInput = {
  and?: Array< ModelSubscriptionCdetailsFilterInput | null > | null,
  cId?: ModelSubscriptionIDInput | null,
  cNotePoints?: ModelSubscriptionStringInput | null,
  cdescription?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isImageRequired?: ModelSubscriptionBooleanInput | null,
  isSpotify?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionCdetailsFilterInput | null > | null,
  pDimensions?: ModelSubscriptionStringInput | null,
  requiredImages?: ModelSubscriptionFloatInput | null,
  textRequired?: ModelSubscriptionBooleanInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionCustomerFilterInput = {
  and?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  owner?: ModelStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionHomePageProductsFilterInput = {
  and?: Array< ModelSubscriptionHomePageProductsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionHomePageProductsFilterInput | null > | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionOrdersFilterInput = {
  and?: Array< ModelSubscriptionOrdersFilterInput | null > | null,
  cdeatails?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionOrdersFilterInput | null > | null,
  owner?: ModelStringInput | null,
  product?: ModelSubscriptionStringInput | null,
  quantity?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionProductsFilterInput = {
  actualPrice?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionProductsFilterInput | null > | null,
  categoryId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  hpId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  images?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionProductsFilterInput | null > | null,
  price?: ModelSubscriptionFloatInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type CreateOrderCFQueryVariables = {
  customerEmail: string,
  customerId: string,
  customerName: string,
  customerPhone: string,
  order_amount: number,
};

export type CreateOrderCFQuery = {
  createOrderCF?: string | null,
};

export type GetAdminQueryVariables = {
  id: string,
};

export type GetAdminQuery = {
  getAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type GetCartProductsQueryVariables = {
  id: string,
};

export type GetCartProductsQuery = {
  getCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetCategoriesQueryVariables = {
  id: string,
};

export type GetCategoriesQuery = {
  getCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetCdetCustomerQueryVariables = {
  id: string,
};

export type GetCdetCustomerQuery = {
  getCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type GetCdetailsQueryVariables = {
  id: string,
};

export type GetCdetailsQuery = {
  getCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type GetCustomerQueryVariables = {
  id: string,
};

export type GetCustomerQuery = {
  getCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type GetHomePageProductsQueryVariables = {
  id: string,
};

export type GetHomePageProductsQuery = {
  getHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type GetOrdersQueryVariables = {
  id: string,
};

export type GetOrdersQuery = {
  getOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type GetProductsQueryVariables = {
  id: string,
};

export type GetProductsQuery = {
  getProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};

export type ListAdminsQueryVariables = {
  filter?: ModelAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdminsQuery = {
  listAdmins?:  {
    __typename: "ModelAdminConnection",
    items:  Array< {
      __typename: "Admin",
      admin: string,
      createdAt: string,
      id: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCartProductsQueryVariables = {
  filter?: ModelCartProductsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCartProductsQuery = {
  listCartProducts?:  {
    __typename: "ModelCartProductsConnection",
    items:  Array< {
      __typename: "CartProducts",
      cdeatails?: string | null,
      createdAt: string,
      id: string,
      owner?: string | null,
      product?: string | null,
      quantity: number,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoriesConnection",
    items:  Array< {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCdetCustomersQueryVariables = {
  filter?: ModelCdetCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCdetCustomersQuery = {
  listCdetCustomers?:  {
    __typename: "ModelCdetCustomerConnection",
    items:  Array< {
      __typename: "CdetCustomer",
      createdAt: string,
      id: string,
      images?: Array< string | null > | null,
      owner?: string | null,
      spotifySong?: string | null,
      text?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCdetailsQueryVariables = {
  filter?: ModelCdetailsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCdetailsQuery = {
  listCdetails?:  {
    __typename: "ModelCdetailsConnection",
    items:  Array< {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListCustomersQueryVariables = {
  filter?: ModelCustomerFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCustomersQuery = {
  listCustomers?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListHomePageProductsQueryVariables = {
  filter?: ModelHomePageProductsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHomePageProductsQuery = {
  listHomePageProducts?:  {
    __typename: "ModelHomePageProductsConnection",
    items:  Array< {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrdersQueryVariables = {
  filter?: ModelOrdersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersQuery = {
  listOrders?:  {
    __typename: "ModelOrdersConnection",
    items:  Array< {
      __typename: "Orders",
      cdeatails?: string | null,
      createdAt: string,
      id: string,
      owner?: string | null,
      product?: string | null,
      quantity: number,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductsConnection",
    items:  Array< {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: CreateAdminInput,
};

export type CreateAdminMutation = {
  createAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type CreateCartProductsMutationVariables = {
  condition?: ModelCartProductsConditionInput | null,
  input: CreateCartProductsInput,
};

export type CreateCartProductsMutation = {
  createCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateCategoriesMutationVariables = {
  condition?: ModelCategoriesConditionInput | null,
  input: CreateCategoriesInput,
};

export type CreateCategoriesMutation = {
  createCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateCdetCustomerMutationVariables = {
  condition?: ModelCdetCustomerConditionInput | null,
  input: CreateCdetCustomerInput,
};

export type CreateCdetCustomerMutation = {
  createCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateCdetailsMutationVariables = {
  condition?: ModelCdetailsConditionInput | null,
  input: CreateCdetailsInput,
};

export type CreateCdetailsMutation = {
  createCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type CreateCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: CreateCustomerInput,
};

export type CreateCustomerMutation = {
  createCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateHomePageProductsMutationVariables = {
  condition?: ModelHomePageProductsConditionInput | null,
  input: CreateHomePageProductsInput,
};

export type CreateHomePageProductsMutation = {
  createHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type CreateOrdersMutationVariables = {
  condition?: ModelOrdersConditionInput | null,
  input: CreateOrdersInput,
};

export type CreateOrdersMutation = {
  createOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type CreateProductsMutationVariables = {
  condition?: ModelProductsConditionInput | null,
  input: CreateProductsInput,
};

export type CreateProductsMutation = {
  createProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};

export type DeleteAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: DeleteAdminInput,
};

export type DeleteAdminMutation = {
  deleteAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type DeleteCartProductsMutationVariables = {
  condition?: ModelCartProductsConditionInput | null,
  input: DeleteCartProductsInput,
};

export type DeleteCartProductsMutation = {
  deleteCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteCategoriesMutationVariables = {
  condition?: ModelCategoriesConditionInput | null,
  input: DeleteCategoriesInput,
};

export type DeleteCategoriesMutation = {
  deleteCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteCdetCustomerMutationVariables = {
  condition?: ModelCdetCustomerConditionInput | null,
  input: DeleteCdetCustomerInput,
};

export type DeleteCdetCustomerMutation = {
  deleteCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteCdetailsMutationVariables = {
  condition?: ModelCdetailsConditionInput | null,
  input: DeleteCdetailsInput,
};

export type DeleteCdetailsMutation = {
  deleteCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: DeleteCustomerInput,
};

export type DeleteCustomerMutation = {
  deleteCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteHomePageProductsMutationVariables = {
  condition?: ModelHomePageProductsConditionInput | null,
  input: DeleteHomePageProductsInput,
};

export type DeleteHomePageProductsMutation = {
  deleteHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrdersMutationVariables = {
  condition?: ModelOrdersConditionInput | null,
  input: DeleteOrdersInput,
};

export type DeleteOrdersMutation = {
  deleteOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteProductsMutationVariables = {
  condition?: ModelProductsConditionInput | null,
  input: DeleteProductsInput,
};

export type DeleteProductsMutation = {
  deleteProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};

export type UpdateAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: UpdateAdminInput,
};

export type UpdateAdminMutation = {
  updateAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type UpdateCartProductsMutationVariables = {
  condition?: ModelCartProductsConditionInput | null,
  input: UpdateCartProductsInput,
};

export type UpdateCartProductsMutation = {
  updateCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateCategoriesMutationVariables = {
  condition?: ModelCategoriesConditionInput | null,
  input: UpdateCategoriesInput,
};

export type UpdateCategoriesMutation = {
  updateCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateCdetCustomerMutationVariables = {
  condition?: ModelCdetCustomerConditionInput | null,
  input: UpdateCdetCustomerInput,
};

export type UpdateCdetCustomerMutation = {
  updateCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateCdetailsMutationVariables = {
  condition?: ModelCdetailsConditionInput | null,
  input: UpdateCdetailsInput,
};

export type UpdateCdetailsMutation = {
  updateCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  condition?: ModelCustomerConditionInput | null,
  input: UpdateCustomerInput,
};

export type UpdateCustomerMutation = {
  updateCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateHomePageProductsMutationVariables = {
  condition?: ModelHomePageProductsConditionInput | null,
  input: UpdateHomePageProductsInput,
};

export type UpdateHomePageProductsMutation = {
  updateHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrdersMutationVariables = {
  condition?: ModelOrdersConditionInput | null,
  input: UpdateOrdersInput,
};

export type UpdateOrdersMutation = {
  updateOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateProductsMutationVariables = {
  condition?: ModelProductsConditionInput | null,
  input: UpdateProductsInput,
};

export type UpdateProductsMutation = {
  updateProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};

export type OnCreateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnCreateAdminSubscription = {
  onCreateAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCartProductsSubscriptionVariables = {
  filter?: ModelSubscriptionCartProductsFilterInput | null,
  owner?: string | null,
};

export type OnCreateCartProductsSubscription = {
  onCreateCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateCategoriesSubscriptionVariables = {
  filter?: ModelSubscriptionCategoriesFilterInput | null,
};

export type OnCreateCategoriesSubscription = {
  onCreateCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCdetCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCdetCustomerFilterInput | null,
  owner?: string | null,
};

export type OnCreateCdetCustomerSubscription = {
  onCreateCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCdetailsSubscriptionVariables = {
  filter?: ModelSubscriptionCdetailsFilterInput | null,
};

export type OnCreateCdetailsSubscription = {
  onCreateCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
  owner?: string | null,
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateHomePageProductsSubscriptionVariables = {
  filter?: ModelSubscriptionHomePageProductsFilterInput | null,
};

export type OnCreateHomePageProductsSubscription = {
  onCreateHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOrdersSubscriptionVariables = {
  filter?: ModelSubscriptionOrdersFilterInput | null,
  owner?: string | null,
};

export type OnCreateOrdersSubscription = {
  onCreateOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateProductsSubscriptionVariables = {
  filter?: ModelSubscriptionProductsFilterInput | null,
};

export type OnCreateProductsSubscription = {
  onCreateProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnDeleteAdminSubscription = {
  onDeleteAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCartProductsSubscriptionVariables = {
  filter?: ModelSubscriptionCartProductsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCartProductsSubscription = {
  onDeleteCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteCategoriesSubscriptionVariables = {
  filter?: ModelSubscriptionCategoriesFilterInput | null,
};

export type OnDeleteCategoriesSubscription = {
  onDeleteCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCdetCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCdetCustomerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCdetCustomerSubscription = {
  onDeleteCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCdetailsSubscriptionVariables = {
  filter?: ModelSubscriptionCdetailsFilterInput | null,
};

export type OnDeleteCdetailsSubscription = {
  onDeleteCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteHomePageProductsSubscriptionVariables = {
  filter?: ModelSubscriptionHomePageProductsFilterInput | null,
};

export type OnDeleteHomePageProductsSubscription = {
  onDeleteHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrdersSubscriptionVariables = {
  filter?: ModelSubscriptionOrdersFilterInput | null,
  owner?: string | null,
};

export type OnDeleteOrdersSubscription = {
  onDeleteOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteProductsSubscriptionVariables = {
  filter?: ModelSubscriptionProductsFilterInput | null,
};

export type OnDeleteProductsSubscription = {
  onDeleteProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnUpdateAdminSubscription = {
  onUpdateAdmin?:  {
    __typename: "Admin",
    admin: string,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCartProductsSubscriptionVariables = {
  filter?: ModelSubscriptionCartProductsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCartProductsSubscription = {
  onUpdateCartProducts?:  {
    __typename: "CartProducts",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateCategoriesSubscriptionVariables = {
  filter?: ModelSubscriptionCategoriesFilterInput | null,
};

export type OnUpdateCategoriesSubscription = {
  onUpdateCategories?:  {
    __typename: "Categories",
    createdAt: string,
    id: string,
    image: string,
    name: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCdetCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCdetCustomerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCdetCustomerSubscription = {
  onUpdateCdetCustomer?:  {
    __typename: "CdetCustomer",
    createdAt: string,
    id: string,
    images?: Array< string | null > | null,
    owner?: string | null,
    spotifySong?: string | null,
    text?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCdetailsSubscriptionVariables = {
  filter?: ModelSubscriptionCdetailsFilterInput | null,
};

export type OnUpdateCdetailsSubscription = {
  onUpdateCdetails?:  {
    __typename: "Cdetails",
    cId?: string | null,
    cNotePoints?: string | null,
    cdescription?: string | null,
    createdAt: string,
    id: string,
    isImageRequired?: boolean | null,
    isSpotify?: boolean | null,
    pDimensions?: string | null,
    product?:  {
      __typename: "Products",
      actualPrice: number,
      categoryId?: string | null,
      createdAt: string,
      description: string,
      hpId?: string | null,
      id: string,
      images?: Array< string | null > | null,
      name: string,
      price: number,
      updatedAt: string,
    } | null,
    requiredImages?: number | null,
    textRequired?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer?:  {
    __typename: "Customer",
    cartproducts?:  {
      __typename: "ModelCartProductsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    email: string,
    id: string,
    name?: string | null,
    orders?:  {
      __typename: "ModelOrdersConnection",
      nextToken?: string | null,
    } | null,
    owner?: string | null,
    phone?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateHomePageProductsSubscriptionVariables = {
  filter?: ModelSubscriptionHomePageProductsFilterInput | null,
};

export type OnUpdateHomePageProductsSubscription = {
  onUpdateHomePageProducts?:  {
    __typename: "HomePageProducts",
    createdAt: string,
    id: string,
    products?:  {
      __typename: "ModelProductsConnection",
      nextToken?: string | null,
    } | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrdersSubscriptionVariables = {
  filter?: ModelSubscriptionOrdersFilterInput | null,
  owner?: string | null,
};

export type OnUpdateOrdersSubscription = {
  onUpdateOrders?:  {
    __typename: "Orders",
    cdeatails?: string | null,
    createdAt: string,
    customer?:  {
      __typename: "Customer",
      createdAt: string,
      email: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      phone?: string | null,
      updatedAt: string,
    } | null,
    id: string,
    owner?: string | null,
    product?: string | null,
    quantity: number,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateProductsSubscriptionVariables = {
  filter?: ModelSubscriptionProductsFilterInput | null,
};

export type OnUpdateProductsSubscription = {
  onUpdateProducts?:  {
    __typename: "Products",
    actualPrice: number,
    category?:  {
      __typename: "Categories",
      createdAt: string,
      id: string,
      image: string,
      name: string,
      updatedAt: string,
    } | null,
    categoryId?: string | null,
    cdetails?:  {
      __typename: "Cdetails",
      cId?: string | null,
      cNotePoints?: string | null,
      cdescription?: string | null,
      createdAt: string,
      id: string,
      isImageRequired?: boolean | null,
      isSpotify?: boolean | null,
      pDimensions?: string | null,
      requiredImages?: number | null,
      textRequired?: boolean | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    description: string,
    homePageProduct?:  {
      __typename: "HomePageProducts",
      createdAt: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null,
    hpId?: string | null,
    id: string,
    images?: Array< string | null > | null,
    name: string,
    price: number,
    updatedAt: string,
  } | null,
};
