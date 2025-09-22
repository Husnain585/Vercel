import User from "../models/users.js";
import { compare, hash } from "bcryptjs";
import OAuthAccount from "../models/oAuthAccounts.js";

// ✅ Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { userId: req.user.userId },
      attributes: { exclude: ["password"], include: ["role"] },
      include: [
        {
          model: OAuthAccount,
          as: "oauthAccounts",
          attributes: ["provider", "providerId"],
        },
      ],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email, username } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;

    await user.save();
    return res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete user profile
export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy(); // soft delete if `paranoid: true`
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new password required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValid = await compare(oldPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    user.password = await hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
