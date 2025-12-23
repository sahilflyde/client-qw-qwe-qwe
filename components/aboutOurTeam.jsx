"use client";

import { useState, useEffect } from "react";
import SectionHeader from "./sectionHeader";
import OurTeamCard from "./ourTeamCard";
import Container from "./spacing";

export default function AboutOurTeam({
  label = "Our Team",
  title = "Meet the People Behind Hirezy",
  subtitle = "A diverse team of experts passionate about revolutionizing recruitment.",

  // TEAM MEMBERS ARRAY (JSON friendly)
  members = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      imageSrc: "https://ik.imagekit.io/75zj3bigp/default-image.jpg",
    },
    {
      name: "Michael Lee",
      role: "Chief Technology Officer",
      imageSrc: "https://ik.imagekit.io/75zj3bigp/default-image.jpg",
    },
    {
      name: "Emily Carter",
      role: "Head of Product",
      imageSrc: "https://ik.imagekit.io/75zj3bigp/default-image.jpg",
    },
    {
      name: "David Kim",
      role: "Engineering Lead",
      imageSrc: "https://ik.imagekit.io/75zj3bigp/default-image.jpg",
    },
  ],

  alignDesktop = "center",
  alignMobile = "center",
}) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 450);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Container className="about-our-team-parent-container" variant="primary">
      {/* HEADER */}
      <div className="about-our-team-heading">
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          align={isMobile ? alignMobile : alignDesktop}
        />
      </div>

      {/* TEAM MEMBERS */}
      <div className="our-team-cards-container">
        {members.map((member, index) => (
          <OurTeamCard
            key={index}
            name={member.name}
            description={member.role}
            imageSrc={member.imageSrc}
          />
        ))}
      </div>
    </Container>
  );
}
