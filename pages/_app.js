import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { createStore } from "redux";
import React, { useEffect } from "react";
import "../styles/global.css";

export const AppTheme = React.createContext(); // Needed for context

function reducer(state = { user: null, profile: null }, action) {
  switch (action.type) {
    case "setProfile":
      return {
        ...state,
        profile: action.profile,
      };
    case "setUser":
      return {
        ...state,
        user: action.user,
      };
    case "setShowNewListing":
      return {
        ...state,
        showNewListing: action.showNewListing,
      };
    case "setCategories":
      return {
        ...state,
        categories: action.categories,
      };
    case "setSubCategories":
      return {
        ...state,
        subCategories: action.subCategories,
      };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

function MyApp({ Component, pageProps }) {
  let store = createStore(reducer);
  return (
    <AppTheme.Provider value="Some Great Prop...">
      <Provider store={store}>
        <GoogleOAuthProvider clientId="896514884828-a463lc66i8q3oubvl8a4icusffpau138.apps.googleusercontent.com">
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </Provider>
    </AppTheme.Provider>
  );
}

export default MyApp;
