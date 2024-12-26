import { defineAuth } from '@aws-amplify/backend';


export const auth = defineAuth({
  name : "tanzo-web",
  loginWith: {
    email: true,
  },
  groups: ["ADMINS"]
});
