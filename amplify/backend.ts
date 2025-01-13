import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { createorder } from './function/createorder/resources';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { confirmorder } from './function/confirmOrder/resources';
import { deletecartitem } from './function/deletecartitem/resources';
import { uploadimagestoR2 } from './function/uploadimagetoR2/resources';
const backend = defineBackend({
  auth,
  data,
  storage,
  createorder,
  confirmorder,
  deletecartitem,
  uploadimagestoR2
});


const cfWebhookurlobj = backend.confirmorder.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})

const uploadimgaes = backend.uploadimagestoR2.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})

backend.addOutput({
  custom: {
    confirmorder: cfWebhookurlobj.url,
    uploadimages :uploadimgaes.url
  }
})
