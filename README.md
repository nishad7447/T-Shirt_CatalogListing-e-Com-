# Documentation: Core Functionality and Technology of the T-Shirt Catalog Application

## Table of Contents
1. [Overview](#overview)
2. [Components](#components)
   - [Home](#home)
   - [ProductList](#productlist)
   - [Cart](#cart)
   - [SearchBar](#searchbar)
   - [Filters](#filters)
   - [ProductDetail](#productdetail)
3. [Key Features](#key-features)
4. [State Management](#state-management)
5. [User Interactions](#user-interactions)
6. [Styling and Animations](#styling-and-animations)

## Overview

The T-Shirt Catalog application is a React-based e-commerce platform that allows users to browse, search, filter, and purchase t-shirts. It features a responsive design, interactive UI elements, and smooth animations to enhance the user experience.

## Components

### Home

The main component that orchestrates the entire application.

**Key Responsibilities:**
- Manages the overall state of the application
- Handles product filtering and searching
- Manages the shopping cart
- Coordinates interactions between child components

**State:**
- `products`: Array of all available products
- `filteredProducts`: Array of products after applying filters
- `cart`: Array of products in the shopping cart
- `isCartOpen`: Boolean to control cart visibility
- `selectedProduct`: Currently selected product for detailed view

**Key Methods:**
- `handleSearch`: Filters products based on search term
- `handleFilter`: Applies filters to the product list
- `addToCart`: Adds a product to the cart
- `removeFromCart`: Removes a product from the cart
- `updateCartItemQuantity`: Updates the quantity of a cart item

### ProductList

Displays the list of products in a grid layout with pagination.

**Props:**
- `products`: Array of products to display
- `addToCart`: Function to add a product to the cart
- `onProductSelect`: Function to handle product selection for detailed view

**Key Features:**
- Pagination with customizable items per page
- Quick add to cart functionality
- Animated product cards

### Cart

Displays the shopping cart with added products and total amount.

**Props:**
- `cart`: Array of products in the cart
- `removeFromCart`: Function to remove a product from the cart
- `updateCartItemQuantity`: Function to update product quantity
- `totalAmount`: Total cost of items in the cart
- `onClose`: Function to close the cart

**Key Features:**
- Animated cart opening and closing
- Quantity adjustment for cart items
- Remove items from cart
- Display total amount

### SearchBar

Allows users to search for products.

**Props:**
- `onSearch`: Function to handle search queries

**Key Features:**
- Debounced search input
- Responsive design for mobile and desktop

### Filters

Provides filtering options for the product list.

**Props:**
- `onFilter`: Function to apply filters

**Key Features:**
- Filter by gender, color, price range, and product type
- Collapsible filter sections
- Reset filters functionality

### ProductDetail

Displays detailed information about a selected product.

**Props:**
- `product`: Selected product to display
- `addToCart`: Function to add the product to cart
- `onBack`: Function to return to the product list

**Key Features:**
- Detailed product information display
- Size selection
- Quantity adjustment
- Add to cart functionality

## Key Features

1. **Responsive Design**: The application is fully responsive and works well on both desktop and mobile devices.
2. **Interactive UI**: Utilizes Framer Motion for smooth animations and transitions.
3. **Real-time Filtering and Searching**: Products are filtered and searched in real-time as the user interacts with the UI.
4. **Shopping Cart**: Fully functional shopping cart with add, remove, and quantity adjustment capabilities.
5. **Pagination**: Product list includes pagination for better performance and user experience.
6. **Toast Notifications**: Uses react-hot-toast for informative and non-intrusive notifications.

## State Management

The application uses React's useState and useEffect hooks for state management. Key state elements include:

- Product list and filtered products
- Shopping cart items
- UI states (cart open/closed, selected product, etc.)

## User Interactions

1. **Browsing Products**: Users can scroll through the paginated product list.
2. **Searching**: Users can search for products using the search bar.
3. **Filtering**: Users can apply filters to narrow down the product list.
4. **Adding to Cart**: Products can be added to the cart from both the list and detail views.
5. **Cart Management**: Users can adjust quantities and remove items from the cart.
6. **Viewing Product Details**: Clicking on a product opens a detailed view.

## Styling and Animations

- The application uses Tailwind CSS for styling, providing a clean and modern look.
- Framer Motion is used for animations, providing smooth transitions and micro-interactions throughout the app.
- The color scheme is primarily dark, with accent colors for important actions and notifications.
