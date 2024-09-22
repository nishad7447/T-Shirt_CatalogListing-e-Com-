"use client";

import { useState } from "react";
import { Product } from "./type";
import Filters from "./components/Filters";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import ProductDetail from "./components/ProductDetailed";
import toast from "react-hot-toast";

const catalogData: Product[] = [
  {
    id: 1,
    name: "Black Polo",
    type: "Polo",
    price: 250,
    currency: "INR",
    color: "Black",
    gender: "Men",
    quantity: 3,
  },
  {
    id: 2,
    name: "Blue Polo",
    type: "Polo",
    price: 350,
    currency: "INR",
    color: "Blue",
    gender: "Women",
    quantity: 3,
  },
  {
    id: 3,
    name: "Pink Polo",
    type: "Polo",
    price: 350,
    currency: "INR",
    color: "Pink",
    gender: "Women",
    quantity: 6,
  },
  {
    id: 4,
    name: "Black Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Black",
    gender: "Men",
    quantity: 2,
  },
  {
    id: 5,
    name: "Green Polo",
    type: "Polo",
    price: 250,
    currency: "INR",
    color: "Green",
    gender: "Men",
    quantity: 1,
  },
  {
    id: 6,
    name: "Green Polo",
    type: "Polo",
    price: 350,
    currency: "INR",
    color: "Green",
    gender: "Women",
    quantity: 1,
  },
  {
    id: 7,
    name: "Blue Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Blue",
    gender: "Women",
    quantity: 2,
  },
  {
    id: 8,
    name: "Black Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Black",
    gender: "Women",
    quantity: 5,
  },
  {
    id: 9,
    name: "Blue Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Blue",
    gender: "Men",
    quantity: 2,
  },
  {
    id: 10,
    name: "Red Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Red",
    gender: "Women",
    quantity: 2,
  },
  {
    id: 11,
    name: "Grey Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Grey",
    gender: "Men",
    quantity: 1,
  },
  {
    id: 12,
    name: "Purple Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Purple",
    gender: "Women",
    quantity: 3,
  },
  {
    id: 13,
    name: "Grey Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Grey",
    gender: "Women",
    quantity: 1,
  },
  {
    id: 14,
    name: "White Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "White",
    gender: "Women",
    quantity: 0,
  },
  {
    id: 15,
    name: "Black Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Black",
    gender: "Men",
    quantity: 7,
  },
  {
    id: 16,
    name: "Purple Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Purple",
    gender: "Men",
    quantity: 1,
  },
  {
    id: 17,
    name: "White Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "White",
    gender: "Men",
    quantity: 2,
  },
  {
    id: 18,
    name: "Blue Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Blue",
    gender: "Women",
    quantity: 3,
  },
  {
    id: 19,
    name: "Yellow Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Yellow",
    gender: "Women",
    quantity: 1,
  },
  {
    id: 20,
    name: "White Polo",
    type: "Polo",
    price: 350,
    currency: "INR",
    color: "White",
    gender: "Women",
    quantity: 4,
  },
  {
    id: 21,
    name: "Red Polo",
    type: "Polo",
    price: 250,
    currency: "INR",
    color: "Red",
    gender: "Men",
    quantity: 2,
  },
  {
    id: 22,
    name: "Blue Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Blue",
    gender: "Men",
    quantity: 0,
  },
  {
    id: 23,
    name: "Grey Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "Grey",
    gender: "Men",
    quantity: 2,
  },
  {
    id: 24,
    name: "Grey Polo",
    type: "Polo",
    price: 300,
    currency: "INR",
    color: "Grey",
    gender: "Men",
    quantity: 3,
  },
  {
    id: 25,
    name: "Red Hoodie",
    type: "Hoodie",
    price: 300,
    currency: "INR",
    color: "Red",
    gender: "Men",
    quantity: 0,
  },
  {
    id: 26,
    name: "White Polo",
    type: "Polo",
    price: 300,
    currency: "INR",
    color: "White",
    gender: "Men",
    quantity: 1,
  },
  {
    id: 27,
    name: "White Hoodie",
    type: "Hoodie",
    price: 500,
    currency: "INR",
    color: "White",
    gender: "Women",
    quantity: 3,
  },
  {
    id: 28,
    name: "Grey Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Grey",
    gender: "Men",
    quantity: 0,
  },
  {
    id: 29,
    name: "Black Round",
    type: "Basic",
    price: 300,
    currency: "INR",
    color: "Black",
    gender: "Women",
    quantity: 0,
  },
  {
    id: 30,
    name: "Black Polo",
    type: "Polo",
    price: 300,
    currency: "INR",
    color: "Black",
    gender: "Women",
    quantity: 4,
  },
];

export default function Home() {
  const [products] = useState<Product[]>(catalogData);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(catalogData);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    []
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (filters: {
    gender?: string;
    color?: string;
    priceRange?: [number, number];
    type?: string;
  }) => {
    let filtered = [...products];

    if (filters.gender) {
      filtered = filtered.filter(
        (product) => product.gender === filters.gender
      );
    }

    if (filters.color) {
      filtered = filtered.filter((product) => product.color === filters.color);
    }

    if (
      filters.priceRange &&
      Array.isArray(filters.priceRange) &&
      filters.priceRange.length === 2
    ) {
      const [minPrice, maxPrice] = filters.priceRange;
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (filters.type) {
      filtered = filtered.filter((product) => product.type === filters.type);
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.quantity) {
        setCart(
          cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        toast.error("Cannot add more items. Maximum quantity reached.", {
          icon: "⚠️",
          style: {
            borderRadius: "10px",
            backgroundColor: "#ffcccb",
            color: "#000",
            border: "1px solid red",
          },
        });
      }
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, newQuantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && newQuantity <= product.quantity) {
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      toast.error("Cannot add more items. Maximum quantity reached.", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          backgroundColor: "#ffcccb",
          color: "#000",
          border: "1px solid red",
        },
      });
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="mx-auto px-4" style={{ backgroundColor: "black" }}>
      <header className="flex justify-between items-center py-4">
        <h1 className="md:text-2xl font-bold md:ml-8">T-Shirt Catalog</h1>
        <div className="flex md:w-1/2">
          <SearchBar onSearch={handleSearch} />
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="text-white px-3 rounded-full flex items-center shadow-2xl"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="text-xl" />
            <sup className="md:mr-2 ml-[-6px] mb-1 text-[7px] bg-red-500 text-white px-[5px] py-[7px] rounded-full transform transition-transform hover:scale-110 shadow-md">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </sup>
            <span className="md:text-lg font-semibold hidden md:block">
              Cart
            </span>
          </motion.button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-4">
        {selectedProduct ? (
          <>
            <ProductDetail
              product={selectedProduct}
              addToCart={addToCart}
              onBack={handleBackToList}
            />
          </>
        ) : (
          <>
            <div className="md:w-1/4">
              <Filters onFilter={handleFilter} />
            </div>
            <div className="md:w-3/4">
              <ProductList
                products={filteredProducts}
                addToCart={addToCart}
                onProductSelect={handleProductSelect}
              />
            </div>
          </>
        )}
      </div>
      {isCartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateCartItemQuantity={updateCartItemQuantity}
          totalAmount={totalAmount}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}
