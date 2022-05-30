import { styled, globalCss } from "../../stitches.config";
import React from "react";
const globalStyles = globalCss({
  ":root": {
    "--bg-blue": "#84ffdc",
    "--bg-purple": "#dc84ff",
    "--bg-gray": "	#A0A0A0",
    "--background-light": "hsl(0, 0%, 100%)",
    "--background-dark": "hsl(233, 13%, 14%)",
    "--gradient-1": "rgba(132, 255, 220, 0.25)",
    "--gradient-2": "rgba(220, 132, 255, 0.25)",
    "--shadow-elevation-low":
      "0.3px 0.5px 0.7px hsl(var(--color-shadow) / 0.34),\n      0.4px 0.8px 1px -1.2px hsl(var(--color-shadow) / 0.34),\n      1px 2px 2.5px -2.5px hsl(var(--color-shadow) / 0.34)",
    "--shadow-elevation-medium":
      "0.3px 0.5px 0.7px hsl(var(--color-shadow) / 0.36),\n      0.8px 1.6px 2px -0.8px hsl(var(--color-shadow) / 0.36),\n      2.1px 4.1px 5.2px -1.7px hsl(var(--color-shadow) / 0.36),\n      5px 10px 12.6px -2.5px hsl(var(--color-shadow) / 0.36)",
    "--shadow-elevation-high":
      "0.3px 0.5px 0.7px hsl(var(--color-shadow) / 0.34),\n      1.5px 2.9px 3.7px -0.4px hsl(var(--color-shadow) / 0.34),\n      2.7px 5.4px 6.8px -0.7px hsl(var(--color-shadow) / 0.34),\n      4.5px 8.9px 11.2px -1.1px hsl(var(--color-shadow) / 0.34),\n      7.1px 14.3px 18px -1.4px hsl(var(--color-shadow) / 0.34),\n      11.2px 22.3px 28.1px -1.8px hsl(var(--color-shadow) / 0.34),\n      17px 33.9px 42.7px -2.1px hsl(var(--color-shadow) / 0.34),\n      25px 50px 62.9px -2.5px hsl(var(--color-shadow) / 0.34)",
  },

  "*": {
    boxSizing: "border-box",
    fontFamily: "'Raleway', sans-serif",
  },

  html: {
    scrollBehavior: "smooth",
    maxWidth: "100vw",
    height: "200vh",
  },

  body: {
    maxWidth: "100vw",
    height: "200vh",
    overflowX: "hidden",
    position: "relative",
  },

  "#__next": {
    height: "200vh",
  },
});

const BackgroundDots = styled("div", {
  inset: "0",
  position: "absolute",
  zIndex: -2,
  "--dot-size": "1px",
  "--dot-space": "22px",
  " --color-background": "hsl(233, 13%, 14%)",
  " --color-gray500": "hsl(0, 0%, 50%)",
  background: `
    linear-gradient(
      90deg,
      var(--color-background) calc(var(--dot-space) - var(--dot-size)),
      transparent 1%
    )
    center,
    linear-gradient(
      var(--color-background) calc(var(--dot-space) - var(--dot-size)),
      transparent 1%
    )
    center,
    var(--color-gray500)`,
  backgroundSize: "var(--dot-space) var(--dot-space)",
});
const BackgroundGradients = styled("div", {
  inset: "0",
  position: "absolute",
  zIndex: -1,
  background: `
    radial-gradient(
      circle at 15% 50%,
      var(--gradient-2),
      transparent 25%
    ),
    radial-gradient(circle at 85% 30%, var(--gradient-1), transparent 25%)`,
  backgroundSize: "100vw 100vh",
  backgroundRepeat: "no-repeat",
});

const layout = ({ children }) => {
  globalStyles();
  return (
    <div>
      <BackgroundDots />
      <BackgroundGradients />
      {children}
    </div>
  );
};

export default layout;
