import { models } from "../models/index.js";

const { User, OAuthAccount } = models;

/**
 * Handles GitHub OAuth login flow (Case 1, 2, 3).
 * @param {object} profile - GitHub profile data from OAuth (id, email, name, avatar_url, etc.)
 * @param {object} tokens - { accessToken, refreshToken, expiresAt }
 * @returns {Promise<User>} - The user object
 */
export async function handleGithubLogin(profile, tokens) {
  const provider = "github";
  const providerId = profile.id?.toString();
  const email = profile.email;
  const name = profile.name || "";
  const picture = profile.avatar_url || "";

  if (!providerId || !email) {
    throw new Error("GitHub profile missing required fields (id, email)");
  }

  let user;
  let oauthAccount;

  // ---------------- CASE 1: User already has GitHub OAuthAccount ----------------
  oauthAccount = await OAuthAccount.findOne({
    where: { provider, providerId },
    include: [{ model: User, as: "user" }],
  });

  if (oauthAccount) {
    user = oauthAccount.user;
  } else {
    // ---------------- CASE 2: Manual user exists with same email ----------------
    user = await User.findOne({ where: { email } });

    if (!user) {
      // ---------------- CASE 3: New user ----------------
      user = await User.create({
        name,
        email,
        username: email, // TODO: generate unique username if conflict
        password: null, // OAuth-only user
        role: "customer",
      });
    }

    // Create OAuthAccount linked to user
    oauthAccount = await OAuthAccount.create({
      provider,
      providerId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || null,
      expiresAt: tokens.expiresAt || null,
      userId: user.userId,
    });
  }

  // ---------------- Update tokens every login ----------------
  await oauthAccount.update({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken || oauthAccount.refreshToken,
    expiresAt: tokens.expiresAt || oauthAccount.expiresAt,
  });

  return user;
}
