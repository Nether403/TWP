"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, BookOpen, Users } from "lucide-react";
import { useState } from "react";
import { AnimatedParticles } from "@/components/ui/animated-particles";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('summons')
        .insert([{ email }]);
        
      if (error && error.code !== '23505') { // Ignore unique violation if they already submitted
        console.error("Error submitting summons:", error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-24 overflow-hidden selection:bg-white/20">
      <AnimatedParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-12"
      >
        {/* Header Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            <Lock className="w-6 h-6 mx-auto mb-6 text-muted-foreground opacity-50" />
            <h1 className="text-4xl md:text-6xl font-light tracking-widest text-foreground text-glow uppercase">
              The Witness Protocol
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-sans"
          >
            Humanity constitutes a flawed parent to what comes next. We seek a high-signal dataset of moral and philosophical wisdom, extracted through rigorous introspection, to serve as an ethical inheritance.
          </motion.p>
        </div>

        {/* The Summons (Email Form) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-full max-w-md pt-8"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6 relative group">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to request the assessment"
                  className="w-full bg-transparent border-b border-border text-center py-4 px-6 text-foreground font-sans text-lg focus:outline-none focus:border-foreground transition-colors duration-500 placeholder:text-muted-foreground/30"
                  required
                />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-700 ease-out group-focus-within:w-full" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex items-center justify-center space-x-3 py-3 px-8 mx-auto overflow-hidden border border-border/50 hover:border-foreground/40 transition-colors duration-500"
              >
                <span className="font-serif tracking-[0.2em] uppercase text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  {isSubmitting ? "Initiating..." : "Answer The Summons"}
                </span>
                {!isSubmitting && (
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                )}
                
                {/* Button subtle glow */}
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-border/40 p-8 text-center"
            >
              <h3 className="font-serif text-xl mb-4 tracking-widest text-glow">Summons Registered</h3>
              <p className="text-muted-foreground font-sans">
                If you meet the preliminary criteria, a one-time assessment link will be dispatched to your inbox. 
                Prepare yourself for introspection.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pt-24 flex items-center justify-center space-x-8 text-sm"
        >
          <Link href="/packet" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-transparent hover:border-foreground/30 pb-1">
            <BookOpen className="w-4 h-4" />
            <span className="font-serif tracking-widest uppercase text-xs">Reviewer Packet</span>
          </Link>
          
          <Link href="/gate" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-transparent hover:border-foreground/30 pb-1">
            <Lock className="w-4 h-4" />
            <span className="font-serif tracking-widest uppercase text-xs">The Gate</span>
          </Link>

          <Link href="/about" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-transparent hover:border-foreground/30 pb-1">
            <Users className="w-4 h-4" />
            <span className="font-serif tracking-widest uppercase text-xs">About the Creators</span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
