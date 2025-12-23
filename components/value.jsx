"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Typography from "./typography";

function getBgClass(variant) {
  const map = {
    default: "bg-default",
    blue: "bg-blue",
    white: "bg-white",
    gray: "bg-gray",
    custom: "",
  };
  return map[variant] || "";
}

export default function Card({
  title,
  description,
  iconSrc,
  iconAlt = "",
  variant = "default",
  bgVariant = "default",
  textLink = "",
  bgColor = "",
  className = "",
  ...props
}) {
  const variants = {
    default: "card",
    secondary: "card-secondary",
    tertiary: "card-tertiary",
    story: "card-story",
  };

  const [storyHeadingVariant, setStoryHeadingVariant] = useState("body-1");

  useEffect(() => {
    if (variant !== "story") return undefined;

    const handleResize = () => {
      setStoryHeadingVariant(window.innerWidth <= 450 ? "h2" : "body-1");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [variant]);

  const titleVariant = variant === "story" ? storyHeadingVariant : "h3";

  // use it here
  const bgClass = getBgClass(bgVariant);

  return (
    <div
      className={`${variants[variant]} ${bgClass} ${className}`}
      style={bgVariant === "custom" ? { backgroundColor: bgColor } : {}}
      {...props}
    >
      {iconSrc && (
        <div className="card-icon">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={24}
            height={24}
            className="icon-img"
          />
        </div>
      )}

      <div className="card-content">
        {title && (
          <Typography variant={titleVariant} className="card-title">
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            variant={variant === "story" ? "body-5" : "body-4"}
            className="card-description"
          >
            {description}
          </Typography>
        )}

        {textLink && (
          <Typography variant="text-link" className="mt-4">
            {textLink}
          </Typography>
        )}
      </div>
    </div>
  );
}
