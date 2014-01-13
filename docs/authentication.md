### Authentication

Application authentication uses [PassportJS](http://passportjs.org/)

There are four authentication strategies:

* Local
* Facebook
* Google
* Github

A user can have more than one provider - the email address is the unique value that providers are associated with.

Here's an example of an account using the Passport `local` strategy:


    {
            "email" : "net@citizen.com",
            "currentProvider" : "local",
            "providers" : {
                    "local" : {
                            "password" : "c2NyeXB0AAwAAAAIAAAAAduYWT+lA7NjIMTouADDN+O3xIxdAJ9lzQrBKdVMFvhIGfSS6EAnKfBE0rM9T0tC5ZgQL++3sN11VEl46RlSLdUuanV0YqzQg1EfnX2tMmxB",
                            "username" : "netcitizen",
                            "name" : "Net Citizen"
                    }
            },
            "_id" : ObjectId("52cb50966842230b79d7f7ca"),
            "__v" : 0
    }


Here's an example of an account with `local` and `google` strategies:


    {
            "email" : "net@citizen.com",
            "currentProvider" : "local",
            "providers" : {
                    "local" : {
                            "password" : "c2NyeXB0AAwAAAAIAAAAAduYWT+lA7NjIMTouADDN+O3xIxdAJ9lzQrBKdVMFvhIGfSS6EAnKfBE0rM9T0tC5ZgQL++3sN11VEl46RlSLdUuanV0YqzQg1EfnX2tMmxB",
                            "username" : "netcitizen",
                            "name" : "Net Citizen"
                    },
                    "google" : {
                           "username" : "Net Citizen",
                           "name" : "Net Citizen"
                    }
            },
            "_id" : ObjectId("52cb50966842230b79d7f7ca"),
            "__v" : 0
    }

It's important to note the `local` strategy is basic without many essential features like password recovery or password reset (you can build these if you wish).

For this reason it's recommended to use the `local` strategy only in development mode.

Also note a user can have more than one login provider but:

1. A user can start with a local provider then add social login providers.

2. A user cannot add a local provider to already existing social providers.

Authentication providers that do not provide the user's email address do not currently integrate with this system (Ex: Twitter).

As there are can be more than one provider for an account the `currentProvider` field is used and updated with each user session.

This allows for accurate access to value's like the `name`. Here's a code example accessing the signed in user's `name`

    user.providers[user.currentProvider].name

