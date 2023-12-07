# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index -- /allproducts [GET]
- Show -- /product/:id [GET]
- Create [token required] /product/create [POST]
- [OPTIONAL] Top 5 most popular products /product/:id?limit=5&order=DESC [GET]
- [OPTIONAL] Products by category (args: product category) /products?cat=' ' [GET]

#### Users

- Index [token required] allusers [GET]
- Show [token required] user/:id [GET]
- Create N[token required] user/create [POST]

#### Orders

- Current Order by user (args: user id)[token required] user/orders/current/:id [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] user/orders/completed/:id [GET]

## Database Schema

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Data Shapes

- users

  - `id` SERIAL PRIMARY KEY,
  - `firstName` VARCHAR(100) NOT NULL,
  - `lastName` VARCHAR(100) NOT NULL,
  - `password` TEXT NOT NULL

####

- products

  - `id` SERIAL PRIMARY KEY,
  - `name` VARCHAR(100) NOT NULL,
  - `price` DECIMAL NOT NULL,
  - `category` VARCHAR(100)

- orders
  - `id` SERIAL PRIMARY KEY,
  - `product_id` INTEGER NOT NULL REFERENCES products(id),
  - `quantity` INTEGER NOT NULL,
  - `user_id` INTEGER NOT NULL REFERENCES users(id),
  - `status` VARCHAR(50) CHECK (status IN ('active', 'complete')) NOT NULL
