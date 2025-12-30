/**
 * AbstractLocalizationMatrixFactory.ts
 * * @module Core/Linguistics
 * @description Provides a singleton factory pattern for resolving cross-cultural
 * semantic tokens within the execution runtime.
 */

export type LanguageType = "STANDARD" | "CORPORATE" | "CPP" | "ASM" | "CHAOS";

interface TranslationSchema {
    systemName: string;
    status: string;
    executeBtn: string;
    logsTitle: string;
    fileExplorer: string;
    outputLocked: string;
    unsecure: string;
    cpu: string;
}

interface FileSchema {
    name: string;
    type: "folder" | "file";
    depth: number;
}

export const TRANSLATIONS: Record<LanguageType, TranslationSchema> = {
    STANDARD: {
        systemName: "HelloWorld Pro Max",
        status: "System Ready",
        executeBtn: "Execute Sequence",
        logsTitle: "System Logs",
        fileExplorer: "Project Explorer",
        outputLocked: "Output Stream Locked",
        unsecure: "Unsecure Connection",
        cpu: "CPU Usage",
    },
    CORPORATE: {
        systemName: "Global Synergy Solution v1.0",
        status: "Aligning Key Stakeholders...",
        executeBtn: "Leverage Core Competencies",
        logsTitle: "Audit Trail",
        fileExplorer: "Asset Management Silo",
        outputLocked: "Deliverable Pending Approval",
        unsecure: "Compliance Risk Detected",
        cpu: "Resource Allocation",
    },
    CPP: {
        systemName: "std::cout << obj.toString()",
        status: "return 0;",
        executeBtn: "void* run(void* args)",
        logsTitle: "std::vector<Log> logs",
        fileExplorer: "#include <filesystem>",
        outputLocked: "throw AccessDeniedException",
        unsecure: "SSL_Handshake_Failed",
        cpu: "malloc(1024)",
    },
    ASM: {
        systemName: "SECTION .DATA",
        status: "WAITING FOR INT 0x80",
        executeBtn: "JMP _start",
        logsTitle: "STACK POINTER (ESP)",
        fileExplorer: "SEGMENT .TEXT",
        outputLocked: "SEGMENTATION FAULT",
        unsecure: "RING 0 ACCESS GRANTED",
        cpu: "NOP NOP NOP",
    },
    CHAOS: {
        systemName: "H̵e̷l̵l̴o̷W̷o̸r̴l̶d̷",
        status: "E̶R̶R̷O̴R̵_̵4̴0̴4̵",
        executeBtn: "D̴O̵ ̷N̵O̴T̵ ̷C̵L̵I̵C̷K̵",
        logsTitle: "W̷h̷y̷ ̷a̷r̷e̷ ̷y̷o̷u̷ ̷h̷e̷r̷e̷?",
        fileExplorer: "̷D̷a̷t̷a̷ ̷L̷o̷s̷t̷",
        outputLocked: "̷N̷o̷ ̷E̷s̷c̷a̷p̷e̷",
        unsecure: "̷R̷U̷N̷",
        cpu: "̷∞̷%̷",
    }
};

export const FILE_STRUCTURES: Record<LanguageType, FileSchema[]> = {
    STANDARD: [
        { name: "src", type: "folder", depth: 0 },
        { name: "main", type: "folder", depth: 1 },
        { name: "java", type: "folder", depth: 2 },
        { name: "com", type: "folder", depth: 3 },
        { name: "enterprise", type: "folder", depth: 4 },
        { name: "HelloWorldFactory.java", type: "file", depth: 5 },
        { name: "AbstractPrinter.java", type: "file", depth: 5 },
    ],
    CORPORATE: [
        { name: "Deliverables", type: "folder", depth: 0 },
        { name: "Q4_FY2024", type: "folder", depth: 1 },
        { name: "Legal", type: "folder", depth: 2 },
        { name: "Hello_World_Proposal_v12_FINAL.pptx", type: "file", depth: 3 },
        { name: "Budget_Approval.xlsx", type: "file", depth: 3 },
        { name: "Dismissal_Letters_Template.docx", type: "file", depth: 3 },
    ],
    CPP: [
        { name: "include", type: "folder", depth: 0 },
        { name: "legacy_wrapper.h", type: "file", depth: 1 },
        { name: "src", type: "folder", depth: 0 },
        { name: "unsafe_pointers", type: "folder", depth: 1 },
        { name: "main.cpp", type: "file", depth: 2 },
        { name: "segmentation_fault_handler.c", type: "file", depth: 2 },
        { name: "Makefile", type: "file", depth: 0 },
    ],
    ASM: [
        { name: "boot", type: "folder", depth: 0 },
        { name: "mbr.asm", type: "file", depth: 1 },
        { name: "kernel.s", type: "file", depth: 1 },
        { name: "drivers", type: "folder", depth: 0 },
        { name: "vga_print.asm", type: "file", depth: 1 },
        { name: "keyboard_isr.asm", type: "file", depth: 1 },
        { name: "linker.ld", type: "file", depth: 0 },
        { name: "make.sh", type: "file", depth: 0 },
    ],
    CHAOS: [
        { name: "̷r̷o̷o̷t̷", type: "folder", depth: 0 },
        { name: "n̸u̸l̸l̸", type: "folder", depth: 1 },
        { name: "0xFE4A.bin", type: "file", depth: 2 },
        { name: "run_away.exe", type: "file", depth: 2 },
        { name: "DONT_OPEN.txt", type: "file", depth: 0 },
    ]
};