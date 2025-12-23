"use client";

import { useEffect, useState } from "react";
import Container from "./spacing";
import GridSection from "./GridWrapperAdvance";
import ImageCard from "./card";
import { motion } from "framer-motion";
import SectionHeader from "./sectionHeader";

export default function FeaturesSection({
  label = "",
  title = "",
  subtitle = "",
  gap = 24,
  columns = 3,
  items = [],
  desktopOrder = [],

  // Typography overrides
  labelVariant = "",
  titleVariant = "",
  subtitleVariant = "",
  cardHeadingVariant = "",
  cardDescriptionVariant = "",
}) {
  const [device, setDevice] = useState("desktop");

  // Normalize items
  const normalizedItems = Array.isArray(items)
    ? items
    : typeof items === "object" && items !== null
    ? Object.values(items)
    : [];

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 600) setDevice("mobile");
      else if (w <= 1100) setDevice("tablet");
      else setDevice("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ----------------------------------
     MOBILE + TABLET (simple grid)
  ---------------------------------- */
  if (device !== "desktop") {
    return (
      <Container variant="primary">
        <GridSection
          label={label}
          title={title}
          subtitle={subtitle}
          columns={columns}
          gap={gap}
          labelTypo={labelVariant}
          sectionHeaderTypo={titleVariant}
          sectionDescTypo={subtitleVariant} 
          items={normalizedItems.map((card) => ({
            component: (
              <ImageCard
                heading={card.heading}
                description={card.description}
                imageLink={card.imageLink}
                textPosition={card.textPosition}
                headingVariant={cardHeadingVariant}
                descriptionVariant={cardDescriptionVariant}
                imageClassName={"!h-full !border !border-red-500 !aspect-auto "}
              />
            ),
            colSpan: Number(card.colSpan) || 1,
            rowSpan: Number(card.rowSpan) || 1,
            className: card.className || "",
          }))}
        />
      </Container>
    );
  }

  /* ----------------------------------
     DESKTOP (animated grid)
  ---------------------------------- */
  return (
    <Container variant="section" className="flex flex-col gap-[56px]">
      {/* Header animation */}
      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          labelTypo={labelVariant}
          sectionHeaderTypo={titleVariant}
          sectionDescTypo={subtitleVariant}
        />
      </motion.div>

      <GridSection
        showHeader={false}
        columns={columns}
        gap={gap}
        items={(desktopOrder?.length
          ? desktopOrder
          : normalizedItems.map((_, i) => i)
        ).map((idx) => {
          const f = normalizedItems[idx];
          if (!f) return null;

          return {
            component: (
              <ImageCard
                heading={f.heading}
                description={f.description}
                imageLink={f.imageLink}
                textPosition={f.textPosition}
                headingVariant={cardHeadingVariant}
                descriptionVariant={cardDescriptionVariant}
              />
            ),
            colSpan: Number(f.colSpan) || 1,
            rowSpan: Number(f.rowSpan) || 1,
            className: f.className || "",
          };
        })}
      />
    </Container>
  );
}
