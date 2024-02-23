# YouApp - Backend

### 1. Install nodemon

`npm i -g nodemon`

### 2. Install dependencies

`npm i`

### 3. Configure database

I chose **Supabase** platform to store data.

Steps to reproduce:

- Go to [Supabase](https://supabase.com/) and start your project
- In the [dashboard](https://supabase.com/dashboard/projects) click new project, follow the instructions, generate a password and keep a copy of it
- You need the connection URI for **DATABASE_URL** in **.env** that looks like this:

`postgres://postgres.xqheiejnwcagcolaoahf:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`

- Paste your password into the placeholder without the square brackets, copy the url, and store it in **.env** alongside the **PORT**

```js
DATABASE_URL =
  'postgres://postgres.xqheiejnwcagcolaoahf:dummypassword@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres'

PORT = 8080
```

### 4. Push the tables from the Prisma schema into Supabase

`npx prisma db push`

### 5. Run the application

`npm run start`

### 6. Run the Frontend application

[Clone the project](https://github.com/jiwokristi/youapp-test) and read the **README.md**
