"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  gender: string;
};

type CartProps = {
  cart: { product: Product; quantity: number }[];
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, newQuantity: number) => void;
  totalAmount: number;
  onClose: () => void;
};

export default function Cart({
  cart,
  removeFromCart,
  updateCartItemQuantity,
  totalAmount,
  onClose,
}: CartProps) {
  const handleClose = () => {
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`, {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleUpdateQuantity = (
    productId: number,
    newQuantity: number,
    productName: string
  ) => {
    updateCartItemQuantity(productId, newQuantity);
    toast.success(`${productName} quantity updated`, {
      icon: "🔄",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    handleClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-gray-500 py-8"
              >
                Your cart is empty. Start shopping!
              </motion.p>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={`/assets/images/${item.product.name.replace(
                          / /g,
                          "_"
                        )}_${item.product.gender}.png`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product.price} {item.product.currency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1),
                            item.product.name
                          )
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.product.id,
                            parseInt(e.target.value) || 1,
                            item.product.name
                          )
                        }
                        min="1"
                        max={item.product.quantity}
                        className="w-12 text-center border-x border-gray-300 py-1"
                      />
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            Math.min(item.product.quantity, item.quantity + 1),
                            item.product.name
                          )
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveItem(item.product.id, item.product.name)
                      }
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-gray-900">
              {totalAmount} INR
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Proceed to Checkout
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
