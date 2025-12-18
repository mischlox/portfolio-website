(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Common/Data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/Data.ts
__turbopack_context__.s([
    "NavItems",
    ()=>NavItems,
    "PROFILE",
    ()=>PROFILE
]);
const NavItems = [
    {
        label: 'Assistant',
        view: 'chat',
        iconName: 'Sparkles'
    },
    {
        label: 'About Me',
        view: 'about',
        iconName: 'User'
    },
    {
        label: 'Portfolio',
        view: 'projects',
        iconName: 'Code'
    },
    {
        label: 'Contact',
        view: 'contact',
        iconName: 'Mail'
    }
];
const PROFILE = {
    first_name: "Michael",
    last_name: "Schlosser",
    full_name: "Michael Schlosser",
    // ... rest of the PROFILE data ...
    role: "Software Engineer",
    tagline: "Bridging human intent with machine execution.",
    about: "I build intelligent systems. My focus is on RAG pipelines, Vector Search, and high-performance LLM inference. I value clarity in code and elegance in architecture.",
    experience: [
        {
            company: "TechNova AI",
            role: "Senior AI Engineer",
            year: "2023 - Present",
            desc: "Optimizing LLM inference latency and building RAG pipelines for enterprise clients."
        },
        {
            company: "DataFlow",
            role: "Backend Developer",
            year: "2021 - 2023",
            desc: "Architected scalable microservices in Go. Migrated legacy monoliths to Kubernetes."
        }
    ],
    education: [
        {
            school: "TU Munich",
            degree: "M.Sc. Computer Science",
            year: "2019 - 2021"
        },
        {
            school: "KIT",
            degree: "B.Sc. Informatics",
            year: "2016 - 2019"
        }
    ],
    projects: [
        {
            title: "NeuralSearch",
            cat: "Infrastructure",
            desc: "Semantic search engine for legal docs using Pinecone & OpenAI."
        },
        {
            title: "GiftGenie",
            cat: "Product",
            desc: "Next.js e-commerce platform with generative AI gifting."
        },
        {
            title: "AutoDeploy",
            cat: "DevOps",
            desc: "Automated CI/CD pipeline generator for microservices."
        },
        {
            title: "VisionCheck",
            cat: "Computer Vision",
            desc: "Manufacturing defect detection using YOLOv8."
        }
    ],
    skills: [
        "Python",
        "TypeScript",
        "PyTorch",
        "LangChain",
        "FastAPI",
        "Docker",
        "PostgreSQL",
        "AWS"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Layout/Navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/Layout/Navigation.tsx
__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Common$2f$Data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Common/Data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>"); // Import icons here
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
'use client'; // Ensure this component is marked as a Client Component
;
;
;
;
// Map the string name to the actual component
const IconMap = {
    Sparkles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
    User: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
    Code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"],
    Mail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"]
};
const NavTab = ({ label, view, current, set, iconName })=>{
    const active = current === view;
    const Icon = IconMap[iconName]; // Get the component using the string name
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>set(view),
        className: `relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 flex items-center gap-2 ${active ? 'text-black' : 'text-gray-400 hover:text-white'}`,
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                layoutId: "activeTab",
                className: "absolute inset-0 bg-white rounded-full -z-10 shadow-lg",
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }
            }, void 0, false, {
                fileName: "[project]/components/Layout/Navigation.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 18,
                className: active ? 'text-black' : 'text-gray-600'
            }, void 0, false, {
                fileName: "[project]/components/Layout/Navigation.tsx",
                lineNumber: 43,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            label
        ]
    }, void 0, true, {
        fileName: "[project]/components/Layout/Navigation.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = NavTab;
const Navigation = ({ scrolled, activeView, setActiveView })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${scrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto px-6 flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>setActiveView('chat'),
                    className: "flex items-center gap-2 text-lg font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-5 h-5 bg-white rounded-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-black rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/components/Layout/Navigation.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/Layout/Navigation.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Common$2f$Data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROFILE"].full_name
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Layout/Navigation.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-lg",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Common$2f$Data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavItems"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavTab, {
                            label: item.label,
                            view: item.view,
                            current: activeView,
                            set: setActiveView,
                            iconName: item.iconName
                        }, item.view, false, {
                            fileName: "[project]/components/Layout/Navigation.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/components/Layout/Navigation.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "md:hidden text-sm text-gray-400",
                    children: "Menu"
                }, void 0, false, {
                    fileName: "[project]/components/Layout/Navigation.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/Layout/Navigation.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/Layout/Navigation.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = Navigation;
var _c, _c1;
__turbopack_context__.k.register(_c, "NavTab");
__turbopack_context__.k.register(_c1, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_0e4ed06f._.js.map