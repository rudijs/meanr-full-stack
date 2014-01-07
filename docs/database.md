There are mongodb database seeding and drop utility commands available.

Run the bundle command to install Capistrano (Ruby)

    cd meanr-full-stack/
    bundle
    cap development mongodb_seed

Mongodb database collection drop command

    cap development mongodb_drop

The json seed fixtures files are in

    test/fixtures/db

The password for the user "Net Citizen" is `asdf`
