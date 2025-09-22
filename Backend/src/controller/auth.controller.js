import "dotenv/config";
import User from "../models/users.js";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Op } from "sequelize";
import { models } from "../models/index.js";
import { sendVerificationEmail } from "./emailCheck.controller.js";
import { handleOAuthLogin } from "../services/oauth.service.js";
import { handleGithubLogin } from "../services/github.oauth.service.js";
import {
  generateState,
  generateCodeVerifier,
  decodeIdToken,
} from "arctic";

import google from "../config/oauth/google.js";
import github from "../config/oauth/github.js";
import Vendor from "../models/vendor.js";

let verifyIdTokenWithGoogle;
try {
  const { OAuth2Client } = await import("google-auth-library");
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  verifyIdTokenWithGoogle = async (idToken) => {
    if (!idToken) return null;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  };
} catch {
  verifyIdTokenWithGoogle = async (idToken) =>
    idToken ? decodeIdToken(idToken) : null;
}

const { emailCheck } = models;

const OAUTH_EXCHANGE_EXPIRY_MS = parseInt(
  process.env.OAUTH_EXCHANGE_EXPIRY_MS || "900000",
  10
);
const IS_PROD = process.env.NODE_ENV === "production";

const oauthCookieOptions = {
  httpOnly: true,
  secure: IS_PROD,
  maxAge: OAUTH_EXCHANGE_EXPIRY_MS,
  sameSite: "lax",
  path: "/",
};

