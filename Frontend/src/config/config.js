const config = {
  appName: "My E-Commerce",
  apiBaseUrl: "http://localhost:3000/api", // backend base url
  currency: "PKR", // or PKR, INR, etc.
  defaultLanguage: "en",
  stripePublicKey:
    "pk_test_51S3gSURQHh1fnLy6dbsEKF8Q5plDpADd8ZhvH1eDvxlPYpHke5o4n4QneieRWZsaZ7KaVzWsa9z9fYxDnFzWOsC300mitZB3kV",

  // 🎨 Theme settings
  theme: {
  light: {
    background: "#F9FAFB", // gray-50
    cardBackground: "#FFFFFF", // white
    textPrimary: "#111827", // gray-900
    textSecondary: "#4B5563", // gray-600
    border: "#E5E7EB", // gray-200

    button: {
      primaryBg: "#1D4ED8", // blue-700
      primaryText: "#FFFFFF",
      primaryHover: "#1E40AF", // blue-800
      primaryBorder: "#1D4ED8",

      secondaryBg: "#9333EA", // purple-600
      secondaryText: "#FFFFFF",
      secondaryHover: "#7E22CE", // purple-700
      secondaryBorder: "#9333EA",

      dangerBg: "#DC2626", // red-600
      dangerText: "#FFFFFF",
      dangerHover: "#B91C1C", // red-700
      dangerBorder: "#DC2626",

      sageBg: "#84A98C", // sage green
      sageText: "#FFFFFF",
      sageHover: "#52796F",
      sageBorder: "#84A98C",

      mintBg: "#98FF98", // mint green
      mintText: "#111827",
      mintHover: "#66FF66",
      mintBorder: "#98FF98",

      tealBg: "#14B8A6", // teal-500
      tealText: "#FFFFFF",
      tealHover: "#0D9488", // teal-600
      tealBorder: "#14B8A6",

      jadeBg: "#00A86B", // jade green
      jadeText: "#FFFFFF",
      jadeHover: "#007F5F",
      jadeBorder: "#00A86B",

      greenBg: "#22C55E", // green-500
      greenText: "#FFFFFF",
      greenHover: "#16A34A", // green-600
      greenBorder: "#22C55E",
    },
  },

  dark: {
    background: "#111827", // gray-900
    cardBackground: "#1F2937", // gray-800
    textPrimary: "#F9FAFB", // gray-50
    textSecondary: "#9CA3AF", // gray-400
    border: "#374151", // gray-700

    button: {
      primaryBg: "#3B82F6", // blue-500
      primaryText: "#FFFFFF",
      primaryHover: "#2563EB", // blue-600
      primaryBorder: "#3B82F6",

      secondaryBg: "#A855F7", // purple-500
      secondaryText: "#FFFFFF",
      secondaryHover: "#9333EA", // purple-600
      secondaryBorder: "#A855F7",

      dangerBg: "#EF4444", // red-500
      dangerText: "#FFFFFF",
      dangerHover: "#DC2626", // red-600
      dangerBorder: "#EF4444",

      sageBg: "#52796F", // darker sage
      sageText: "#F9FAFB",
      sageHover: "#354F52",
      sageBorder: "#52796F",

      mintBg: "#3EB489", // dark mint
      mintText: "#F9FAFB",
      mintHover: "#2E8B57",
      mintBorder: "#3EB489",

      tealBg: "#0D9488", // teal-600
      tealText: "#FFFFFF",
      tealHover: "#0F766E", // teal-700
      tealBorder: "#0D9488",

      jadeBg: "#007F5F", // jade deep
      jadeText: "#FFFFFF",
      jadeHover: "#005F43",
      jadeBorder: "#007F5F",

      greenBg: "#16A34A", // green-600
      greenText: "#FFFFFF",
      greenHover: "#15803D", // green-700
      greenBorder: "#16A34A",
    },
  },
},


  // 📦 Pagination defaults
  pagination: {
    productsPerPage: 12,
  },

  // 🗝️ Storage keys
  storageKeys: {
    authToken: "auth_token",
    cart: "cart_items",
    wishlist: "wishlist_items",
    user: "user_data",
  },
};

export default config;
