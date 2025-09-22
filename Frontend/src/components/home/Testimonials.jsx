import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Smith",
    feedback:
      "Amazing quality and super fast delivery. I’m definitely shopping again!",
  },
  {
    id: 2,
    name: "Stark Clark",
    feedback: "Great deals and easy checkout process. Loved the experience!",
  },
  {
    id: 3,
    name: "Ben Stokes",
    feedback: "Customer service was fantastic. Highly recommend this store.",
  },
];

const Testimonials = () => {
  const { themeConfig } = useTheme();

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${themeConfig.button.primaryBg}15, ${themeConfig.button.secondaryBg}25)`,
      }}
    >
      {/* Decorative Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" style={{ backgroundColor: themeConfig.background }}/>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-14"
          style={{ color: themeConfig.textPrimary }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          What Our Customers Say
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="relative p-8 rounded-3xl shadow-xl backdrop-blur-lg border transition-all duration-500 group hover:-translate-y-2"
              style={{
                backgroundColor: themeConfig.cardBackground,
                borderColor: themeConfig.border,
              }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
            >
              {/* Floating Quote Icon */}
              <div
                className="absolute -top-6 left-6 p-3 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: themeConfig.button.primaryBg,
                }}
              >
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Feedback */}
              <p
                className="italic text-lg mb-6 transition-colors duration-300"
                style={{ color: themeConfig.textSecondary }}
              >
                “{t.feedback}”
              </p>

              {/* Name */}
              <h4
                className="font-semibold text-xl"
                style={{ color: themeConfig.textPrimary }}
              >
                - {t.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
