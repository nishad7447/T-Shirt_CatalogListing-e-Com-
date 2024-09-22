"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';
import { Product } from "../type";
import Image from "next/image";

type ProductListProps = {
  products: Product[];
  addToCart: (product: Product) => void;
  onProductSelect: (product: Product) => void;
};

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 12, 16, 32];

export default function ProductList({
  products,
  addToCart,
  onProductSelect,
}: ProductListProps) {
  const [clickedProduct, setClickedProduct] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  }, [products, currentPage, itemsPerPage]);

  const handleAddToCart = (product: Product) => {
    if (product.quantity > 0) {
      setClickedProduct(product.id.toString());
      addToCart(product);
      toast.success(`${product.name} added to cart! ✅ `, {
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setTimeout(() => setClickedProduct(null), 1000);
    } else {
      toast.error(`The product is out of stock. We will notify you when it's back in stock.`, {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#FFA500',
          color: '#000',
        },
        duration: 3000,
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    toast.success(`Page ${newPage} loaded`, {
      icon: '📄',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    toast.success(`Now showing ${newItemsPerPage} items per page`, {
      icon: '🔢',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const PaginationControls = () => (
    <div className="flex justify-between items-center w-full max-w-4xl mx-auto py-4">
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 transition-colors duration-300 hover:bg-gray-600"
        >
          <ChevronsLeft className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 transition-colors duration-300 hover:bg-gray-600"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-white text-[9px] sm:text-sm md:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="bg-gray-700 text-white rounded-md p-1 transition-colors duration-300 hover:bg-gray-600 text-xs sm:text-sm md:text-base"
        >
          {ITEMS_PER_PAGE_OPTIONS.map((option) => (
            <option
              key={option}
              value={option}
              className="text-[9px] sm:text-sm md:text-base"
            >
              Show {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 transition-colors duration-300 hover:bg-gray-600"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 transition-colors duration-300 hover:bg-gray-600"
        >
          <ChevronsRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-8">
      <Toaster position="top-center" reverseOrder={false} />
      {currentProducts.length > 0 ? (
        <>
          <PaginationControls />
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4"
          >
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative aspect-square">
                  <Image
                    src={`/assets/images/${product.name.replace(/ /g, "_")}_${
                      product.gender
                    }.png`}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      onProductSelect(product);
                      toast.success(`Viewing ${product.name}`, {
                        icon: '👀',
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          color: '#fff',
                        },
                      });
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <AnimatePresence>
                      {clickedProduct === product.id.toString() ? (
                        <motion.div
                          key="added"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="relative flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-green-500 rounded-full"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10 text-white"
                          >
                            <Check className="w-8 h-8" />
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="add-to-cart"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAddToCart(product)}
                          className="text-white px-4 py-2 rounded-full transition-colors duration-300"
                        >
                          {product.quantity > 0 ? "Quick Add" : "Out of Stock"}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2
                      className="font-semibold text-lg text-white cursor-pointer"
                      onClick={() => onProductSelect(product)}
                    >
                      {product.name}
                    </h2>
                    <p className="font-bold text-white">
                      {product.price} {product.currency}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    {product.gender} • {product.color} • {product.type}
                  </p>
                  <AnimatePresence>
                    {clickedProduct === product.id.toString() ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-green-500 text-white py-2 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                      </motion.div>
                    ) : (
                      <motion.button
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className={`w-full ${
                          product.quantity > 0 ? "bg-blue-600" : "bg-yellow-600"
                        } text-white py-2 rounded-full ${
                          product.quantity > 0
                            ? "hover:bg-blue-700"
                            : "hover:bg-yellow-700"
                        } transition-colors duration-300 flex items-center justify-center relative overflow-hidden`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-blue-700"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div className="relative z-10 flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                        </motion.div>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <PaginationControls />
        </>
      ) : (
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-center font-extrabold text-lg">No products</div>
        </div>
      )}
    </div>
  );
}