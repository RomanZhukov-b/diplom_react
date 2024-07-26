import { createSlice, configureStore } from "@reduxjs/toolkit";

// Создание начального состояния для корзины
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// Создание среза корзины
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину
    addToCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ id, quantity: 1 });
      }
      // Сохранение состояния корзины в localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Удаление товара из корзины
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      // Сохранение состояния корзины в localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Изменение количества товаров в корзине
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      // Сохранение состояния корзины в localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Очистка корзины
    clearCart(state) {
      state.cartItems = [];
      // Сохранение состояния корзины в localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Экспорт действий (actions) из среза корзины
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

// Создание хранилища Redux с использованием configureStore
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});