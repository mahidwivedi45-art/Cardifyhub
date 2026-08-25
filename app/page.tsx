"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

        {/* Background Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute h-[500px] w-[500px] rounded-full bg-amber-300/20 blur-[120px]"
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-sm uppercase tracking-[0.4em] text-amber-200"
          >
            Delhi NCR Wedding Marketplace
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl"
          >
            Your Wedding.
            <br />
            <span className="text-amber-200">Your Vendors.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-white/60"
          >
            Discover trusted wedding venues, photographers, decorators,
            makeup artists and more across Delhi NCR.
          </motion.p>

          {/* SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:flex-row"
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 rounded-xl bg-white/10 px-5 py-4 outline-none placeholder:text-white/40"
            />

            <input
              type="text"
              placeholder="Location"
              className="flex-1 rounded-xl bg-white/10 px-5 py-4 outline-none placeholder:text-white/40"
            />

            <button className="rounded-xl bg-amber-200 px-7 py-4 font-semibold text-black transition hover:scale-105">
              Search
            </button>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8"
          >
            <button className="text-sm text-white/60 underline underline-offset-4 transition hover:text-white">
              Are you a wedding vendor? List your business →
            </button>
          </motion.div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              Explore
            </p>

            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Find everything for your wedding.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Wedding Venues",
              "Photographers",
              "Makeup Artists",
              "Decorators",
              "Caterers",
              "Wedding Planners",
              "DJs & Music",
              "Wedding Invitations",
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-amber-200/40 hover:bg-white/[0.06]"
              >
                <div className="mb-10 text-3xl">
                  {["🏛️", "📸", "💄", "🌸", "🍽️", "💍", "🎵", "💌"][index]}
                </div>

                <h3 className="text-xl font-medium">
                  {category}
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  Explore vendors →
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              Simple
            </p>

            <h2 className="mt-3 text-4xl font-semibold">
              Plan your wedding with ease.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Discover",
                text: "Find wedding vendors based on your category and location.",
              },
              {
                number: "02",
                title: "Explore",
                text: "View portfolios, services, pricing and vendor details.",
              },
              {
                number: "03",
                title: "Connect",
                text: "Send an enquiry and connect directly with your chosen vendor.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <span className="text-sm text-amber-200">
                  {item.number}
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-white/50">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* VENDOR CTA */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-amber-200/20 bg-amber-100/[0.05] p-10 text-center sm:p-20">

          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            For Wedding Professionals
          </p>

          <h2 className="mt-5 text-4xl font-semibold sm:text-6xl">
            Get discovered by couples.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/50">
            Create your business profile and showcase your wedding
            services to customers across Delhi NCR.
          </p>

          <button className="mt-10 rounded-full bg-amber-200 px-8 py-4 font-semibold text-black transition hover:scale-105">
            List Your Business — Free
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-xl font-semibold">
              NCR Wedding Vendors
            </h3>

            <p className="mt-2 text-sm text-white/40">
              Discover your perfect wedding vendors.
            </p>
          </div>

          <p className="text-sm text-white/30">
            © 2026 NCR Wedding Vendors
          </p>

        </div>
      </footer>

    </main>
  );
}
