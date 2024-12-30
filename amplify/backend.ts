import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { createorder } from './function/createorder/resources';
defineBackend({
  auth,
  data,
  storage,
  createorder
});
