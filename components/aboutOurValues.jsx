"use client";
import React from "react";
import SectionHeader from "./sectionHeader";

import Card from "./value";
import Container from "./spacing";

export default function AboutOurValues({
  label = "Our Values",
  title = "What Drives Us Forward",
  subtitle = "The principles that guide everything we do at Hirezy.",
  align = "center",

  // VALUES ARRAY (JSON friendly)
  values = [
    {
      title: "Customer First",
      description:
        "Every feature we build, every decision we make starts with understanding our customers' needs and challenges.",
      iconSrc: "https://ik.imagekit.io/75zj3bigp/Icon.png",
      iconAlt: "",
    },
    {
      title: "Transparency",
      description:
        "We believe in open communication and honest collaboration across teams.",
      iconSrc: "https://ik.imagekit.io/75zj3bigp/Icon.png",
      iconAlt: "",
    },
    {
      title: "Innovation",
      description:
        "We continuously improve, experiment, and challenge the status quo.",
      iconSrc: "https://ik.imagekit.io/75zj3bigp/Icon.png",
      iconAlt: "",
    },
  ],

  cardVariant = "secondary",
}) {
  return (
    <div className="about-our-value-container">
      <Container variant="primary">
        {/* HEADER */}
        <div className="about-our-value-heading">
          <SectionHeader
            label={label}
            title={title}
            subtitle={subtitle}
            align={align}
          />
        </div>

        {/* VALUES */}
        <div className="value-container">
          {values.map((value, index) => (
            <Card
              key={index}
              variant={cardVariant}
              title={value.title}
              description={value.description}
              iconSrc={value.iconSrc}
              iconAlt={value.iconAlt}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
