# 🪧 Express 3 item shop

## 📋 About

Learning node express routing with parameters.

This is simple 3 item shop, buy 1 item at a time, save order info, display orders, and change order status.

Database - json file;

🎯 **Goals:**

[link to task (lt)](./README-task-lt.md)

### Task

1. Create shopping cart with three chosen items. Show "Buy" button near every item. Click on the "Buy" button should redirect user to the payment page:

   where user has to be able to enter/choose name, surname, payment type(Paypal, Mastercard, Visa), delivery method (home, parcel locker);
   Save order details in database.json file.Inform user about successful order with message 'Your goods will be delivered in three days'.
   Save sold item in already saved file.

2. Create manager page, with all orders displayed.
   Every new order should get status 'Preparing' by default.
   Create functionality for a manager to change order status from 'preparing' to 'sent'.

### 🏁 Getting started

**Must have [Node.js](https://nodejs.org)** installed

1. Clone the repo
2. Go into project directory and Install NPM packages

   ```sh
   npm install
   ```

3. use application:

   ```sh
   npm start
   ```
