import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import MenuItemDetails from "./components/MenuItem/MenuItemDetails.jsx";
import RestaurantView from "./views/RestaurantView.jsx";
import WishlistView from "./views/WishlistView.jsx";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  

  const toggleWishlist = (dish) => {
    setWishlist((prev) => {
      const exists = prev.some(item => item.idMeal === dish.idMeal);

      if (exists) {
        return prev.filter(item => item.idMeal !== dish.idMeal);
      }

      return [...prev, {
        idMeal: dish.idMeal,
        strMeal: dish.strMeal,
        strMealThumb: dish.strMealThumb
      }];
    });
  }
  return (
    <Router>
      <Routes>
        <Route index element={<RestaurantView  wishlist={wishlist} onToggleWishlist={toggleWishlist}/>} />
        <Route path="/meals/:id" element={<MenuItemDetails />} />
        <Route
          path="/wishlist"
          element={
            <WishlistView wishlist={wishlist} onToggleWishlist={toggleWishlist} /> }
        />
        <Route path="/*" element={<p>404 Page not found</p>} />
      </Routes>
    </Router>
  );
}

// Wrap App in an ErrorBoundary to help us with development bugs

export default function WrappedApp() {
  return import.meta.env.MODE === "development" ? (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  ) : (
    <App />
  );
}
