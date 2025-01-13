import { defineAuth, secret } from '@aws-amplify/backend';


export const auth = defineAuth({
  name : "tanzo-web",
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes : ['email']
      },
      callbackUrls: [
        'http://localhost:3000/',
        'https://tanzo.in/'
      ],
      logoutUrls: ['http://localhost:3000/', 'https://tanzo.in'],
      }
      
    },
    
  
  groups: ["ADMINS"]
});
