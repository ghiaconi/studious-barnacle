## Crypto companion

Crypto Companion is an app for viewing prices of crypto tokens.

### Dependencies

Install dependencies

    npm i

This app needs the [coin management api](https://github.com/ghiaconi/coin-management-api) to run and accept connections at localhost:5050, or any location if necessary urls are provided:

    NEXT_PUBLIC_COIN_MAPI_BASE_URL=http://localhost:5050/api/v1
    NEXT_PUBLIC_ADD_TOKENS_URL=http://localhost:5050/api/v1/users/app/tokens/add
    NEXT_PUBLIC_ARCHIVE_TOKENS_URL=http://localhost:5050/api/v1/users/app/tokens/remove
    NEXT_PUBLIC_ACTIVE_TOKENS_URL=http://localhost:5050/api/v1/users/app/monitored_tokens
    NEXT_PUBLIC_ARCHIVED_LIST_URL=http://localhost:5050/api/v1/users/app/archived_tokens

!Make sure you have created an user `app` in the [coin-mapi](https://github.com/ghiaconi/coin-management-api). For now this app does not support user registrations.

Then run the development server:

    npm run dev

Accessible at [http://localhost:3000](http://localhost:3000)
