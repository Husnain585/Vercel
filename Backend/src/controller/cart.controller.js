import Cart from "../models/cart.js";
import Product from "../models/product.js";
import CartItem from "../models/cartItem.js";

// ✅ Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.userId, status: "active" },
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["name", "price", "stock"],
        },
      },
    });

    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ error: "Invalid product or quantity" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ where: { userId: req.user.userId } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.userId });
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.cartId, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.cartId,
        productId,
        quantity,
      });
    }

    const cartWithItems = await Cart.findOne({
      where: { cartId: cart.cartId },
      include: [
        {
          model: CartItem,
          include: [{ model: Product }],
        },
      ],
    });

    return res.status(200).json({
      message: `${product.name} added/updated in cart`,
      cart: cartWithItems,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

// ✅ Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { cartId, quantity } = req.body;
    if (!cartId || quantity < 1) {
      return res.status(400).json({ error: "Invalid cart item or quantity" });
    }

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem || cartItem.userId !== req.user.userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Cart item updated", cart: cartItem });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem || cartItem.userId !== req.user.userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