const AuthController = {
  // ---------------- LOGIN ----------------
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      const user = await User.findOne({
        paranoid: false,
        attributes: ["userId", "name", "username", "email", "password", "role"],
        where: { username: username.trim() },
      });

      if (!user) return res.status(401).json({ error: "User not found" });

      const isValid = await compare(password.trim(), user.password);
      if (!isValid)
        return res.status(401).json({ error: "Invalid credentials" });

      const emailRecord = await emailCheck.findOne({
        where: { userId: user.userId },
      });
      if (!emailRecord || !emailRecord.isVerified) {
        return res
          .status(403)
          .json({ error: "Please verify your email before login" });
      }

      let vendorId = null;
      if (user.role.toLowerCase() === "vendor") {
        const vendor = await Vendor.findOne({
          where: { userId: user.userId },
          attributes: ["vendorId", "userId"],
        });
        if (vendor) {
          vendorId = vendor.vendorId;
        } else {
          console.log("⚠️ Vendor role but no vendor record for userId:", user.userId);
        }
      }

      const payload = {
        userId: user.userId,
        username: user.username,
        role: user.role,
        vendorId: vendorId || null,
      };

      const token = sign(payload, process.env.SECRET, { expiresIn: "15m" });

      res.cookie("auth", token, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "Lax",
        path: "/",
      });

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },

  // ---------------- LOGOUT ----------------
  Logout: async (req, res) => {
    try {
      res.clearCookie("auth", {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "Lax",
        path: "/",
      });
      return res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // ---------------- REGISTER ----------------
  Register: async (req, res) => {
    try {
      const { name, username, email, password, role } = req.body;
      if (!name || !username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const usernameInput = username.trim();
      const emailInput = email.trim().toLowerCase();

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username: usernameInput }, { email: emailInput }],
        },
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "Username or email already taken" });
      }

      if (role === "admin") {
        const existingAdmin = await User.findOne({ where: { role: "admin" } });
        if (existingAdmin) {
          return res.status(403).json({ error: "Only one admin is allowed" });
        }
      }

      const hashedPassword = await hash(password, 10);

      const newUser = await User.create({
        name,
        username: usernameInput,
        email: emailInput,
        password: hashedPassword,
        role:
          role && ["admin", "customer", "vendor"].includes(role)
            ? role
            : "customer",
      });

      if (newUser.role === "vendor") {
        await Vendor.create({
          userId: newUser.userId,
          name: newUser.name,
          contactEmail: newUser.email,
          status: "pending",
        });
      }

      try {
        await sendVerificationEmail(
          { body: { userId: newUser.userId } },
          {
            json: (data) =>
              console.log("sendVerificationEmail response:", data),
            status: (code) => ({ json: (data) => console.log(code, data) }),
          }
        );
      } catch (sendErr) {
        console.error("Failed to send verification email:", sendErr);
      }

      return res.status(201).json({
        message: "Registration successful. Please verify your email.",
      });
    } catch (error) {
      console.error("Register Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", details: error.message });
    }
  },

  // ---------------- LOGIN WITH GOOGLE ----------------
  LoginWithGoogle: async (req, res) => {
    try {
      const state = generateState();
      const codeVerifier = generateCodeVerifier();
      const scopes = ["openid", "profile", "email"];

      const url = google.createAuthorizationURL(state, codeVerifier, scopes);
      url.searchParams.set("access_type", "offline");
      url.searchParams.set("prompt", "consent");

      res.cookie("google_oauth_state", state, oauthCookieOptions);
      res.cookie("google_code_verifier", codeVerifier, oauthCookieOptions);

      return res.redirect(url.toString());
    } catch (err) {
      console.error("LoginWithGoogle error:", err);
      return res.status(500).send("Internal server error");
    }
  },

  // ---------------- GOOGLE CALLBACK ----------------
  googleCallback: async (req, res) => {
    try {
      const { code, state } = req.query;
      const storedState = req.cookies?.google_oauth_state;
      const codeVerifier = req.cookies?.google_code_verifier;

      if (!code) return res.status(400).send("Missing authorization code.");
      if (!state || state !== storedState)
        return res.status(400).send("Invalid state.");
      if (!codeVerifier) return res.status(400).send("Missing code verifier.");

      const tokens = await google.validateAuthorizationCode(code, codeVerifier);
      const idToken = tokens.idToken?.() || null;
      const claims = idToken ? await verifyIdTokenWithGoogle(idToken) : null;

      if (!claims)
        return res.status(400).send("Unable to verify Google ID token");

      const user = await handleOAuthLogin("google", claims, {
        accessToken: tokens.accessToken?.(),
        refreshToken: tokens.refreshToken?.() || null,
        expiresAt: tokens.accessTokenExpiresAt?.()
          ? new Date(tokens.accessTokenExpiresAt())
          : null,
      });

      res.clearCookie("google_oauth_state", oauthCookieOptions);
      res.clearCookie("google_code_verifier", oauthCookieOptions);

      const payload = {
        userId: user.userId,
        username: user.username,
        role: user.role,
      };
      const jwt = sign(payload, process.env.SECRET, { expiresIn: "60m" });

      res.cookie("auth", jwt, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "Lax",
        path: "/",
      });

      const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";
      return res.redirect(FRONTEND_URL);
    } catch (err) {
      console.error("googleCallback error:", err);
      return res.status(500).send("Internal server error");
    }
  },

  // ---------------- LOGIN WITH GITHUB ----------------
  LoginWithGithub: async (req, res) => {
    try {
      const state = generateState();
      const scopes = ["user:email"];

      const url = github.createAuthorizationURL(state, scopes);

      res.cookie("github_oauth_state", state, oauthCookieOptions);

      return res.redirect(url.toString());
    } catch (err) {
      console.error("LoginWithGithub error:", err);
      return res.status(500).send("Internal server error");
    }
  },

  // ---------------- GITHUB CALLBACK ----------------
  githubCallback: async (req, res) => {
    try {
      const { code, state } = req.query;
      const storedState = req.cookies?.github_oauth_state;

      if (!code) return res.status(400).send("Missing authorization code.");
      if (!state || state !== storedState)
        return res.status(400).send("Invalid state.");

      const tokens = await github.validateAuthorizationCode(code);
      const accessToken = tokens.accessToken?.();

      const profileResponse = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = await profileResponse.json();

      if (!profile.email) {
        const emailResponse = await fetch("https://api.github.com/user/emails", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const emails = await emailResponse.json();
        const primaryEmail = emails.find((e) => e.primary && e.verified);
        if (primaryEmail) profile.email = primaryEmail.email;
      }

      if (!profile.email) {
        return res.status(400).send("Unable to fetch GitHub email");
      }

      const user = await handleGithubLogin(profile, {
        accessToken,
        refreshToken: null,
        expiresAt: null,
      });

      res.clearCookie("github_oauth_state", oauthCookieOptions);

      const payload = {
        userId: user.userId,
        username: user.username,
        role: user.role,
      };
      const jwt = sign(payload, process.env.SECRET, { expiresIn: "60m" });

      res.cookie("auth", jwt, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "Lax",
        path: "/",
      });

      const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";
      return res.redirect(FRONTEND_URL);
    } catch (err) {
      console.error("githubCallback error:", err);
      return res.status(500).send("Internal server error");
    }
  },
};

export default AuthController;
