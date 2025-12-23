"use client";

import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import SectionHeader from "./sectionHeader";

/* ----------------------------------
   Single Grid Item (isolated animation)
---------------------------------- */
function GridItem({ itemData, index, progress, locked }) {
  const startY = 100 - index * 25;
  const startScale = 0.85 + index * 0.05;

  const y = useTransform(progress, [0, 0.6], locked ? [0, 0] : [startY, 0]);
  const scale = useTransform(
    progress,
    [0, 0.6],
    locked ? [1, 1] : [startScale, 1]
  );
  const rotateX = useTransform(progress, [0, 0.6], locked ? [0, 0] : [15, 0]);
  const opacity = useTransform(
    progress,
    [0.1, 0.6],
    locked ? [1, 1] : [0.5, 1]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateX,
        opacity,
        transformOrigin: "center center",
        gridColumn: itemData.colSpan ? `span ${itemData.colSpan}` : undefined,
        gridRow: itemData.rowSpan ? `span ${itemData.rowSpan}` : undefined,
      }}
      className={clsx(
        itemData.className,
        "flex justify-center will-change-transform"
      )}
    >
      {itemData.component}
    </motion.div>
  );
}

export default function GridSection({
  label,
  title,
  subtitle,
  showHeader = true,
  centerTitle = "center",
  gap = "24px",
  columns = 3,
  items = [],
  wrapperClass = "",
  labelTypo = "",
  sectionHeaderTypo = "",
  sectionDescTypo = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const unsub = progress.on("change", (v) => {
      if (v >= 0.98) setLocked(true);
    });
    return () => unsub();
  }, [inView]);

  return (
    <section ref={ref} className={clsx("mainSec relative", wrapperClass)}>
      {showHeader && (
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          align={centerTitle}
          labelTypo={labelTypo}
          sectionHeaderTypo={sectionHeaderTypo}
          sectionDescTypo={sectionDescTypo}
        />
      )}

      <div
        className="relative grid gridSectionAuto !auto-rows-max !grid-flow-dense"
        style={{
          gap,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          perspective: "1200px",
        }}
      >
        {items.map((item, i) =>
          item ? ( 
            <GridItem
              key={i}
              index={i}
              itemData={item}
              progress={progress}
              locked={locked}
            />
          ) : null
        )}
      </div>
    </section>
  );
}
