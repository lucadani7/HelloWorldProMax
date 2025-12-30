"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

interface StartupSequenceProps {
    onCompleteAction: () => void;
}

const LOADING_MESSAGES = [
    "Initializing quantum string buffers...",
    "Loading CSS variables from orbital satellite...",
    "Verifying user caffeine levels...",
    "Dockerizing the 'H' character...",
    "Allocating 4GB RAM for whitespace...",
    "Consulting StackOverflow for best practices...",
    "Decrypting Hello World via RSA-4096...",
    "Finalizing Enterprise Abstractions...",
];

export default function StartupSequence({ onCompleteAction }: StartupSequenceProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep >= LOADING_MESSAGES.length) {
            const timer = setTimeout(() => onCompleteAction(), 1000);
            return () => clearTimeout(timer);
        }

        const timeout = setTimeout(() => {
            setCurrentStep(s => s + 1);
        }, 800);

        return () => clearTimeout(timeout);
    }, [currentStep, onCompleteAction]);

    return (
        <div className="fixed inset-0 bg-slate-950 text-green-500 font-mono flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-2xl p-8 border-2 border-green-900 bg-slate-900/50 shadow-[0_0_50px_rgba(0,255,0,0.1)]">
                <div className="flex items-center gap-4 mb-6 border-b border-green-800 pb-4">
                    <Terminal className="animate-pulse" />
                    <h1 className="text-xl font-bold tracking-widest uppercase">
                        System.Boot.Sequence_v9.2
                    </h1>
                </div>

                <div className="space-y-2">
                    {LOADING_MESSAGES.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: index <= currentStep ? 1 : 0, // Am schimbat puțin aici pentru un efect mai cursiv
                                x: 0,
                                color: index === currentStep ? "#22c55e" : "#14532d"
                            }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-xs" suppressHydrationWarning>[{new Date().toLocaleTimeString()}]</span>
                            <span className="uppercase text-sm tracking-wider">{msg}</span>
                            {index === currentStep && <span className="animate-ping">_</span>}
                        </motion.div>
                    ))}
                </div>

                {/* Fake Progress Bar */}
                <div className="mt-8 h-2 w-full bg-green-900/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStep / LOADING_MESSAGES.length) * 100}%` }}
                    />
                </div>

                <p className="mt-2 text-xs text-green-800 text-right">
                    Memory Usage: 14.2 GB (Nominal)
                </p>
            </div>
        </div>
    );
}