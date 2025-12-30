"use client";

import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { LanguageType } from "@/lib/AbstractLocalizationMatrixFactory";

interface LanguageSelectorProps {
    currentLang: LanguageType;
    onSelect: (lang: LanguageType) => void;
    onClose: () => void;
}

const LANGUAGES: { id: LanguageType; label: string; risk: string }[] = [
    { id: "STANDARD", label: "Standard English (Legacy)", risk: "Low" },
    { id: "CORPORATE", label: "Enterprise Speak (MBA-Ready)", risk: "High" },
    { id: "CPP", label: "C++ Syntax (Raw Pointers)", risk: "Memory Leak" },
    { id: "ASM", label: "Assembly (God Mode)", risk: "Brain Damage" },
    { id: "CHAOS", label: "Corrupted Memory Dump", risk: "Critical" },
];

export default function LanguageSelector({ currentLang, onSelect, onClose }: LanguageSelectorProps) {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center font-mono">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-lg border border-green-800 bg-slate-900 p-1 shadow-[0_0_30px_rgba(0,255,0,0.1)]"
            >
                {/* Window header */}
                <div className="bg-green-900/20 p-3 border-b border-green-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-500">
                        <Globe size={16} />
                        <span className="text-sm font-bold tracking-widest uppercase">Semantic Protocol Override</span>
                    </div>
                    <button onClick={onClose} className="text-green-700 hover:text-green-400 text-xs">[X] ABORT</button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-400 mb-4 border-l-2 border-yellow-600 pl-3">
                        WARNING: Switching language requires a generic coffee break. Please wait while we rearrange the pixels.
                    </p>

                    <div className="space-y-2">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => onSelect(lang.id)}
                                className={`w-full text-left p-3 border flex items-center justify-between group transition-all
                  ${currentLang === lang.id
                                    ? "border-green-500 bg-green-900/20 text-green-400"
                                    : "border-slate-700 hover:border-green-700 text-slate-500 hover:text-green-600"
                                }`}
                            >
                                <div>
                                    <div className="text-sm font-bold uppercase">{lang.label}</div>
                                    {/* Print risk */}
                                    <div className={`text-[10px] ${lang.id === 'ASM' ? 'text-red-500 font-bold animate-pulse' : 'opacity-60'}`}>
                                        Risk Level: {lang.risk}
                                    </div>
                                </div>
                                {currentLang === lang.id && <Check size={16} />}
                                {currentLang !== lang.id && <div className="opacity-0 group-hover:opacity-100 text-[10px] uppercase">[LOAD]</div>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fake footer */}
                <div className="bg-black p-2 border-t border-green-900 text-[10px] text-green-800 flex justify-between">
                    <span>MEM: 0x4F2A</span>
                    <span>PRESS F1 FOR HELP</span>
                </div>
            </motion.div>
        </div>
    );
}