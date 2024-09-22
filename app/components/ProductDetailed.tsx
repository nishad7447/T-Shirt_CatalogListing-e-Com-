"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowLeft, Star, Plus, Minus } from "lucide-react";
import { Product } from "../type";
import Image from "next/image";

type ProductDetailProps = {
  product: Product;
  addToCart: (product: Product, quantity: number, size: string) => void;
  onBack: () => void;
};

export default function ProductDetail({
  product,
  addToCart,
  onBack,
}: ProductDetailProps) {
  const [selectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, quantity, selectedSize);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-xl overflow-hidden"
          >
            <Image
              src={`/assets/images/${product.name.replace(/ /g, "_")}_${
                product.gender
              }.png`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-gray-400 mb-4">
                {product.price} {product.currency}
              </p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 5 ? "text-yellow-400" : "text-gray-600"
                    }`}
                    fill={i < 5 ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-gray-400">(999 reviews)</span>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                <div className="flex items-center">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-gray-800 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="mx-4 text-xl">{quantity}</span>
                  <motion.button
                    onClick={() =>
                      setQuantity(Math.min(product.quantity, quantity + 1))
                    }
                    className="p-2 bg-gray-800 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isAdded ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-green-600 text-white py-3 px-6 rounded-full text-center"
                >
                  Added to Cart!
                </motion.div>
              ) : (
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || product.quantity === 0}
                  className={`w-full py-3 px-6 rounded-full flex items-center justify-center ${
                    !selectedSize || product.quantity === 0
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
