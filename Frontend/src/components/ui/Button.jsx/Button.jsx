import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext"; // theme hook

/**
 * Reusable Button Component
 *
 * @param {"primary" | "secondary" | "danger" | "sage" | "mint" | "teal" | "jade" | "green"} variant
 * @param {boolean} outline - If true, shows outline style
 * @param {string} to - If passed, renders as <Link>, otherwise as <button>
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button text/content
 */
const Button = ({ variant = "primary", outline = false, to, onClick, children }) => {
  const { themeConfig } = useTheme();
  const btnTheme = themeConfig.button;

  // Pick colors based on variant
  const bgColor = outline ? "transparent" : btnTheme[`${variant}Bg`];
  const textColor = outline ? btnTheme[`${variant}Bg`] : btnTheme[`${variant}Text`];
  const hoverBg = outline ? btnTheme[`${variant}Bg`] : btnTheme[`${variant}Hover`];
  const borderColor = btnTheme[`${variant}Border`];

  const baseStyle = {
    backgroundColor: bgColor,
    color: textColor,
    border: `2px solid ${borderColor}`,
    borderRadius: "0.75rem", // rounded-xl
    padding: "0.5rem 1.25rem",
    fontWeight: 500,
    display: "inline-block",
    transition: "all 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = hoverBg;
    e.target.style.color = btnTheme[`${variant}Text`];
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = bgColor;
    e.target.style.color = textColor;
  };

  if (to) {
    return (
      <Link
        to={to}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
