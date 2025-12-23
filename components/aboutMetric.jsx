"use client";
import Container from "./spacing";
import Metric from "./Metric";

export default function AboutMetric({
  items = [
    { number: "500+", label: "Teams Worldwide" },
    { number: "10K+", label: "Successful Hires" },
    { number: "50+", label: "Seamless Integrations" },
    { number: "95%", label: "Customer Satisfaction" },
  ],
}) {
  return (
    <Container variant="primary" className="about-metric-container">
      {items.map((m, i) => (
        <Metric key={i} number={m.number} label={m.label} />
      ))}
    </Container>
  );
}
