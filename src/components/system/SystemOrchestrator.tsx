"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import StartupSequence from "@/components/system/StartupSequence";
import LanguageSelector from "@/components/system/LanguageSelector";
import { Lock, Cpu, Activity, AlertTriangle, Globe, Settings, Folder, FileCode } from "lucide-react";
import { TRANSLATIONS, FILE_STRUCTURES, LanguageType } from "@/lib/AbstractLocalizationMatrixFactory";

export default function SystemOrchestrator() {
    const [isSystemReady, setIsSystemReady] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [currentLang, setCurrentLang] = useState<LanguageType>("STANDARD");
    const [isLangSelectorOpen, setIsLangSelectorOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const t = TRANSLATIONS[currentLang];
    const currentFiles = FILE_STRUCTURES[currentLang];

    const handleExecute = () => {
        setLogs((prev) => [...prev, `[USER]: Initiating ${t.executeBtn}...`]);
        setTimeout(() => {
            setLogs((prev) => [...prev, `[KERNEL]: ${t.status}`]);
        }, 600);
    };

    const handleLanguageChange = (lang: LanguageType) => {
        setLogs((prev) => [...prev, `[SYSTEM]: Context switch to ${lang} mode...`]);
        setCurrentLang(lang);
        setIsLangSelectorOpen(false);
    };

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    if (!mounted) return null;

    if (!isSystemReady) {
        return <StartupSequence onCompleteAction={() => setIsSystemReady(true)} />;
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-300 font-mono p-4 overflow-hidden selection:bg-green-900 selection:text-green-400">

            {/* Choosing language */}
            {isLangSelectorOpen && (
                <LanguageSelector
                    currentLang={currentLang}
                    onSelect={handleLanguageChange}
                    onClose={() => setIsLangSelectorOpen(false)}
                />
            )}

            {/* HEADER */}
            <header className="flex justify-between items-center border-b border-slate-800 pb-4 mb-8">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 border-r border-slate-800 pr-6">
                        <Image
                            src="/HelloWorldProMaxLogo.png"
                            alt="Corporate Identity"
                            width={32}
                            height={32}
                            className="opacity-90 shadow-[0_0_15px_rgba(0,255,0,0.2)]"
                        />
                        <div className="leading-none">
                            <h1 className="text-sm font-bold tracking-tighter text-slate-200">
                                HWPM <span className="text-green-600">ENTERPRISE</span>
                            </h1>
                            <span className="text-[8px] text-slate-500 uppercase tracking-widest">v9.2.1-stable</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs text-red-400 border border-red-900/50 px-2 py-1 bg-red-950/20">
                        <AlertTriangle size={14} />
                        {/* USING CONSTANT FOR ALERTS (e.g.: "RING 0 ACCESS" to ASM) */}
                        <span>{t.unsecure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-400 border border-blue-900/50 px-2 py-1 bg-blue-950/20">
                        <Cpu size={14} />
                        {/* USING CONSTANT FOR CPU (e.g.: "NOP NOP" to ASM) */}
                        <span>{t.cpu}</span>
                    </div>
                </div>

                <button
                    onClick={() => setIsLangSelectorOpen(true)}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-green-400 border border-transparent hover:border-green-900 px-2 py-1 transition-all"
                >
                    <Globe size={14} />
                    <span>MODE: {currentLang}</span>
                    <Settings size={14} className="ml-1 opacity-50" />
                </button>
            </header>

            <div className="grid grid-cols-12 gap-6 h-[80vh]">

                {/* LEFT PANEL: DYNAMIC FILE EXPLORER */}
                <aside className="col-span-3 border border-slate-800 bg-slate-900/30 p-4 rounded-sm flex flex-col">
                    <div className="text-xs text-slate-500 mb-4 border-b border-slate-800 pb-2 uppercase font-bold tracking-wider">
                        {t.fileExplorer}
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <ul className="text-sm space-y-1 font-mono">
                            {/* RENDER SPECIFIC FILES FOR CHOSEN LANGUAGE  */}
                            {currentFiles.map((item, idx) => (
                                <li
                                    key={idx}
                                    style={{ paddingLeft: `${item.depth * 12}px` }}
                                    className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-800/50 cursor-pointer transition-colors
                                ${item.type === 'file' ? 'text-slate-300 hover:text-green-400' : 'text-slate-500'}
                            `}
                                >
                                    {item.type === 'folder' ? (
                                        <Folder size={14} className="fill-slate-700 stroke-slate-500" />
                                    ) : (
                                        <FileCode size={14} className={item.name.includes('FINAL') ? 'text-red-400' : ''} />
                                    )}

                                    <span className={item.type === 'file' ? '' : 'font-bold'}>
                                {item.name}
                            </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-600 flex justify-between">
                        <span>{currentFiles.length} OBJECTS</span>
                        <span>RO</span>
                    </div>
                </aside>

                {/* CENTER PANEL: RUN ZONE */}
                <section className="col-span-6 flex flex-col gap-6">
                    <div className="flex-1 border border-slate-700 bg-black relative rounded-sm p-8 flex items-center justify-center">
                        <div className="text-center opacity-50">
                            <Lock className="mx-auto mb-2 text-slate-600" />
                            {/* LOCK MESSAGE (e.g.: "SEGMENTATION FAULT" to ASM) */}
                            <p className="text-xs uppercase tracking-widest">{t.outputLocked}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleExecute}
                        className="bg-green-900/20 border border-green-600 text-green-500 py-4 uppercase tracking-[0.3em] hover:bg-green-500 hover:text-black transition-all active:scale-[0.98]"
                    >
                        {/* RUN BUTTON (e.g.:: "JMP _start" to ASM) */}
                        {t.executeBtn}
                    </button>
                </section>

                {/* RIGHT PANEL: LOGURI */}
                <aside className="col-span-3 border border-slate-800 bg-slate-900/30 p-4 rounded-sm flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 border-b border-slate-800 pb-2 uppercase">
                        {/* LOGS TITLE (e.g.: "STACK POINTER (ESP)" to ASM) */}
                        <Activity size={12} /> {t.logsTitle}
                    </div>
                    <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 text-slate-500">
                        {logs.map((log, i) => (
                            <p key={i} className="text-green-400 border-l border-green-900 pl-2">{log}</p>
                        ))}
                    </div>
                </aside>

            </div>
        </main>
    );
}