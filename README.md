A NextJS14 app that uses shadCN 

It uses Cognito's hosted UI for auth

In `Amazon Cognito -> User pools -> <Your user pool> -> App integration -> <your app client> -> Hosted UI`,

make sure sure you have the following settings set up correctly:

Allowed callback URLs = http://localhost:3000/api/auth/callback (and more for your own domain)

Allowed sign-out URLs = http://localhost:3000 (and more for your own domain)

Identity providers = Cognito user pool

OAuth 2.0 grant types = Authorization code grant

OpenID Connect scopes = Email, OpenID, Profile
