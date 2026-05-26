import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
// ─── FIREBASE ─────────────────────────────────────────────────────────────────
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC5MNx6rZSAObKUdFtbD2dnnLWh7bWK9Co",
    authDomain: "prode-mundial-2026-andacollo.firebaseapp.com",
    projectId: "prode-mundial-2026-andacollo",
    storageBucket: "prode-mundial-2026-andacollo.firebasestorage.app",
    messagingSenderId: "592044958169",
    appId: "1:592044958169:web:59cd6be7b72c313c3279c8",
    databaseURL: "https://prode-mundial-2026-andacollo-default-rtdb.firebaseio.com",
};
let FDB = null;
try {
    FDB = getDatabase(initializeApp(FIREBASE_CONFIG));
}
catch (e) {
    console.warn("Firebase:", e);
}
const fbKey = k => k.replace(/[.#$[\]]/g, '_');
// ─── FUENTES ─────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
input[type=number] { -moz-appearance: textfield; }
select option { background: #0f1a2e; color: #e8f0ff; }`;
// ─── DATOS ───────────────────────────────────────────────────────────────────
const GRP = [
    { id: 'A', t: ['México', 'Sudáfrica', 'Corea del Sur', 'Rep. Checa'] },
    { id: 'B', t: ['Canadá', 'Bosnia-Herz.', 'Qatar', 'Suiza'] },
    { id: 'C', t: ['Brasil', 'Marruecos', 'Haití', 'Escocia'] },
    { id: 'D', t: ['EE.UU.', 'Paraguay', 'Australia', 'Turquía'] },
    { id: 'E', t: ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'] },
    { id: 'F', t: ['Países Bajos', 'Japón', 'Suecia', 'Túnez'] },
    { id: 'G', t: ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'] },
    { id: 'H', t: ['España', 'Cabo Verde', 'Arabia Saudita', 'Uruguay'] },
    { id: 'I', t: ['Francia', 'Senegal', 'Irak', 'Noruega'] },
    { id: 'J', t: ['Argentina', 'Argelia', 'Austria', 'Jordania'] },
    { id: 'K', t: ['Portugal', 'R.D. Congo', 'Uzbekistán', 'Colombia'] },
    { id: 'L', t: ['Inglaterra', 'Croacia', 'Ghana', 'Panamá'] },
];
const ALL_TEAMS = GRP.flatMap(g => g.t);
const CC = {
    'México': 'mx', 'Sudáfrica': 'za', 'Corea del Sur': 'kr', 'Rep. Checa': 'cz',
    'Canadá': 'ca', 'Bosnia-Herz.': 'ba', 'Qatar': 'qa', 'Suiza': 'ch',
    'Brasil': 'br', 'Marruecos': 'ma', 'Haití': 'ht', 'Escocia': 'gb-sct',
    'EE.UU.': 'us', 'Paraguay': 'py', 'Australia': 'au', 'Turquía': 'tr',
    'Alemania': 'de', 'Curazao': 'cw', 'Costa de Marfil': 'ci', 'Ecuador': 'ec',
    'Países Bajos': 'nl', 'Japón': 'jp', 'Suecia': 'se', 'Túnez': 'tn',
    'Bélgica': 'be', 'Egipto': 'eg', 'Irán': 'ir', 'Nueva Zelanda': 'nz',
    'España': 'es', 'Cabo Verde': 'cv', 'Arabia Saudita': 'sa', 'Uruguay': 'uy',
    'Francia': 'fr', 'Senegal': 'sn', 'Irak': 'iq', 'Noruega': 'no',
    'Argentina': 'ar', 'Argelia': 'dz', 'Austria': 'at', 'Jordania': 'jo',
    'Portugal': 'pt', 'R.D. Congo': 'cd', 'Uzbekistán': 'uz', 'Colombia': 'co',
    'Inglaterra': 'gb-eng', 'Croacia': 'hr', 'Ghana': 'gh', 'Panamá': 'pa',
};
// CSS gradient flags (sin recursos externos)
const FLAG_CSS = {
    'México': ['linear-gradient(to right,#006847 33%,#fff 33% 67%,#ce1126 67%)', '#006847'],
    'Sudáfrica': ['linear-gradient(135deg,#007a4d 40%,#000 40% 45%,#de3831 45%)', '#007a4d'],
    'Corea del Sur': ['linear-gradient(to bottom,#fff 50%,#c60c30 50%)', '#c60c30'],
    'Rep. Checa': ['linear-gradient(to bottom,#fff 50%,#d7141a 50%)', '#11457e'],
    'Canadá': ['linear-gradient(to right,#ff0000 25%,#fff 25% 75%,#ff0000 75%)', '#ff0000'],
    'Bosnia-Herz.': ['linear-gradient(135deg,#fecb00 45%,#002395 45%)', '#002395'],
    'Qatar': ['linear-gradient(to right,#8d1b3d 65%,#fff 65%)', '#8d1b3d'],
    'Suiza': ['linear-gradient(45deg,#ff0000,#cc0000)', '#ff0000'],
    'Brasil': ['linear-gradient(to bottom,#009c3b 33%,#fedf00 33% 67%,#009c3b 67%)', '#fedf00'],
    'Marruecos': ['linear-gradient(45deg,#c1272d,#a01020)', '#c1272d'],
    'Haití': ['linear-gradient(to bottom,#00209f 50%,#d21034 50%)', '#00209f'],
    'Escocia': ['linear-gradient(45deg,#003f87 40%,#fff 40% 60%,#003f87 60%)', '#003f87'],
    'EE.UU.': ['linear-gradient(to bottom,#b22234 33%,#fff 33% 67%,#3c3b6e 67%)', '#b22234'],
    'Paraguay': ['linear-gradient(to bottom,#d52b1e 33%,#fff 33% 67%,#009ada 67%)', '#d52b1e'],
    'Australia': ['linear-gradient(to right,#00008b 60%,#cc0000 60%)', '#00008b'],
    'Turquía': ['linear-gradient(45deg,#e30a17,#bb0812)', '#e30a17'],
    'Alemania': ['linear-gradient(to bottom,#000 33%,#dd0000 33% 67%,#ffce00 67%)', '#dd0000'],
    'Curazao': ['linear-gradient(to bottom,#002b7f 60%,#f9e814 60%)', '#002b7f'],
    'Costa de Marfil': ['linear-gradient(to right,#f77f00 33%,#fff 33% 67%,#009a44 67%)', '#009a44'],
    'Ecuador': ['linear-gradient(to bottom,#ffd100 40%,#034ca2 40% 70%,#ed1c24 70%)', '#034ca2'],
    'Países Bajos': ['linear-gradient(to bottom,#ae1c28 33%,#fff 33% 67%,#21468b 67%)', '#ae1c28'],
    'Japón': ['linear-gradient(45deg,#f0f0f0,#fff)', '#bc002d'],
    'Suecia': ['linear-gradient(to bottom,#006aa7 38%,#fecc02 38% 62%,#006aa7 62%)', '#006aa7'],
    'Túnez': ['linear-gradient(to right,#e70013 25%,#fff 25% 75%,#e70013 75%)', '#e70013'],
    'Bélgica': ['linear-gradient(to right,#000 33%,#fdda24 33% 67%,#ef3340 67%)', '#fdda24'],
    'Egipto': ['linear-gradient(to bottom,#ce1126 33%,#fff 33% 67%,#000 67%)', '#ce1126'],
    'Irán': ['linear-gradient(to bottom,#239f40 33%,#fff 33% 67%,#da0000 67%)', '#239f40'],
    'Nueva Zelanda': ['linear-gradient(to right,#00247d 60%,#cc0000 60%)', '#00247d'],
    'España': ['linear-gradient(to bottom,#c60b1e 27%,#f1bf00 27% 73%,#c60b1e 73%)', '#c60b1e'],
    'Cabo Verde': ['linear-gradient(to bottom,#003893 60%,#cf2027 60%)', '#003893'],
    'Arabia Saudita': ['linear-gradient(45deg,#006c35,#004d25)', '#006c35'],
    'Uruguay': ['linear-gradient(to bottom,#5abce1 25%,#fff 25% 50%,#5abce1 50% 75%,#fff 75%)', '#5abce1'],
    'Francia': ['linear-gradient(to right,#002395 33%,#fff 33% 67%,#ed2939 67%)', '#002395'],
    'Senegal': ['linear-gradient(to right,#00853f 33%,#fdef42 33% 67%,#e31b23 67%)', '#00853f'],
    'Irak': ['linear-gradient(to bottom,#ce1126 33%,#fff 33% 67%,#000 67%)', '#007a3d'],
    'Noruega': ['linear-gradient(to right,#ef2b2d 33%,#fff 33% 40%,#002868 40% 60%,#fff 60% 67%,#ef2b2d 67%)', '#ef2b2d'],
    'Argentina': ['linear-gradient(to bottom,#74acdf 30%,#fff 30% 70%,#74acdf 70%)', '#74acdf'],
    'Argelia': ['linear-gradient(to right,#006233 50%,#fff 50%)', '#006233'],
    'Austria': ['linear-gradient(to bottom,#ed2939 33%,#fff 33% 67%,#ed2939 67%)', '#ed2939'],
    'Jordania': ['linear-gradient(to bottom,#000 33%,#fff 33% 67%,#007a3d 67%)', '#007a3d'],
    'Portugal': ['linear-gradient(to right,#006600 35%,#ff0000 35%)', '#006600'],
    'R.D. Congo': ['linear-gradient(135deg,#007fff 50%,#ce1020 50%)', '#007fff'],
    'Uzbekistán': ['linear-gradient(to bottom,#1eb53a 33%,#fff 33% 67%,#0099b5 67%)', '#1eb53a'],
    'Colombia': ['linear-gradient(to bottom,#fcd116 40%,#003087 40% 70%,#ce1126 70%)', '#fcd116'],
    'Inglaterra': ['linear-gradient(45deg,#cf142b 40%,#fff 40% 60%,#cf142b 60%)', '#cf142b'],
    'Croacia': ['linear-gradient(to bottom,#cc0000 33%,#fff 33% 67%,#171796 67%)', '#cc0000'],
    'Ghana': ['linear-gradient(to bottom,#006b3f 33%,#fcd116 33% 67%,#ce1126 67%)', '#006b3f'],
    'Panamá': ['linear-gradient(to right,#da121a 40%,#fff 40% 60%,#1164b4 60%)', '#da121a'],
};
const Flag = ({ name, h = 18 }) => {
    const f = FLAG_CSS[name];
    const w = Math.round(h * 1.45);
    if (!f)
        return _jsx("span", { style: { display: 'inline-block', width: w, height: h, background: '#333', borderRadius: 2, verticalAlign: 'middle' } });
    return (_jsx("span", { style: {
            display: 'inline-block',
            width: w,
            height: h,
            background: f[0],
            borderRadius: 2,
            verticalAlign: 'middle',
            flexShrink: 0,
            boxShadow: `0 0 0 1px ${f[1]}22`,
        } }));
};
const Team = ({ name, size = 13, reverse = false }) => (_jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 6, flexDirection: reverse ? 'row-reverse' : 'row' }, children: [_jsx(Flag, { name: name, h: size + 4 }), _jsx("span", { style: { fontSize: size, fontFamily: 'DM Sans', fontWeight: 500, color: '#e8f0ff' }, children: name })] }));
const MATCHES = [
    // ── Grupo A ──
    { id: 'ar1m1', g: 'A', round: 1, h: 'México', a: 'Sudáfrica', kickoff: new Date('2026-06-11T18:00:00Z'), dateART: 'Jueves 11 Jun', timeART: '12:00' },
    { id: 'ar1m2', g: 'A', round: 1, h: 'Corea del Sur', a: 'Rep. Checa', kickoff: new Date('2026-06-11T21:00:00Z'), dateART: 'Jueves 11 Jun', timeART: '15:00' },
    { id: 'ar2m1', g: 'A', round: 2, h: 'México', a: 'Corea del Sur', kickoff: new Date('2026-06-18T18:00:00Z'), dateART: 'Jueves 18 Jun', timeART: '12:00' },
    { id: 'ar2m2', g: 'A', round: 2, h: 'Sudáfrica', a: 'Rep. Checa', kickoff: new Date('2026-06-18T21:00:00Z'), dateART: 'Jueves 18 Jun', timeART: '15:00' },
    { id: 'ar3m1', g: 'A', round: 3, h: 'México', a: 'Rep. Checa', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    { id: 'ar3m2', g: 'A', round: 3, h: 'Sudáfrica', a: 'Corea del Sur', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo B ──
    { id: 'br1m1', g: 'B', round: 1, h: 'Canadá', a: 'Bosnia-Herz.', kickoff: new Date('2026-06-12T18:00:00Z'), dateART: 'Viernes 12 Jun', timeART: '12:00' },
    { id: 'br1m2', g: 'B', round: 1, h: 'Qatar', a: 'Suiza', kickoff: new Date('2026-06-12T21:00:00Z'), dateART: 'Viernes 12 Jun', timeART: '15:00' },
    { id: 'br2m1', g: 'B', round: 2, h: 'Canadá', a: 'Qatar', kickoff: new Date('2026-06-18T18:00:00Z'), dateART: 'Jueves 18 Jun', timeART: '12:00' },
    { id: 'br2m2', g: 'B', round: 2, h: 'Bosnia-Herz.', a: 'Suiza', kickoff: new Date('2026-06-18T21:00:00Z'), dateART: 'Jueves 18 Jun', timeART: '15:00' },
    { id: 'br3m1', g: 'B', round: 3, h: 'Canadá', a: 'Suiza', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    { id: 'br3m2', g: 'B', round: 3, h: 'Bosnia-Herz.', a: 'Qatar', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo C ──
    { id: 'cr1m1', g: 'C', round: 1, h: 'Brasil', a: 'Marruecos', kickoff: new Date('2026-06-12T18:00:00Z'), dateART: 'Viernes 12 Jun', timeART: '12:00' },
    { id: 'cr1m2', g: 'C', round: 1, h: 'Haití', a: 'Escocia', kickoff: new Date('2026-06-12T21:00:00Z'), dateART: 'Viernes 12 Jun', timeART: '15:00' },
    { id: 'cr2m1', g: 'C', round: 2, h: 'Brasil', a: 'Haití', kickoff: new Date('2026-06-19T18:00:00Z'), dateART: 'Viernes 19 Jun', timeART: '12:00' },
    { id: 'cr2m2', g: 'C', round: 2, h: 'Marruecos', a: 'Escocia', kickoff: new Date('2026-06-19T21:00:00Z'), dateART: 'Viernes 19 Jun', timeART: '15:00' },
    { id: 'cr3m1', g: 'C', round: 3, h: 'Brasil', a: 'Escocia', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    { id: 'cr3m2', g: 'C', round: 3, h: 'Marruecos', a: 'Haití', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo D ──
    { id: 'dr1m1', g: 'D', round: 1, h: 'EE.UU.', a: 'Paraguay', kickoff: new Date('2026-06-13T18:00:00Z'), dateART: 'Sábado 13 Jun', timeART: '12:00' },
    { id: 'dr1m2', g: 'D', round: 1, h: 'Australia', a: 'Turquía', kickoff: new Date('2026-06-13T21:00:00Z'), dateART: 'Sábado 13 Jun', timeART: '15:00' },
    { id: 'dr2m1', g: 'D', round: 2, h: 'EE.UU.', a: 'Australia', kickoff: new Date('2026-06-19T18:00:00Z'), dateART: 'Viernes 19 Jun', timeART: '12:00' },
    { id: 'dr2m2', g: 'D', round: 2, h: 'Paraguay', a: 'Turquía', kickoff: new Date('2026-06-19T21:00:00Z'), dateART: 'Viernes 19 Jun', timeART: '15:00' },
    { id: 'dr3m1', g: 'D', round: 3, h: 'EE.UU.', a: 'Turquía', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    { id: 'dr3m2', g: 'D', round: 3, h: 'Paraguay', a: 'Australia', kickoff: new Date('2026-06-25T20:00:00Z'), dateART: 'Jueves 25 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo E ──
    { id: 'er1m1', g: 'E', round: 1, h: 'Alemania', a: 'Curazao', kickoff: new Date('2026-06-13T18:00:00Z'), dateART: 'Sábado 13 Jun', timeART: '12:00' },
    { id: 'er1m2', g: 'E', round: 1, h: 'Costa de Marfil', a: 'Ecuador', kickoff: new Date('2026-06-13T21:00:00Z'), dateART: 'Sábado 13 Jun', timeART: '15:00' },
    { id: 'er2m1', g: 'E', round: 2, h: 'Alemania', a: 'Costa de Marfil', kickoff: new Date('2026-06-20T18:00:00Z'), dateART: 'Sábado 20 Jun', timeART: '12:00' },
    { id: 'er2m2', g: 'E', round: 2, h: 'Curazao', a: 'Ecuador', kickoff: new Date('2026-06-20T21:00:00Z'), dateART: 'Sábado 20 Jun', timeART: '15:00' },
    { id: 'er3m1', g: 'E', round: 3, h: 'Alemania', a: 'Ecuador', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    { id: 'er3m2', g: 'E', round: 3, h: 'Curazao', a: 'Costa de Marfil', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo F ──
    { id: 'fr1m1', g: 'F', round: 1, h: 'Países Bajos', a: 'Japón', kickoff: new Date('2026-06-14T18:00:00Z'), dateART: 'Domingo 14 Jun', timeART: '12:00' },
    { id: 'fr1m2', g: 'F', round: 1, h: 'Suecia', a: 'Túnez', kickoff: new Date('2026-06-14T21:00:00Z'), dateART: 'Domingo 14 Jun', timeART: '15:00' },
    { id: 'fr2m1', g: 'F', round: 2, h: 'Países Bajos', a: 'Suecia', kickoff: new Date('2026-06-20T18:00:00Z'), dateART: 'Sábado 20 Jun', timeART: '12:00' },
    { id: 'fr2m2', g: 'F', round: 2, h: 'Japón', a: 'Túnez', kickoff: new Date('2026-06-20T21:00:00Z'), dateART: 'Sábado 20 Jun', timeART: '15:00' },
    { id: 'fr3m1', g: 'F', round: 3, h: 'Países Bajos', a: 'Túnez', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    { id: 'fr3m2', g: 'F', round: 3, h: 'Japón', a: 'Suecia', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo G ──
    { id: 'gr1m1', g: 'G', round: 1, h: 'Bélgica', a: 'Egipto', kickoff: new Date('2026-06-14T18:00:00Z'), dateART: 'Domingo 14 Jun', timeART: '12:00' },
    { id: 'gr1m2', g: 'G', round: 1, h: 'Irán', a: 'Nueva Zelanda', kickoff: new Date('2026-06-14T21:00:00Z'), dateART: 'Domingo 14 Jun', timeART: '15:00' },
    { id: 'gr2m1', g: 'G', round: 2, h: 'Bélgica', a: 'Irán', kickoff: new Date('2026-06-21T18:00:00Z'), dateART: 'Domingo 21 Jun', timeART: '12:00' },
    { id: 'gr2m2', g: 'G', round: 2, h: 'Egipto', a: 'Nueva Zelanda', kickoff: new Date('2026-06-21T21:00:00Z'), dateART: 'Domingo 21 Jun', timeART: '15:00' },
    { id: 'gr3m1', g: 'G', round: 3, h: 'Bélgica', a: 'Nueva Zelanda', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    { id: 'gr3m2', g: 'G', round: 3, h: 'Egipto', a: 'Irán', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo H ──
    { id: 'hr1m1', g: 'H', round: 1, h: 'España', a: 'Cabo Verde', kickoff: new Date('2026-06-15T18:00:00Z'), dateART: 'Lunes 15 Jun', timeART: '12:00' },
    { id: 'hr1m2', g: 'H', round: 1, h: 'Arabia Saudita', a: 'Uruguay', kickoff: new Date('2026-06-15T21:00:00Z'), dateART: 'Lunes 15 Jun', timeART: '15:00' },
    { id: 'hr2m1', g: 'H', round: 2, h: 'España', a: 'Arabia Saudita', kickoff: new Date('2026-06-21T18:00:00Z'), dateART: 'Domingo 21 Jun', timeART: '12:00' },
    { id: 'hr2m2', g: 'H', round: 2, h: 'Cabo Verde', a: 'Uruguay', kickoff: new Date('2026-06-21T21:00:00Z'), dateART: 'Domingo 21 Jun', timeART: '15:00' },
    { id: 'hr3m1', g: 'H', round: 3, h: 'España', a: 'Uruguay', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    { id: 'hr3m2', g: 'H', round: 3, h: 'Cabo Verde', a: 'Arabia Saudita', kickoff: new Date('2026-06-26T20:00:00Z'), dateART: 'Viernes 26 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo I ──
    { id: 'ir1m1', g: 'I', round: 1, h: 'Francia', a: 'Senegal', kickoff: new Date('2026-06-15T18:00:00Z'), dateART: 'Lunes 15 Jun', timeART: '12:00' },
    { id: 'ir1m2', g: 'I', round: 1, h: 'Irak', a: 'Noruega', kickoff: new Date('2026-06-15T21:00:00Z'), dateART: 'Lunes 15 Jun', timeART: '15:00' },
    { id: 'ir2m1', g: 'I', round: 2, h: 'Francia', a: 'Irak', kickoff: new Date('2026-06-22T18:00:00Z'), dateART: 'Lunes 22 Jun', timeART: '12:00' },
    { id: 'ir2m2', g: 'I', round: 2, h: 'Senegal', a: 'Noruega', kickoff: new Date('2026-06-22T21:00:00Z'), dateART: 'Lunes 22 Jun', timeART: '15:00' },
    { id: 'ir3m1', g: 'I', round: 3, h: 'Francia', a: 'Noruega', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    { id: 'ir3m2', g: 'I', round: 3, h: 'Senegal', a: 'Irak', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo J ──
    { id: 'jr1m1', g: 'J', round: 1, h: 'Argentina', a: 'Argelia', kickoff: new Date('2026-06-16T18:00:00Z'), dateART: 'Martes 16 Jun', timeART: '12:00' },
    { id: 'jr1m2', g: 'J', round: 1, h: 'Austria', a: 'Jordania', kickoff: new Date('2026-06-16T21:00:00Z'), dateART: 'Martes 16 Jun', timeART: '15:00' },
    { id: 'jr2m1', g: 'J', round: 2, h: 'Argentina', a: 'Austria', kickoff: new Date('2026-06-22T18:00:00Z'), dateART: 'Lunes 22 Jun', timeART: '12:00' },
    { id: 'jr2m2', g: 'J', round: 2, h: 'Argelia', a: 'Jordania', kickoff: new Date('2026-06-22T21:00:00Z'), dateART: 'Lunes 22 Jun', timeART: '15:00' },
    { id: 'jr3m1', g: 'J', round: 3, h: 'Argentina', a: 'Jordania', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    { id: 'jr3m2', g: 'J', round: 3, h: 'Argelia', a: 'Austria', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo K ──
    { id: 'kr1m1', g: 'K', round: 1, h: 'Portugal', a: 'R.D. Congo', kickoff: new Date('2026-06-16T18:00:00Z'), dateART: 'Martes 16 Jun', timeART: '12:00' },
    { id: 'kr1m2', g: 'K', round: 1, h: 'Uzbekistán', a: 'Colombia', kickoff: new Date('2026-06-16T21:00:00Z'), dateART: 'Martes 16 Jun', timeART: '15:00' },
    { id: 'kr2m1', g: 'K', round: 2, h: 'Portugal', a: 'Uzbekistán', kickoff: new Date('2026-06-23T18:00:00Z'), dateART: 'Martes 23 Jun', timeART: '12:00' },
    { id: 'kr2m2', g: 'K', round: 2, h: 'R.D. Congo', a: 'Colombia', kickoff: new Date('2026-06-23T21:00:00Z'), dateART: 'Martes 23 Jun', timeART: '15:00' },
    { id: 'kr3m1', g: 'K', round: 3, h: 'Portugal', a: 'Colombia', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    { id: 'kr3m2', g: 'K', round: 3, h: 'R.D. Congo', a: 'Uzbekistán', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    // ── Grupo L ──
    { id: 'lr1m1', g: 'L', round: 1, h: 'Inglaterra', a: 'Croacia', kickoff: new Date('2026-06-17T18:00:00Z'), dateART: 'Miércoles 17 Jun', timeART: '12:00' },
    { id: 'lr1m2', g: 'L', round: 1, h: 'Ghana', a: 'Panamá', kickoff: new Date('2026-06-17T21:00:00Z'), dateART: 'Miércoles 17 Jun', timeART: '15:00' },
    { id: 'lr2m1', g: 'L', round: 2, h: 'Inglaterra', a: 'Ghana', kickoff: new Date('2026-06-23T18:00:00Z'), dateART: 'Martes 23 Jun', timeART: '12:00' },
    { id: 'lr2m2', g: 'L', round: 2, h: 'Croacia', a: 'Panamá', kickoff: new Date('2026-06-23T21:00:00Z'), dateART: 'Martes 23 Jun', timeART: '15:00' },
    { id: 'lr3m1', g: 'L', round: 3, h: 'Inglaterra', a: 'Panamá', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    { id: 'lr3m2', g: 'L', round: 3, h: 'Croacia', a: 'Ghana', kickoff: new Date('2026-06-27T20:00:00Z'), dateART: 'Sábado 27 Jun', timeART: '14:00', simultaneous: true },
    // ── Round of 32 (bracket oficial FIFA) ──
    // Slots: '1X'=ganador grupo X, '2X'=subcampeón, '3XYZ'=mejor 3° de esos grupos
    { id: 'r32m01', g: 'R32', round: 4, slot1: '2A', slot2: '2B', h: '', a: '', label: 'Octavos 1', kickoff: new Date('2026-06-28T21:00:00Z'), dateART: 'Domingo 28 Jun', timeART: '18:00', venue: 'SoFi Stadium' },
    { id: 'r32m02', g: 'R32', round: 4, slot1: '1E', slot2: '3ABCDF', h: '', a: '', label: 'Octavos 2', kickoff: new Date('2026-06-29T17:00:00Z'), dateART: 'Lunes 29 Jun', timeART: '14:00', venue: 'Gillette Stadium' },
    { id: 'r32m03', g: 'R32', round: 4, slot1: '1F', slot2: '2C', h: '', a: '', label: 'Octavos 3', kickoff: new Date('2026-06-29T21:00:00Z'), dateART: 'Lunes 29 Jun', timeART: '18:00', venue: 'Estadio BBVA' },
    { id: 'r32m04', g: 'R32', round: 4, slot1: '1C', slot2: '2F', h: '', a: '', label: 'Octavos 4', kickoff: new Date('2026-06-30T01:00:00Z'), dateART: 'Lunes 29 Jun', timeART: '22:00', venue: 'NRG Stadium' },
    { id: 'r32m05', g: 'R32', round: 4, slot1: '1I', slot2: '3CDFGH', h: '', a: '', label: 'Octavos 5', kickoff: new Date('2026-06-30T17:00:00Z'), dateART: 'Martes 30 Jun', timeART: '14:00', venue: 'MetLife Stadium' },
    { id: 'r32m06', g: 'R32', round: 4, slot1: '2E', slot2: '2I', h: '', a: '', label: 'Octavos 6', kickoff: new Date('2026-06-30T21:00:00Z'), dateART: 'Martes 30 Jun', timeART: '18:00', venue: 'AT&T Stadium' },
    { id: 'r32m07', g: 'R32', round: 4, slot1: '1A', slot2: '3CEFHI', h: '', a: '', label: 'Octavos 7', kickoff: new Date('2026-07-01T01:00:00Z'), dateART: 'Martes 30 Jun', timeART: '22:00', venue: 'Estadio Azteca' },
    { id: 'r32m08', g: 'R32', round: 4, slot1: '1L', slot2: '3EHIJK', h: '', a: '', label: 'Octavos 8', kickoff: new Date('2026-07-01T17:00:00Z'), dateART: 'Miércoles 1 Jul', timeART: '14:00', venue: 'Mercedes-Benz Stadium' },
    { id: 'r32m09', g: 'R32', round: 4, slot1: '1D', slot2: '3BEFIJ', h: '', a: '', label: 'Octavos 9', kickoff: new Date('2026-07-01T21:00:00Z'), dateART: 'Miércoles 1 Jul', timeART: '18:00', venue: "Levi's Stadium" },
    { id: 'r32m10', g: 'R32', round: 4, slot1: '1G', slot2: '3AEHIJ', h: '', a: '', label: 'Octavos 10', kickoff: new Date('2026-07-02T01:00:00Z'), dateART: 'Miércoles 1 Jul', timeART: '22:00', venue: 'Lumen Field' },
    { id: 'r32m11', g: 'R32', round: 4, slot1: '2K', slot2: '2L', h: '', a: '', label: 'Octavos 11', kickoff: new Date('2026-07-02T17:00:00Z'), dateART: 'Jueves 2 Jul', timeART: '14:00', venue: 'BMO Field' },
    { id: 'r32m12', g: 'R32', round: 4, slot1: '1H', slot2: '2J', h: '', a: '', label: 'Octavos 12', kickoff: new Date('2026-07-02T21:00:00Z'), dateART: 'Jueves 2 Jul', timeART: '18:00', venue: 'SoFi Stadium' },
    { id: 'r32m13', g: 'R32', round: 4, slot1: '1B', slot2: '3EFGIJ', h: '', a: '', label: 'Octavos 13', kickoff: new Date('2026-07-03T01:00:00Z'), dateART: 'Jueves 2 Jul', timeART: '22:00', venue: 'BC Place' },
    { id: 'r32m14', g: 'R32', round: 4, slot1: '1J', slot2: '2H', h: '', a: '', label: 'Octavos 14', kickoff: new Date('2026-07-03T17:00:00Z'), dateART: 'Viernes 3 Jul', timeART: '14:00', venue: 'Hard Rock Stadium' },
    { id: 'r32m15', g: 'R32', round: 4, slot1: '1K', slot2: '3DEIJL', h: '', a: '', label: 'Octavos 15', kickoff: new Date('2026-07-03T21:00:00Z'), dateART: 'Viernes 3 Jul', timeART: '18:00', venue: 'Arrowhead Stadium' },
    { id: 'r32m16', g: 'R32', round: 4, slot1: '2D', slot2: '2G', h: '', a: '', label: 'Octavos 16', kickoff: new Date('2026-07-04T01:00:00Z'), dateART: 'Viernes 3 Jul', timeART: '22:00', venue: 'AT&T Stadium' },
    // ── Round of 16 ──
    { id: 'r16m01', g: 'R16', round: 5, slot1: 'w_r32m01', slot2: 'w_r32m02', h: '', a: '', label: 'Cuartos de Final 1', kickoff: new Date('2026-07-04T17:00:00Z'), dateART: 'Sábado 4 Jul', timeART: '14:00', venue: 'Houston' },
    { id: 'r16m02', g: 'R16', round: 5, slot1: 'w_r32m03', slot2: 'w_r32m04', h: '', a: '', label: 'Cuartos de Final 2', kickoff: new Date('2026-07-04T21:00:00Z'), dateART: 'Sábado 4 Jul', timeART: '18:00', venue: 'Philadelphia' },
    { id: 'r16m03', g: 'R16', round: 5, slot1: 'w_r32m05', slot2: 'w_r32m06', h: '', a: '', label: 'Cuartos de Final 3', kickoff: new Date('2026-07-05T20:00:00Z'), dateART: 'Domingo 5 Jul', timeART: '17:00', venue: 'MetLife Stadium' },
    { id: 'r16m04', g: 'R16', round: 5, slot1: 'w_r32m07', slot2: 'w_r32m08', h: '', a: '', label: 'Cuartos de Final 4', kickoff: new Date('2026-07-06T17:00:00Z'), dateART: 'Lunes 6 Jul', timeART: '14:00', venue: 'SoFi Stadium' },
    { id: 'r16m05', g: 'R16', round: 5, slot1: 'w_r32m09', slot2: 'w_r32m10', h: '', a: '', label: 'Cuartos de Final 5', kickoff: new Date('2026-07-06T21:00:00Z'), dateART: 'Lunes 6 Jul', timeART: '18:00', venue: 'Dallas' },
    { id: 'r16m06', g: 'R16', round: 5, slot1: 'w_r32m11', slot2: 'w_r32m12', h: '', a: '', label: 'Cuartos de Final 6', kickoff: new Date('2026-07-07T17:00:00Z'), dateART: 'Martes 7 Jul', timeART: '14:00', venue: 'Seattle' },
    { id: 'r16m07', g: 'R16', round: 5, slot1: 'w_r32m13', slot2: 'w_r32m14', h: '', a: '', label: 'Cuartos de Final 7', kickoff: new Date('2026-07-07T21:00:00Z'), dateART: 'Martes 7 Jul', timeART: '18:00', venue: 'Vancouver' },
    { id: 'r16m08', g: 'R16', round: 5, slot1: 'w_r32m15', slot2: 'w_r32m16', h: '', a: '', label: 'Cuartos de Final 8', kickoff: new Date('2026-07-08T01:00:00Z'), dateART: 'Martes 7 Jul', timeART: '22:00', venue: 'Kansas City' },
    // ── Cuartos de Final ──
    { id: 'qfm01', g: 'QF', round: 6, slot1: 'w_r16m01', slot2: 'w_r16m02', h: '', a: '', label: 'Semifinal 1 — Cuartos A', kickoff: new Date('2026-07-09T21:00:00Z'), dateART: 'Jueves 9 Jul', timeART: '18:00', venue: 'Atlanta' },
    { id: 'qfm02', g: 'QF', round: 6, slot1: 'w_r16m03', slot2: 'w_r16m04', h: '', a: '', label: 'Semifinal 1 — Cuartos B', kickoff: new Date('2026-07-10T21:00:00Z'), dateART: 'Viernes 10 Jul', timeART: '18:00', venue: 'Dallas' },
    { id: 'qfm03', g: 'QF', round: 6, slot1: 'w_r16m05', slot2: 'w_r16m06', h: '', a: '', label: 'Semifinal 2 — Cuartos C', kickoff: new Date('2026-07-11T21:00:00Z'), dateART: 'Sábado 11 Jul', timeART: '18:00', venue: 'Los Ángeles' },
    { id: 'qfm04', g: 'QF', round: 6, slot1: 'w_r16m07', slot2: 'w_r16m08', h: '', a: '', label: 'Semifinal 2 — Cuartos D', kickoff: new Date('2026-07-12T21:00:00Z'), dateART: 'Domingo 12 Jul', timeART: '18:00', venue: 'Nueva York' },
    // ── Semifinales ──
    { id: 'sfm01', g: 'SF', round: 7, slot1: 'w_qfm01', slot2: 'w_qfm02', h: '', a: '', label: 'Semifinal 1', kickoff: new Date('2026-07-14T21:00:00Z'), dateART: 'Martes 14 Jul', timeART: '18:00', venue: 'Dallas (AT&T Stadium)' },
    { id: 'sfm02', g: 'SF', round: 7, slot1: 'w_qfm03', slot2: 'w_qfm04', h: '', a: '', label: 'Semifinal 2', kickoff: new Date('2026-07-15T21:00:00Z'), dateART: 'Miércoles 15 Jul', timeART: '18:00', venue: 'Atlanta (Mercedes-Benz)' },
    // ── Tercer puesto y Final ──
    { id: '3rdplace', g: '3P', round: 8, slot1: 'l_sfm01', slot2: 'l_sfm02', h: '', a: '', label: 'Tercer Puesto', kickoff: new Date('2026-07-18T21:00:00Z'), dateART: 'Sábado 18 Jul', timeART: '18:00', venue: 'Hard Rock Stadium, Miami' },
    { id: 'final', g: 'F', round: 9, slot1: 'w_sfm01', slot2: 'w_sfm02', h: '', a: '', label: '⭐ FINAL ⭐', kickoff: new Date('2026-07-19T21:00:00Z'), dateART: 'Domingo 19 Jul', timeART: '18:00', venue: 'MetLife Stadium, Nueva York' },
];
const AWARDS = [
    { id: 'ballonOr', label: 'Balón de Oro', pts: 5 }, { id: 'ballonPlata', label: 'Balón de Plata', pts: 3 },
    { id: 'ballonBronce', label: 'Balón de Bronce', pts: 1 }, { id: 'botaOr', label: 'Bota de Oro', pts: 5 },
    { id: 'botaPlata', label: 'Bota de Plata', pts: 3 }, { id: 'botaBronce', label: 'Bota de Bronce', pts: 1 },
    { id: 'guanteOr', label: 'Guante de Oro', pts: 5 }, { id: 'mejorJoven', label: 'Mejor Jugador Joven', pts: 5 },
    { id: 'fairPlay', label: 'Fair Play', pts: 5 },
];
// ─── JUGADORES PARA PREMIOS FIFA ──────────────────────────────────────────────
const AWARD_PLAYERS = {
    // Balón de Oro, Plata, Bronce — mejor jugador del torneo
    balon: [
        'Kylian Mbappé', 'Lionel Messi', 'Vinícius Júnior', 'Lamine Yamal', 'Erling Haaland',
        'Jude Bellingham', 'Harry Kane', 'Pedri', 'Ousmane Dembélé', 'Gavi',
        'Florian Wirtz', 'Jamal Musiala', 'Bukayo Saka', 'Phil Foden', 'Declan Rice',
        'Michael Olise', 'Rodrygo', 'Raphinha', 'Julián Álvarez', 'Alexis Mac Allister',
        'Rodrigo De Paul', 'Frenkie de Jong', 'Bernardo Silva', 'Bruno Fernandes',
        'Kevin De Bruyne', 'Romelu Lukaku', 'Darwin Núñez', 'Luis Díaz', 'Nico Williams',
        'Iñaki Williams', 'Álvaro Morata', 'Fabian Ruiz', 'Federico Valverde',
        'Cristiano Ronaldo', 'Ruben Neves', 'Diogo Dalot', 'Virgil van Dijk',
        'Toni Kroos', 'Joshua Kimmich', 'Antonio Rüdiger', 'Theo Hernández',
    ],
    // Bota de Oro, Plata, Bronce — máximo goleador
    bota: [
        'Kylian Mbappé', 'Erling Haaland', 'Harry Kane', 'Vinícius Júnior', 'Raphinha',
        'Ousmane Dembélé', 'Julián Álvarez', 'Romelu Lukaku', 'Darwin Núñez', 'Lionel Messi',
        'Lamine Yamal', 'Cristiano Ronaldo', 'Rodrygo', 'Endrick', 'Michael Olise',
        'Bukayo Saka', 'Marcus Rashford', 'Phil Foden', 'Morata Álvaro', 'Luis Díaz',
        'Nico Williams', 'Takumi Minamino', 'Son Heung-min', 'Sadio Mané',
        'Ivan Toney', 'Ollie Watkins', 'Lorenzo Pellegrini', 'Paulo Dybala',
    ],
    // Guante de Oro — mejor arquero
    guante: [
        'Emiliano Martínez', 'Gianluigi Donnarumma', 'Manuel Neuer', 'Alisson Becker',
        'Jordan Pickford', 'David Raya', 'Mike Maignan', 'Gregor Kobel', 'Jan Oblak',
        'Andriy Lunin', 'Diogo Costa', 'Anthony Lopes', 'Alphonse Areola',
        'Yann Sommer', 'Lukáš Hrádecký', 'Simon Mignolet', 'Wojciech Szczęsny',
    ],
    // Mejor Jugador Joven (nacidos desde 2001)
    joven: [
        'Lamine Yamal', 'Désiré Doué', 'Kenan Yıldız', 'Endrick', 'Warren Zaïre-Emery',
        'Pedri', 'Gavi', 'Florian Wirtz', 'Jamal Musiala', 'Michael Olise',
        'Nico Williams', 'Rodrygo', 'Eduardo Camavinga', 'Axel Disasi',
        'Noni Madueke', 'Anthony Gordon', 'Evan Ferguson', 'Savinho',
        'Ibrahim Sangaré', 'Weston McKennie',
    ],
    // Fair Play — selección nacional
    fairplay: [
        'Argentina', 'Brasil', 'España', 'Francia', 'Inglaterra', 'Alemania', 'Portugal',
        'Países Bajos', 'Bélgica', 'Uruguay', 'Colombia', 'México', 'EE.UU.', 'Canadá',
        'Japón', 'Marruecos', 'Senegal', 'Australia', 'Croacia', 'Polonia',
        'Suiza', 'Austria', 'Dinamarca', 'Suecia', 'Serbia', 'Chile',
    ],
};
// Qué lista de jugadores usa cada premio
const AWARD_PLAYER_LIST = {
    ballonOr: 'balon', ballonPlata: 'balon', ballonBronce: 'balon',
    botaOr: 'bota', botaPlata: 'bota', botaBronce: 'bota',
    guanteOr: 'guante', mejorJoven: 'joven', fairPlay: 'fairplay',
};
// Premios se habilitan al inicio de octavos (28 Jun 2026)
// ─── AUTO-POBLACIÓN DE ELIMINATORIA ──────────────────────────────────────────
// Calcula posiciones de cada grupo desde resultados de partidos
function calcStandings(groupId, mr) {
    const grp = GRP.find(g => g.id === groupId);
    if (!grp)
        return [];
    const stats = {};
    grp.t.forEach(t => stats[t] = { pts: 0, gf: 0, ga: 0, gd: 0, played: 0 });
    MATCHES.filter(m => m.g === groupId && m.round <= 3).forEach(m => {
        const res = mr[m.id];
        if (!res?.played)
            return;
        const h = +res.h, a = +res.a;
        stats[m.h].gf += h;
        stats[m.h].ga += a;
        stats[m.h].played++;
        stats[m.a].gf += a;
        stats[m.a].ga += h;
        stats[m.a].played++;
        if (h > a) {
            stats[m.h].pts += 3;
        }
        else if (h < a) {
            stats[m.a].pts += 3;
        }
        else {
            stats[m.h].pts += 1;
            stats[m.a].pts += 1;
        }
    });
    grp.t.forEach(t => { stats[t].gd = stats[t].gf - stats[t].ga; });
    return grp.t.map(t => ({ team: t, ...stats[t] }))
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team));
}
// Obtiene el mejor 3° de un conjunto de grupos según criterio FIFA
function getBestThirdFromGroups(allowedGroups, usedThirds, mr, grpRes) {
    // Recopilar todos los 3ros de los grupos permitidos que no se usaron
    const candidates = [];
    allowedGroups.forEach(gid => {
        let team3;
        if (grpRes?.groups?.[gid]?.first) {
            // Usar resultados del admin si disponibles
            const standings = calcStandings(gid, mr);
            if (standings.length >= 3)
                team3 = standings[2].team;
        }
        else {
            const standings = calcStandings(gid, mr);
            if (standings.length >= 3)
                team3 = standings[2].team;
        }
        if (team3 && !usedThirds.includes(team3)) {
            const st = calcStandings(gid, mr).find(s => s.team === team3);
            candidates.push({ team: team3, gid, ...st });
        }
    });
    if (!candidates.length)
        return '';
    // Ordenar por puntos, DG, GF
    candidates.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    return candidates[0]?.team || '';
}
// Auto-poblar eliminatoria desde resultados de grupos
function autoPopulateKnockout(grpRes, mr) {
    const get1 = (g) => {
        if (grpRes?.groups?.[g]?.first)
            return grpRes.groups[g].first;
        const s = calcStandings(g, mr);
        return s[0]?.team || '';
    };
    const get2 = (g) => {
        if (grpRes?.groups?.[g]?.second)
            return grpRes.groups[g].second;
        const s = calcStandings(g, mr);
        return s[1]?.team || '';
    };
    // Calcular los 8 mejores terceros (criterio FIFA: pts, DG, GF)
    const allThirds = GRP.map(gg => {
        const s = calcStandings(gg.id, mr);
        return s[2] ? { team: s[2].team, gid: gg.id, ...s[2] } : null;
    }).filter(Boolean).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    const top8thirds = allThirds.slice(0, 8).map(t => t.team);
    // Asignar 3ros a slots según bracket FIFA
    // Cada slot tiene grupos elegibles; asignar el mejor 3° disponible de esos grupos
    const thirdSlots = [
        { slot: '3ABCDF', groups: ['A', 'B', 'C', 'D', 'F'] },
        { slot: '3CDFGH', groups: ['C', 'D', 'F', 'G', 'H'] },
        { slot: '3CEFHI', groups: ['C', 'E', 'F', 'H', 'I'] },
        { slot: '3EHIJK', groups: ['E', 'H', 'I', 'J', 'K'] },
        { slot: '3BEFIJ', groups: ['B', 'E', 'F', 'I', 'J'] },
        { slot: '3AEHIJ', groups: ['A', 'E', 'H', 'I', 'J'] },
        { slot: '3EFGIJ', groups: ['E', 'F', 'G', 'I', 'J'] },
        { slot: '3DEIJL', groups: ['D', 'E', 'I', 'J', 'L'] },
    ];
    const assignedThirds = {};
    const usedThirds = [];
    thirdSlots.forEach(({ slot, groups }) => {
        // Mejor 3° de los grupos elegibles que esté en el top 8 y no esté usado
        const eligible = groups.flatMap(g => allThirds.filter(t => t.gid === g && top8thirds.includes(t.team) && !usedThirds.includes(t.team)));
        eligible.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
        const picked = eligible[0]?.team || '';
        assignedThirds[slot] = picked;
        if (picked)
            usedThirds.push(picked);
    });
    const resolveSlot = (slot) => {
        if (!slot)
            return '';
        if (slot.startsWith('1'))
            return get1(slot[1]);
        if (slot.startsWith('2'))
            return get2(slot[1]);
        if (slot.startsWith('3'))
            return assignedThirds[slot] || '';
        return '';
    };
    // Generar actualizaciones para los partidos R32
    const updates = {};
    MATCHES.filter(m => m.round === 4 && m.slot1).forEach(m => {
        const h = resolveSlot(m.slot1), a = resolveSlot(m.slot2);
        if (h || a)
            updates[m.id] = { ...((DB['p26_mr'] || {})[m.id] || {}), teamH: h, teamA: a };
    });
    return updates;
}
// ─── STORAGE (Firebase + localStorage fallback) ───────────────────────────────
const DB = {};
const persist = async (k, v) => {
    DB[k] = v;
    if (FDB) {
        try {
            await set(ref(FDB, fbKey(k)), v);
            return;
        }
        catch (e) {
            console.warn("Firebase set:", e);
        }
    }
    try {
        localStorage.setItem(k, JSON.stringify(v));
    }
    catch { }
};
const tryLoad = async (k) => {
    if (FDB) {
        try {
            const snap = await get(ref(FDB, fbKey(k)));
            if (snap.exists()) {
                DB[k] = snap.val();
                return;
            }
        }
        catch (e) {
            console.warn("Firebase get:", e);
        }
    }
    try {
        const r = localStorage.getItem(k);
        if (r)
            DB[k] = JSON.parse(r);
    }
    catch { }
};
const preload = (keys) => Promise.all(keys.map(tryLoad));
// Suscripción en tiempo real a cambios de Firebase
const subscribeRT = (keys, onChange) => {
    if (!FDB)
        return () => { };
    const unsubs = keys.map(k => onValue(ref(FDB, fbKey(k)), snap => {
        if (snap.exists()) {
            DB[k] = snap.val();
            onChange(k, snap.val());
        }
    }));
    return () => unsubs.forEach(u => u());
};
// ─── TIEMPO ──────────────────────────────────────────────────────────────────
const LOCK_DT = new Date('2026-06-11T20:30:00Z');
const getNow = () => { const s = DB['p26_state']?.simDate; return s ? new Date(s) : new Date(); };
const isTimeLocked = () => getNow() >= LOCK_DT;
const countdownLabel = () => { const diff = LOCK_DT - getNow(); if (diff <= 0)
    return null; const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000), m = Math.floor((diff % 3600000) / 60000); return `${d}d ${h}h ${m}m`; };
const AWARDS_UNLOCK_DT = new Date('2026-06-28T00:00:00Z');
const areAwardsOpen = () => getNow() >= AWARDS_UNLOCK_DT;
const matchStatus = (m, adminLocked, adminPlayed, mr = {}) => {
    // TBD knockout matches need teams defined first
    if (m.tbd && !m.h && !mr[m.id]?.teamH)
        return 'upcoming';
    if (adminPlayed)
        return 'played';
    const now = getNow(), lock = new Date(m.kickoff.getTime() - 30 * 60 * 1000), open = new Date(m.kickoff);
    open.setUTCHours(3, 0, 0, 0);
    if (open > m.kickoff)
        open.setUTCDate(open.getUTCDate() - 1);
    if (adminLocked || now >= lock)
        return 'locked';
    if (now >= open)
        return 'open';
    return 'upcoming';
};
// ─── SCORE ───────────────────────────────────────────────────────────────────
function calcScore(pred, mr, gr, fr, appState) {
    let p = 0, exactos = 0;
    for (const [mid, res] of Object.entries(mr || {})) {
        if (!res.played)
            continue;
        const u = pred?.matches?.[mid];
        if (u?.h == null || u?.a == null)
            continue;
        const rh = +res.h, ra = +res.a;
        if (u.h === rh && u.a === ra) {
            p += 5;
            exactos++;
            continue;
        }
        if (Math.sign(u.h - u.a) === Math.sign(rh - ra))
            p += 3;
    }
    if (appState?.groupsFinished) {
        for (const [gId, g] of Object.entries(gr?.groups || {})) {
            const u = pred?.initPicks?.qualifiers?.[gId];
            if (!u || !g?.first)
                continue;
            const hf = u.first === g.first, hs = u.second === g.second;
            if (hf && hs)
                p += 5;
            else if (hf)
                p += 3;
            else if (hs)
                p += 1;
        }
        for (const t of (pred?.initPicks?.thirds || [])) {
            if ((gr?.thirds || []).includes(t))
                p += 1;
        }
    }
    if (appState?.tournamentFinished) {
        const pod = fr?.podium;
        if (pod) {
            const u = pred?.initPicks?.podium || {};
            if (u.p1 === pod.p1)
                p += 10;
            if (u.p2 === pod.p2)
                p += 5;
            if (u.p3 === pod.p3)
                p += 3;
            if (u.p4 === pod.p4)
                p += 1;
        }
        const aw = fr?.awards;
        if (aw) {
            for (const { id, pts } of AWARDS) {
                const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
                const ua = norm(pred?.initPicks?.awards?.[id] || ''), ra = norm(aw[id] || '');
                if (ua && ra && ua === ra)
                    p += pts;
            }
        }
    }
    return { total: p, exactos, partidos: p };
}
function getScore(pred, mr, gr, fr, appState) { const r = calcScore(pred, mr, gr, fr, appState); return typeof r === 'object' ? r.total : r; }
function getExactos(pred, mr, gr, fr, appState) { const r = calcScore(pred, mr, gr, fr, appState); return typeof r === 'object' ? r.exactos : 0; }
// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
    bg: '#080d17',
    bgCard: '#0f1a2e',
    bgCardHi: '#131f35',
    bgInput: '#0a1525',
    border: '#1a2a45',
    borderHi: '#243656',
    green: '#00c96b',
    greenDim: 'rgba(0,201,107,0.12)',
    gold: '#fbbf24',
    goldDim: 'rgba(251,191,36,0.12)',
    red: '#f43f5e',
    redDim: 'rgba(244,63,94,0.12)',
    blue: '#3b82f6',
    blueDim: 'rgba(59,130,246,0.12)',
    textPri: '#e8f0ff',
    textSec: '#5a7299',
    textMid: '#8ba3c7',
    accent: '#00c96b',
};
const st = {
    card: { background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: '16px 20px', marginBottom: 10 },
    inp: { width: '100%', padding: '9px 12px', border: `1px solid ${T.border}`, borderRadius: 8, background: T.bgInput, color: T.textPri, fontSize: 13, fontFamily: 'DM Sans', marginBottom: 8, boxSizing: 'border-box', outline: 'none' },
    btn: (v = 'd') => ({ padding: '9px 20px', border: `1px solid ${v === 'p' ? 'transparent' : v === 'g' ? T.green : T.border}`, borderRadius: 8, cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 500, letterSpacing: '0.01em', background: v === 'p' ? T.green : v === 'g' ? T.greenDim : v === 'x' ? T.redDim : 'transparent', color: v === 'p' ? '#080d17' : v === 'g' ? T.green : v === 'x' ? T.red : T.textMid, transition: 'all 0.15s' }),
    tab: (a) => ({ padding: '10px 18px', border: 'none', borderBottom: a ? `2px solid ${T.green}` : '2px solid transparent', background: 'transparent', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans', fontWeight: a ? 600 : 400, color: a ? T.green : T.textSec, whiteSpace: 'nowrap', letterSpacing: '0.01em', transition: 'color 0.15s' }),
    chip: (v = '') => ({ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, padding: '3px 10px', borderRadius: 20, fontFamily: 'DM Sans', fontWeight: 500, background: v === 'green' ? T.greenDim : v === 'gold' ? T.goldDim : v === 'red' ? T.redDim : v === 'blue' ? T.blueDim : 'rgba(90,114,153,0.15)', color: v === 'green' ? T.green : v === 'gold' ? T.gold : v === 'red' ? T.red : v === 'blue' ? T.blue : T.textSec, border: `1px solid ${v === 'green' ? 'rgba(0,201,107,0.25)' : v === 'gold' ? 'rgba(251,191,36,0.25)' : v === 'red' ? 'rgba(244,63,94,0.25)' : v === 'blue' ? 'rgba(59,130,246,0.25)' : 'rgba(90,114,153,0.2)'}` }),
};
const EMPTY = () => ({ initPicks: { qualifiers: {}, thirds: [], podium: {}, awards: {} }, initLocked: false, matches: {} });
// ─── SISTEMA DE NOTIFICACIONES ────────────────────────────────────────────────
function useNotifications(user, mr, pred, appState) {
    const [alerts, setAlerts] = useState([]);
    const [browserPerm, setBrowserPerm] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'denied');
    const prevMr = useRef({});
    const addAlert = (id, type, msg, icon) => {
        setAlerts(a => a.find(x => x.id === id) ? a : [...a, { id, type, msg, icon, ts: Date.now() }]);
    };
    const dismiss = (id) => setAlerts(a => a.filter(x => x.id !== id));
    // Pedir permiso de notificaciones del navegador
    const requestPerm = async () => {
        if (typeof Notification === 'undefined')
            return;
        const p = await Notification.requestPermission();
        setBrowserPerm(p);
    };
    // Enviar notificación del navegador
    const sendBrowserNotif = (title, body) => {
        if (browserPerm === 'granted') {
            try {
                new Notification(title, { body, icon: '⚽' });
            }
            catch { }
        }
    };
    // Verificar partidos sin pronosticar
    useEffect(() => {
        if (!user || !mr)
            return;
        const now = getNow();
        const sinPred = MATCHES.filter(m => {
            if (m.round >= 4)
                return false; // solo grupos por ahora
            const status = matchStatus(m, mr[m.id]?.locked, mr[m.id]?.played, mr);
            if (status !== 'open')
                return false;
            const u = pred?.matches?.[m.id];
            return u?.h == null || u?.a == null;
        });
        const urgentes = sinPred.filter(m => {
            const mins = (m.kickoff - now) / 60000;
            return mins > 0 && mins <= 120; // cierran en menos de 2 hs
        });
        if (urgentes.length > 0) {
            addAlert('urgent_picks', 'red', `⚠ ${urgentes.length} partido${urgentes.length > 1 ? 's' : ''} sin pronosticar — cierra en menos de 2 hs`, '⏰');
            sendBrowserNotif('Prode Mundial 2026', `Tenés ${urgentes.length} partido${urgentes.length > 1 ? 's' : ''} sin pronosticar que cierran pronto`);
        }
        else if (sinPred.length > 0) {
            addAlert('pending_picks', 'gold', `Tenés ${sinPred.length} partido${sinPred.length > 1 ? 's' : ''} abiertos sin pronosticar`, '⚽');
        }
        else {
            dismiss('urgent_picks');
            dismiss('pending_picks');
        }
    }, [mr, pred, user]);
    // Verificar predicciones iniciales sin cargar
    useEffect(() => {
        if (!user || !pred)
            return;
        const locked = isTimeLocked();
        if (!locked && !pred.initLocked) {
            const hasPodium = pred.initPicks?.podium?.p1;
            if (!hasPodium)
                addAlert('init_picks', 'gold', 'Cargá tus predicciones de Podio, Clasificados y Premios antes del 11 Jun', '📋');
            else
                dismiss('init_picks');
        }
        else {
            dismiss('init_picks');
        }
    }, [pred, user]);
    // Detectar nuevos resultados exactos
    useEffect(() => {
        if (!user || !pred || !mr)
            return;
        const nuevosExactos = MATCHES.filter(m => {
            const res = mr[m.id];
            const prev = prevMr.current[m.id];
            const u = pred?.matches?.[m.id];
            if (!res?.played || prev?.played)
                return false; // ya estaba jugado antes
            return u?.h != null && u?.h === +res.h && u?.a === +res.a;
        });
        if (nuevosExactos.length > 0) {
            const pts = nuevosExactos.length * 5;
            addAlert(`exactos_${Date.now()}`, 'green', `🎯 ¡Acertaste ${nuevosExactos.length} resultado${nuevosExactos.length > 1 ? 's' : ''} exacto${nuevosExactos.length > 1 ? 's' : ''}! +${pts} pts`, '🏆');
            sendBrowserNotif('¡Resultado exacto! 🎯', `Acertaste ${nuevosExactos.length} resultado${nuevosExactos.length > 1 ? 's' : ''} y sumaste +${pts} pts`);
        }
        prevMr.current = { ...mr };
    }, [mr]);
    return { alerts, dismiss, browserPerm, requestPerm };
}
function NotificationBar({ alerts, dismiss, browserPerm, requestPerm }) {
    if (!alerts.length && browserPerm !== 'default')
        return null;
    const colors = {
        red: { bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.3)', text: '#f87171' },
        gold: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' },
        green: { bg: 'rgba(0,201,107,0.1)', border: 'rgba(0,201,107,0.3)', text: T.green },
    };
    return (_jsxs("div", { style: { marginBottom: 12 }, children: [browserPerm === 'default' && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 10, background: 'rgba(116,172,223,0.08)', border: '1px solid rgba(116,172,223,0.2)', marginBottom: 6 }, children: [_jsx("span", { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)' }, children: "\uD83D\uDD14 Activar notificaciones del navegador" }), _jsx("button", { onClick: requestPerm, style: { ...st.btn('g'), padding: '4px 10px', fontSize: 11, border: '1px solid rgba(116,172,223,0.3)' }, children: "Activar" })] })), alerts.map(a => {
                const c = colors[a.type] || colors.gold;
                return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, marginBottom: 6, gap: 8 }, children: [_jsx("span", { style: { fontSize: 12, color: c.text, flex: 1 }, children: a.msg }), _jsx("button", { onClick: () => dismiss(a.id), style: { background: 'none', border: 'none', cursor: 'pointer', color: c.text, fontSize: 14, padding: 0, opacity: 0.7, flexShrink: 0 }, children: "\u2715" })] }, a.id));
            })] }));
}
// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
    const [ready, setReady] = useState(false);
    const [view, setView] = useState('auth');
    const [user, setUser] = useState(null);
    const [group, setGroup] = useState(null);
    const [tab, setTab] = useState('picks');
    const [pred, setPred] = useState(EMPTY());
    const [allPreds, setAllPreds] = useState({});
    const [tick, setTick] = useState(0);
    const refresh = () => setTick(t => t + 1);
    const mr = DB['p26_mr'] || {};
    const gr = DB['p26_gr'] || { groups: {}, thirds: [] };
    const fr = DB['p26_fr'] || { podium: {}, awards: {} };
    const appState = DB['p26_state'] || { groupsFinished: false, tournamentFinished: false };
    useEffect(() => { preload(['p26_users', 'p26_groups', 'p26_mr', 'p26_gr', 'p26_fr', 'p26_state']).finally(() => setReady(true)); }, []);
    const doLogin = (u) => { setUser(u); setPred(DB[`p26_p_${u}`] || EMPTY()); setView('home'); };
    const doEnterGroup = (grp) => { setGroup(grp); setAllPreds({}); setTab('picks'); setView('group'); const preds = {}; Promise.all((grp.members || []).map(m => tryLoad(`p26_p_${m}`).then(() => { if (DB[`p26_p_${m}`])
        preds[m] = DB[`p26_p_${m}`]; }))).then(() => setAllPreds({ ...preds })); };
    const doLeaveGroup = () => { setGroup(null); setView('home'); };
    const savePred = (np) => { setPred(np); persist(`p26_p_${user}`, np); if (group)
        setAllPreds(prev => ({ ...prev, [user]: np })); };
    const reloadAllPreds = () => { const preds = {}; Promise.all((group?.members || []).map(m => tryLoad(`p26_p_${m}`).then(() => { if (DB[`p26_p_${m}`])
        preds[m] = DB[`p26_p_${m}`]; }))).then(() => setAllPreds({ ...preds })); };
    const base = { fontFamily: 'DM Sans, sans-serif', color: T.textPri, background: T.bg, minHeight: '100vh' };
    if (!ready)
        return (_jsxs("div", { style: { ...base, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }, children: [_jsx("style", { children: FONTS }), _jsx("div", { style: { fontSize: 48 }, children: "\u26BD" }), _jsx("p", { style: { color: T.textSec, fontSize: 14 }, children: "Cargando..." })] }));
    return (_jsxs("div", { style: { ...base, maxWidth: 720, margin: '0 auto', padding: '0 16px 60px' }, children: [_jsx("style", { children: FONTS }), view === 'auth' && _jsx(AuthView, { onLogin: doLogin }), view === 'home' && _jsx(HomeView, { user: user, mr: mr, gr: gr, fr: fr, appState: appState, onEnterGroup: doEnterGroup, onLogout: () => { sessionStorage.removeItem('prode_user'); setUser(null); setPred(EMPTY()); setView('auth'); } }), view === 'group' && _jsx(GroupView, { user: user, group: group, pred: pred, savePred: savePred, mr: mr, gr: gr, fr: fr, appState: appState, allPreds: allPreds, tab: tab, setTab: setTab, onBack: doLeaveGroup, onSaveResults: (newMr, newGr, newFr, newState) => { if (newMr)
                    persist('p26_mr', newMr); if (newGr)
                    persist('p26_gr', newGr); if (newFr)
                    persist('p26_fr', newFr); if (newState)
                    persist('p26_state', newState); refresh(); }, reloadAllPreds: reloadAllPreds, setGroup: setGroup })] }));
}
// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthView({ onLogin }) {
    const [mode, setMode] = useState('login');
    const [u, setU] = useState('');
    const [p, setP] = useState('');
    const [msg, setMsg] = useState('');
    const [invite, setInvite] = useState('');
    const [inviteGroup, setInviteGroup] = useState(null);
    // Validar código de invitación en tiempo real
    useEffect(() => {
        if (invite.length === 7) {
            const invites = DB['p26_invites'] || {};
            const inv = invites[invite];
            setInviteGroup(inv ? inv.group : null);
            if (!inv)
                setMsg('Código de invitación inválido');
            else
                setMsg('');
        }
        else {
            setInviteGroup(null);
            if (invite.length > 0 && msg === 'Código de invitación inválido')
                setMsg('');
        }
    }, [invite]);
    const submit = () => {
        const uv = u.trim().toLowerCase(), pv = p.trim();
        if (!uv || !pv) {
            setMsg('Completá los dos campos');
            return;
        }
        const users = DB['p26_users'] || {};
        if (mode === 'login') {
            if (!users[uv]) {
                setMsg('Usuario no encontrado');
                return;
            }
            if (users[uv].pass !== pv) {
                setMsg('Contraseña incorrecta');
                return;
            }
        }
        else {
            if (users[uv]) {
                setMsg('El usuario ya existe');
                return;
            }
            // El código de invitación es obligatorio para registrarse
            if (!inviteGroup) {
                setMsg('Necesitás un código de invitación válido');
                return;
            }
            users[uv] = { pass: pv, created: Date.now() };
            persist('p26_users', users);
            // Unirse al grupo si hay código de invitación
            if (inviteGroup) {
                const groups = DB['p26_groups'] || {};
                if (groups[inviteGroup] && !groups[inviteGroup].members.includes(uv)) {
                    groups[inviteGroup].members.push(uv);
                    persist('p26_groups', groups);
                }
            }
        }
        onLogin(uv);
    };
    // Partículas de confeti Mundial (colores de los 3 países anfitriones)
    const confetti = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6,
        color: i % 6 === 0 ? '#b22234' : i % 6 === 1 ? '#fff' : i % 6 === 2 ? '#006847' : i % 6 === 3 ? '#ce1126' : i % 6 === 4 ? '#ff0000' : '#fbbf24',
        rot: Math.random() * 360,
        delay: Math.random() * 4,
        dur: 3 + Math.random() * 4,
    }));
    // Estrellas del cielo
    const stars = Array.from({ length: 40 }, (_, i) => ({
        id: i, x: Math.random() * 100, y: Math.random() * 100,
        size: 1 + Math.random() * 2, opacity: 0.3 + Math.random() * 0.7,
    }));
    return (_jsxs("div", { style: { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', margin: '0 -16px', padding: '0 16px 40px' }, children: [_jsx("div", { style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#001529 0%,#002a4a 35%,#003d6b 55%,#1a5276 70%,#154360 85%,#0d2137 100%)', zIndex: 0 } }), _jsxs("div", { style: { position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }, children: [_jsx("div", { style: { position: 'absolute', top: '-5%', left: '15%', width: '40%', height: '50%', background: 'radial-gradient(ellipse,rgba(116,172,223,0.18) 0%,transparent 70%)', filter: 'blur(20px)' } }), _jsx("div", { style: { position: 'absolute', top: '-5%', right: '15%', width: '40%', height: '50%', background: 'radial-gradient(ellipse,rgba(116,172,223,0.18) 0%,transparent 70%)', filter: 'blur(20px)' } }), _jsx("div", { style: { position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '40%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.04) 0%,transparent 70%)', filter: 'blur(30px)' } })] }), _jsxs("svg", { style: { position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', zIndex: 2, opacity: 0.35 }, viewBox: "0 0 800 200", preserveAspectRatio: "none", children: [_jsx("path", { d: "M0,200 L0,120 Q50,80 100,90 L150,60 L200,70 L250,40 L300,50 L350,20 L400,30 L450,20 L500,50 L550,40 L600,70 L650,60 L700,90 Q750,80 800,120 L800,200 Z", fill: "#0a1929" }), _jsx("path", { d: "M0,200 L0,140 Q80,110 160,120 L200,100 L250,85 L350,60 L400,50 L450,60 L550,85 L600,100 L640,120 Q720,110 800,140 L800,200 Z", fill: "#0d2040" }), _jsx("rect", { x: "0", y: "170", width: "800", height: "30", fill: "#0f5132", opacity: "0.8" }), _jsx("rect", { x: "0", y: "175", width: "800", height: "4", fill: "#1a6b42", opacity: "0.6" }), _jsx("rect", { x: "320", y: "155", width: "20", height: "20", fill: "none", stroke: "#ffffff22", strokeWidth: "1.5" }), _jsx("rect", { x: "460", y: "155", width: "20", height: "20", fill: "none", stroke: "#ffffff22", strokeWidth: "1.5" }), _jsx("circle", { cx: "80", cy: "75", r: "8", fill: "#fff9c4", opacity: "0.9" }), _jsx("circle", { cx: "80", cy: "75", r: "20", fill: "#fff9c4", opacity: "0.2" }), _jsx("circle", { cx: "720", cy: "75", r: "8", fill: "#fff9c4", opacity: "0.9" }), _jsx("circle", { cx: "720", cy: "75", r: "20", fill: "#fff9c4", opacity: "0.2" }), _jsx("circle", { cx: "200", cy: "45", r: "6", fill: "#fff9c4", opacity: "0.8" }), _jsx("circle", { cx: "600", cy: "45", r: "6", fill: "#fff9c4", opacity: "0.8" })] }), _jsx("svg", { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }, viewBox: "0 0 100 100", preserveAspectRatio: "none", children: stars.map(s => _jsx("circle", { cx: s.x, cy: s.y, r: s.size * 0.3, fill: "#fff", opacity: s.opacity * 0.6 }, s.id)) }), _jsx("svg", { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }, viewBox: "0 0 100 100", preserveAspectRatio: "none", children: confetti.map(c => (_jsx("rect", { x: c.x, y: c.y, width: c.size * 0.5, height: c.size * 0.2, fill: c.color, opacity: 0.7, transform: `rotate(${c.rot},${c.x},${c.y})` }, c.id))) }), _jsx("div", { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(to right,#b22234,#fff,#006847,#fff,#ff0000,#fff,#b22234)', zIndex: 4, opacity: 0.7 } }), _jsxs("div", { style: { position: 'relative', zIndex: 10, width: '100%', maxWidth: 400, padding: '0 0 20px' }, children: [_jsxs("div", { style: { textAlign: 'center', marginBottom: 28 }, children: [_jsx("div", { style: { fontSize: 52, marginBottom: 8, filter: 'drop-shadow(0 0 18px rgba(251,191,36,0.6))' }, children: "\uD83C\uDFC6" }), _jsxs("div", { style: { position: 'relative', marginBottom: 4 }, children: [_jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 58, lineHeight: 0.92, letterSpacing: 6, background: 'linear-gradient(180deg,#ffffff 0%,#c8dff7 60%,#74acdf 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 12px rgba(116,172,223,0.5))' }, children: "PRODE" }), _jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 46, lineHeight: 1, letterSpacing: 8, background: 'linear-gradient(180deg,#ffffff 0%,#e0eefa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }, children: "MUNDIAL" }), _jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 86, lineHeight: 0.9, letterSpacing: 4, background: `linear-gradient(180deg,${T.green} 0%,#00a855 60%,#007a3d 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: `drop-shadow(0 0 30px ${T.green}88)` }, children: "2026" })] }), _jsx("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 14, marginBottom: 6 }, children: [['EE.UU.', 'us'], ['México', 'mx'], ['Canadá', 'ca']].map(([name, code]) => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }, children: [_jsx(Flag, { name: name, h: 24 }), _jsx("span", { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em', fontWeight: 500 }, children: name })] }, code))) }), _jsx("div", { style: { marginTop: 10, display: 'inline-block', padding: '4px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)' }, children: _jsx("span", { style: { fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }, children: "11 JUN \u2014 19 JUL 2026" }) })] }), _jsxs("div", { style: { background: 'rgba(8,13,23,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(116,172,223,0.2)', borderRadius: 16, padding: '24px 24px 20px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }, children: [mode === 'login' && (_jsxs(_Fragment, { children: [_jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: 3, color: T.textPri, marginBottom: 20, textAlign: 'center' }, children: "INICIAR SESI\u00D3N" }), _jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6, textTransform: 'uppercase' }, children: "Usuario" }), _jsx("input", { style: { ...st.inp, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(116,172,223,0.25)', color: '#fff' }, value: u, onChange: e => setU(e.target.value), placeholder: "tu_usuario", onKeyDown: e => e.key === 'Enter' && submit(), autoFocus: true }), _jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6, marginTop: 4, textTransform: 'uppercase' }, children: "Contrase\u00F1a" }), _jsx("input", { style: { ...st.inp, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(116,172,223,0.25)', color: '#fff' }, type: "password", value: p, onChange: e => setP(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", onKeyDown: e => e.key === 'Enter' && submit() }), msg && _jsx("p", { style: { fontSize: 12, color: '#f87171', marginTop: 4, marginBottom: 8 }, children: msg }), _jsx("button", { style: { ...st.btn('p'), width: '100%', padding: '11px', marginTop: 8, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', boxShadow: `0 0 20px ${T.green}44` }, onClick: submit, children: "Ingresar" }), _jsx("div", { style: { textAlign: 'center', marginTop: 16 }, children: _jsx("button", { onClick: () => { setMode('register'); setMsg(''); setU(''); setP(''); }, style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'rgba(116,172,223,0.7)', fontFamily: 'DM Sans', textDecoration: 'underline', textUnderlineOffset: 3 }, children: "Tengo un c\u00F3digo de invitaci\u00F3n" }) })] })), mode === 'register' && (_jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }, children: [_jsx("button", { onClick: () => { setMode('login'); setMsg(''); setInvite(''); setInviteGroup(null); }, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(116,172,223,0.6)', fontSize: 18, padding: 0, lineHeight: 1 }, children: "\u2190" }), _jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: 3, color: T.textPri }, children: "CREAR CUENTA" })] }), _jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6, textTransform: 'uppercase' }, children: "C\u00F3digo de invitaci\u00F3n" }), _jsx("input", { style: { ...st.inp, background: 'rgba(255,255,255,0.06)', border: `1px solid ${inviteGroup ? T.green : 'rgba(116,172,223,0.25)'}`, color: '#fff', textTransform: 'uppercase', letterSpacing: 6, fontFamily: 'Bebas Neue', fontSize: 18, textAlign: 'center' }, value: invite, onChange: e => setInvite(e.target.value.toUpperCase().slice(0, 7)), placeholder: "XXXXXXX", autoFocus: true }), inviteGroup && _jsxs("div", { style: { fontSize: 12, color: T.green, marginBottom: 8, padding: '6px 12px', background: T.greenDim, borderRadius: 8, border: `1px solid ${T.green}33`, display: 'flex', alignItems: 'center', gap: 6 }, children: ["\u2713 Grupo: ", _jsx("strong", { style: { textTransform: 'capitalize' }, children: inviteGroup })] }), invite.length === 7 && !inviteGroup && _jsx("p", { style: { fontSize: 12, color: '#f87171', marginBottom: 8 }, children: "C\u00F3digo inv\u00E1lido" }), inviteGroup && (_jsxs(_Fragment, { children: [_jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6, marginTop: 8, textTransform: 'uppercase' }, children: "Eleg\u00ED un usuario" }), _jsx("input", { style: { ...st.inp, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(116,172,223,0.25)', color: '#fff' }, value: u, onChange: e => setU(e.target.value), placeholder: "tu_usuario", onKeyDown: e => e.key === 'Enter' && submit() }), _jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6, marginTop: 4, textTransform: 'uppercase' }, children: "Contrase\u00F1a" }), _jsx("input", { style: { ...st.inp, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(116,172,223,0.25)', color: '#fff' }, type: "password", value: p, onChange: e => setP(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", onKeyDown: e => e.key === 'Enter' && submit() })] })), msg && msg !== 'Código de invitación inválido' && _jsx("p", { style: { fontSize: 12, color: '#f87171', marginTop: 4, marginBottom: 8 }, children: msg }), inviteGroup && (_jsx("button", { style: { ...st.btn('p'), width: '100%', padding: '11px', marginTop: 8, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', boxShadow: `0 0 20px ${T.green}44` }, onClick: submit, children: "Registrarse y entrar al prode" }))] }))] }), _jsx("p", { style: { textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 14 }, children: "Versi\u00F3n de prueba \u00B7 datos compartidos entre sesiones" })] })] }));
}
// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeView({ user, mr, gr, fr, appState, onEnterGroup, onLogout }) {
    const [htab, setHtab] = useState('groups');
    const [showForm, setShowForm] = useState(null);
    const [gName, setGName] = useState('');
    const [gPass, setGPass] = useState('');
    const [gMsg, setGMsg] = useState('');
    const [globalRows, setGlobalRows] = useState([]);
    const [loadingG, setLoadingG] = useState(false);
    const allGroups = DB['p26_groups'] || {};
    const myGroups = Object.entries(allGroups).filter(([, g]) => g.members.includes(user)).map(([name, g]) => ({ name, ...g }));
    const handleGroup = () => { const name = gName.trim(), pass = gPass.trim(); if (!name || !pass) {
        setGMsg('Completá los dos campos');
        return;
    } const groups = DB['p26_groups'] || {}; const key = name.toLowerCase(); if (showForm === 'create') {
        if (groups[key]) {
            setGMsg('Ya existe un grupo con ese nombre');
            return;
        }
        groups[key] = { password: pass, admin: user, members: [user], created: Date.now() };
    }
    else {
        if (!groups[key]) {
            setGMsg('Grupo no encontrado');
            return;
        }
        if (groups[key].password !== pass) {
            setGMsg('Contraseña incorrecta');
            return;
        }
        if (!groups[key].members.includes(user))
            groups[key].members.push(user);
    } persist('p26_groups', groups); setShowForm(null); setGName(''); setGPass(''); setGMsg(''); onEnterGroup({ name: key, ...groups[key] }); };
    const loadGlobal = async () => { setLoadingG(true); const users = DB['p26_users'] || {}; await Promise.all(Object.keys(users).map(u => tryLoad(`p26_p_${u}`))); const rows = Object.keys(users).map(u => ({ user: u, score: getScore(DB[`p26_p_${u}`], mr, gr, fr, appState), locked: DB[`p26_p_${u}`]?.initLocked })); rows.sort((a, b) => b.score - a.score); setGlobalRows(rows); setLoadingG(false); };
    useEffect(() => { if (htab === 'global')
        loadGlobal(); }, [htab]);
    return (_jsxs("div", { style: { paddingTop: 16 }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: `1px solid ${T.border}`, marginBottom: 16 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [_jsx("span", { style: { fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: 2, color: T.green }, children: "PRODE MUNDIAL" }), _jsx("span", { style: { fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: 2, color: T.textPri }, children: "2026" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("div", { style: { width: 28, height: 28, borderRadius: 8, background: T.greenDim, border: `1px solid ${T.green}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: T.green, fontWeight: 600 }, children: user?.[0]?.toUpperCase() }), _jsx("span", { style: { fontSize: 12, color: T.textMid }, children: user }), _jsx("button", { onClick: onLogout, style: { marginLeft: 4, padding: '5px 12px', border: `1px solid ${T.border}`, borderRadius: 8, background: 'transparent', cursor: 'pointer', fontSize: 11, color: T.textSec, fontFamily: 'DM Sans', letterSpacing: '0.02em' }, children: "Salir" })] })] }), _jsx("div", { style: { display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 20 }, children: [{ k: 'groups', l: 'Mis grupos' }, { k: 'global', l: 'Tabla general' }].map(({ k, l }) => _jsx("button", { style: st.tab(htab === k), onClick: () => setHtab(k), children: l }, k)) }), htab === 'groups' && (_jsxs("div", { children: [myGroups.length === 0 && !showForm && (_jsxs("div", { style: { textAlign: 'center', padding: '40px 20px', color: T.textSec }, children: [_jsx("div", { style: { fontSize: 40, marginBottom: 12, opacity: 0.4 }, children: "\uD83D\uDC65" }), _jsx("p", { style: { fontSize: 14 }, children: "No est\u00E1s en ning\u00FAn grupo todav\u00EDa" })] })), myGroups.map(g2 => (_jsxs("div", { onClick: () => onEnterGroup(g2), style: { ...st.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.15s', borderColor: T.border }, onMouseEnter: e => e.currentTarget.style.borderColor = T.borderHi, onMouseLeave: e => e.currentTarget.style.borderColor = T.border, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [_jsx("div", { style: { width: 40, height: 40, borderRadius: 10, background: T.greenDim, border: `1px solid ${T.green}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }, children: "\uD83C\uDFC6" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600, fontSize: 15, color: T.textPri, textTransform: 'capitalize' }, children: g2.name }), _jsxs("div", { style: { fontSize: 12, color: T.textSec, marginTop: 2 }, children: [g2.members.length, " participante", g2.members.length !== 1 ? 's' : '', g2.admin === user && ' · Admin'] })] })] }), _jsx("span", { style: { color: T.textSec, fontSize: 18, opacity: 0.5 }, children: "\u203A" })] }, g2.name))), !showForm && (_jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 12 }, children: [_jsx("button", { style: { ...st.btn('p'), flex: 1, padding: '10px' }, onClick: () => { setShowForm('create'); setGMsg(''); setGName(''); setGPass(''); }, children: "+ Crear grupo" }), _jsx("button", { style: { ...st.btn('d'), flex: 1, padding: '10px', border: `1px solid ${T.border}` }, onClick: () => { setShowForm('join'); setGMsg(''); setGName(''); setGPass(''); }, children: "Unirse a grupo" })] })), showForm && (_jsxs("div", { style: { ...st.card, marginTop: 12, borderColor: T.green + '44' }, children: [_jsx("h3", { style: { fontSize: 14, fontWeight: 600, marginBottom: 16, color: T.textPri }, children: showForm === 'create' ? 'Crear nuevo grupo' : 'Unirse a un grupo' }), _jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: T.textSec, display: 'block', marginBottom: 6, textTransform: 'uppercase' }, children: "Nombre del grupo" }), _jsx("input", { style: st.inp, value: gName, onChange: e => { setGName(e.target.value); setGMsg(''); }, placeholder: "Ej: Los Pibes", autoFocus: true, onKeyDown: e => e.key === 'Enter' && handleGroup() }), _jsx("label", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: T.textSec, display: 'block', marginBottom: 6, marginTop: 4, textTransform: 'uppercase' }, children: "Contrase\u00F1a del grupo" }), _jsx("input", { style: st.inp, type: "password", value: gPass, onChange: e => { setGPass(e.target.value); setGMsg(''); }, placeholder: "Contrase\u00F1a de acceso", onKeyDown: e => e.key === 'Enter' && handleGroup() }), gMsg && _jsx("p", { style: { fontSize: 12, color: T.red, marginTop: 4, marginBottom: 8 }, children: gMsg }), _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 4 }, children: [_jsx("button", { style: st.btn('p'), onClick: handleGroup, children: showForm === 'create' ? 'Crear y entrar' : 'Unirse y entrar' }), _jsx("button", { style: { ...st.btn(), border: `1px solid ${T.border}` }, onClick: () => { setShowForm(null); setGMsg(''); }, children: "Cancelar" })] })] }))] })), htab === 'global' && (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsx("p", { style: { fontSize: 13, color: T.textSec }, children: "Todos los participantes del prode" }), _jsx("button", { style: { ...st.btn(), fontSize: 12, padding: '6px 12px', border: `1px solid ${T.border}` }, onClick: loadGlobal, disabled: loadingG, children: loadingG ? '...' : '↻ Actualizar' })] }), _jsx(Leaderboard, { data: globalRows, currentUser: user })] }))] }));
}
// ─── GROUP VIEW ───────────────────────────────────────────────────────────────
function GroupView({ user, group, pred, savePred, mr, gr, fr, appState, allPreds, tab, setTab, onBack, onSaveResults, reloadAllPreds, setGroup }) {
    if (!group)
        return null;
    const isAdmin = group.admin === user;
    const tabs = [{ k: 'picks', l: 'Predicciones' }, { k: 'matches', l: 'Partidos' }, { k: 'table', l: 'Tabla' }, ...(isAdmin ? [{ k: 'admin', l: 'Admin' }] : [])];
    return (_jsxs("div", { style: { paddingTop: 16 }, children: [appState?.simDate && _jsxs("div", { style: { background: 'rgba(232,93,38,0.15)', border: `1px solid ${T.gold}44`, borderRadius: 8, padding: '6px 12px', marginBottom: 10, fontSize: 11, color: T.gold, display: 'flex', alignItems: 'center', gap: 6 }, children: ["\u26A0 Modo simulaci\u00F3n activo \u00B7 ", new Date(appState.simDate).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', dateStyle: 'short', timeStyle: 'short' })] }), _jsx(NotificationBar, { alerts: alerts, dismiss: dismiss, browserPerm: browserPerm, requestPerm: requestPerm }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }, children: [_jsx("button", { onClick: onBack, style: { ...st.btn(), padding: '8px 12px', fontSize: 12, border: `1px solid ${T.border}` }, children: "\u2190 Salir" }), _jsxs("div", { children: [_jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: 2, color: T.textPri, textTransform: 'uppercase' }, children: group.name }), _jsxs("div", { style: { fontSize: 11, color: T.textSec }, children: [group.members.length, " participantes", isAdmin && ' · Admin'] })] })] }), _jsx("div", { style: { display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 20, overflowX: 'auto' }, children: tabs.map(t => _jsx("button", { style: st.tab(tab === t.k), onClick: () => setTab(t.k), children: t.l }, t.k)) }), tab === 'picks' && _jsx(PicksTab, { pred: pred, savePred: savePred, appState: appState }), tab === 'matches' && _jsx(MatchesTab, { pred: pred, savePred: savePred, mr: mr, allPreds: allPreds, user: user }), tab === 'table' && _jsx(TableTab, { allPreds: allPreds, mr: mr, gr: gr, fr: fr, appState: appState, currentUser: user, reloadAllPreds: reloadAllPreds }), tab === 'admin' && _jsx(AdminTab, { mr: mr, gr: gr, fr: fr, appState: appState, onSave: onSaveResults, group: group, setGroup: setGroup, user: user })] }));
}
// ─── PICKS TAB ────────────────────────────────────────────────────────────────
function PicksTab({ pred, savePred, appState }) {
    const timeLocked = isTimeLocked();
    const awardsOpen = areAwardsOpen() && !appState.tournamentFinished;
    const awardsLocked = appState.tournamentFinished;
    const [local, setLocal] = useState(() => JSON.parse(JSON.stringify(pred.initPicks || { qualifiers: {}, thirds: [], podium: {}, awards: {} })));
    const [localAwards, setLocalAwards] = useState(() => JSON.parse(JSON.stringify(pred.initPicks?.awards || {})));
    const [sec, setSec] = useState('podium');
    const [saved, setSaved] = useState(false);
    const [savingAw, setSavingAw] = useState(false);
    const countdown = countdownLabel();
    useEffect(() => { setLocal(JSON.parse(JSON.stringify(pred.initPicks || { qualifiers: {}, thirds: [], podium: {}, awards: {} }))); setLocalAwards(JSON.parse(JSON.stringify(pred.initPicks?.awards || {}))); }, [pred]);
    const saveLocal = (newLocal) => { setLocal(newLocal); savePred({ ...pred, initPicks: { ...newLocal, awards: pred.initPicks?.awards || {} } }); setSaved(true); setTimeout(() => setSaved(false), 1800); };
    const clickQ = (gId, t) => { if (timeLocked)
        return; const q = { ...(local.qualifiers?.[gId] || {}) }; if (q.first === t) {
        q.first = q.second;
        q.second = null;
    }
    else if (q.second === t) {
        q.second = null;
    }
    else if (!q.first)
        q.first = t;
    else if (!q.second)
        q.second = t;
    else
        q.second = t; saveLocal({ ...local, qualifiers: { ...local.qualifiers, [gId]: q } }); };
    const togT = (t) => { if (timeLocked)
        return; const cur = local.thirds || []; saveLocal({ ...local, thirds: cur.includes(t) ? cur.filter(x => x !== t) : cur.length < 8 ? [...cur, t] : cur }); };
    const setPodium = (k, v) => { if (timeLocked)
        return; saveLocal({ ...local, podium: { ...local.podium, [k]: v } }); };
    const saveAwards = () => { setSavingAw(true); savePred({ ...pred, initPicks: { ...pred.initPicks, awards: localAwards } }); setSavingAw(false); setSaved(true); setTimeout(() => setSaved(false), 1800); };
    const t3 = GRP.map(gg => ({ id: gg.id, teams: gg.t.filter(t => t !== local.qualifiers?.[gg.id]?.first && t !== local.qualifiers?.[gg.id]?.second) }));
    const secs = [{ k: 'podium', l: 'Podio final' }, { k: 'qualifiers', l: 'Clasificados' }, { k: 'thirds', l: 'Mejores 3°' }, { k: 'awards', l: 'Premios FIFA' }];
    return (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }, children: [!timeLocked && countdown && _jsxs("span", { style: st.chip('gold'), children: ["\u23F3 Cierre en ", countdown] }), timeLocked && _jsx("span", { style: st.chip('red'), children: "\uD83D\uDD12 Predicciones cerradas" }), saved && _jsx("span", { style: st.chip('green'), children: "\u2713 Guardado" }), appState.groupsFinished && _jsx("span", { style: st.chip('green'), children: "\u2713 Grupos finalizados" }), areAwardsOpen() && !appState.tournamentFinished && _jsx("span", { style: st.chip('gold'), children: "\uD83C\uDFC5 Premios FIFA habilitados" }), appState.tournamentFinished && _jsx("span", { style: st.chip('green'), children: "\u2713 Torneo finalizado" })] }), _jsx("div", { style: { display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }, children: secs.map(s => _jsx("button", { onClick: () => setSec(s.k), style: { padding: '7px 16px', border: `1px solid ${sec === s.k ? T.green : T.border}`, borderRadius: 20, fontSize: 12, cursor: 'pointer', background: sec === s.k ? T.greenDim : 'transparent', color: sec === s.k ? T.green : T.textSec, fontFamily: 'DM Sans', fontWeight: sec === s.k ? 600 : 400, transition: 'all 0.15s' }, children: s.l }, s.k)) }), sec === 'podium' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "\u00BFQui\u00E9nes quedar\u00E1n en los 4 primeros puestos? Se guarda autom\u00E1ticamente." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 10 }, children: [{ k: 'p1', icon: '🥇', l: 'Campeón', pts: 10 }, { k: 'p2', icon: '🥈', l: 'Subcampeón', pts: 5 }, { k: 'p3', icon: '🥉', l: '3° Puesto', pts: 3 }, { k: 'p4', icon: '4°', l: '4° Puesto', pts: 1 }].map(({ k, icon, l, pts }) => (_jsxs("div", { style: { ...st.card, borderTop: `2px solid ${pts === 10 ? T.gold : pts === 5 ? T.textSec : pts === 3 ? '#cd7f32' : 'transparent'}` }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }, children: [_jsx("div", { children: _jsxs("div", { style: { fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: 1, color: T.textPri }, children: [icon, " ", l] }) }), _jsxs("span", { style: { ...st.chip('gold'), fontSize: 10 }, children: [pts, " pts"] })] }), _jsxs("select", { disabled: timeLocked, value: local.podium?.[k] || '', onChange: e => setPodium(k, e.target.value), style: { ...st.inp, marginBottom: 0, cursor: timeLocked ? 'default' : 'pointer', opacity: timeLocked ? 0.5 : 1 }, children: [_jsx("option", { value: '', children: "Elegir selecci\u00F3n..." }), ALL_TEAMS.map(t => _jsx("option", { value: t, children: t }, t))] }), local.podium?.[k] && _jsxs("div", { style: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }, children: [_jsx(Flag, { name: local.podium[k], h: 16 }), _jsx("span", { style: { fontSize: 13, color: T.green, fontWeight: 500 }, children: local.podium[k] })] })] }, k))) })] })), sec === 'qualifiers' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Clic = 1\u00B0, clic en otro = 2\u00B0. Clic en el elegido para quitar." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(185px,1fr))', gap: 8 }, children: GRP.map(gg => {
                            const q = local.qualifiers?.[gg.id] || {};
                            return (_jsxs("div", { style: { ...st.card, padding: 0, overflow: 'hidden', margin: 0 }, children: [_jsxs("div", { style: { padding: '8px 12px', borderBottom: `1px solid ${T.border}`, background: T.bgCardHi, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("span", { style: { fontFamily: 'Bebas Neue', fontSize: 15, letterSpacing: 2, color: T.green }, children: ["GRUPO ", gg.id] }), _jsxs("div", { style: { display: 'flex', gap: 4 }, children: [q.first && _jsxs("span", { style: { ...st.chip('gold'), fontSize: 9, padding: '1px 6px' }, children: ["1\u00B0 ", q.first.split(' ')[0]] }), q.second && _jsxs("span", { style: { ...st.chip(''), fontSize: 9, padding: '1px 6px' }, children: ["2\u00B0 ", q.second.split(' ')[0]] })] })] }), gg.t.map(t => {
                                        const iF = q.first === t, iS = q.second === t;
                                        return (_jsxs("button", { onClick: () => clickQ(gg.id, t), style: { display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 12px', border: 'none', borderTop: `1px solid ${T.border}`, cursor: timeLocked ? 'default' : 'pointer', background: iF ? 'rgba(251,191,36,0.1)' : iS ? 'rgba(59,130,246,0.1)' : 'transparent', transition: 'background 0.1s' }, children: [_jsx(Flag, { name: t, h: 15 }), _jsx("span", { style: { flex: 1, fontSize: 12.5, color: iF ? T.gold : iS ? T.blue : T.textPri, fontWeight: iF || iS ? 600 : 400, textAlign: 'left' }, children: t }), iF && _jsx("span", { style: { fontSize: 10, fontWeight: 700, color: T.gold }, children: "1\u00B0" }), iS && _jsx("span", { style: { fontSize: 10, fontWeight: 700, color: T.blue }, children: "2\u00B0" })] }, t));
                                    })] }, gg.id));
                        }) })] })), sec === 'thirds' && (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsx("p", { style: { fontSize: 13, color: T.textSec }, children: "Eleg\u00ED 8 equipos que clasificar\u00E1n como mejores terceros" }), _jsxs("span", { style: { ...st.chip((local.thirds || []).length === 8 ? 'green' : 'gold'), fontSize: 12 }, children: [(local.thirds || []).length, "/8"] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(185px,1fr))', gap: 8 }, children: t3.map(gg => (_jsxs("div", { style: { ...st.card, padding: 0, overflow: 'hidden', margin: 0 }, children: [_jsx("div", { style: { padding: '8px 12px', borderBottom: `1px solid ${T.border}`, background: T.bgCardHi }, children: _jsxs("span", { style: { fontFamily: 'Bebas Neue', fontSize: 15, letterSpacing: 2, color: '#a855f7' }, children: ["GRUPO ", gg.id] }) }), gg.teams.map(t => {
                                    const sel = (local.thirds || []).includes(t), dis = !sel && (local.thirds || []).length >= 8;
                                    return (_jsxs("button", { onClick: () => togT(t), disabled: timeLocked || dis, style: { display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 12px', border: 'none', borderTop: `1px solid ${T.border}`, cursor: (timeLocked || dis) ? 'default' : 'pointer', background: sel ? 'rgba(168,85,247,0.12)' : 'transparent', opacity: dis ? 0.3 : 1, transition: 'background 0.1s' }, children: [_jsx(Flag, { name: t, h: 15 }), _jsx("span", { style: { flex: 1, fontSize: 12.5, color: sel ? '#c084fc' : T.textPri, fontWeight: sel ? 600 : 400, textAlign: 'left' }, children: t }), sel && _jsx("span", { style: { color: '#a855f7', fontSize: 14 }, children: "\u2713" })] }, t));
                                })] }, gg.id))) })] })), sec === 'awards' && (_jsxs("div", { children: [!appState.groupsFinished && (_jsxs("div", { style: { ...st.card, textAlign: 'center', padding: '40px 20px', borderStyle: 'dashed' }, children: [_jsx("div", { style: { fontSize: 36, marginBottom: 12, opacity: 0.5 }, children: "\uD83C\uDFC5" }), _jsx("p", { style: { fontWeight: 600, color: T.textPri, marginBottom: 6 }, children: "Premios FIFA" }), _jsx("p", { style: { color: T.textSec, fontSize: 13 }, children: "Se habilitar\u00E1n cuando finalice la fase de grupos" })] })), appState.groupsFinished && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: awardsLocked ? 'Torneo finalizado — premios bloqueados' : 'Elegí de la lista oficial de candidatos FIFA · Podés cambiar hasta que finalice el torneo' }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 10 }, children: AWARDS.map(aw => (_jsxs("div", { style: st.card, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, children: [_jsx("span", { style: { fontSize: 13, fontWeight: 600, color: T.textPri }, children: aw.label }), _jsxs("span", { style: { ...st.chip('gold'), fontSize: 10 }, children: [aw.pts, " pts"] })] }), _jsxs("select", { disabled: awardsLocked, value: localAwards[aw.id] || '', onChange: e => setLocalAwards(a => ({ ...a, [aw.id]: e.target.value })), style: { ...st.inp, marginBottom: 0, opacity: awardsLocked ? 0.5 : 1, cursor: awardsLocked ? 'default' : 'pointer' }, children: [_jsx("option", { value: '', children: "\u2014 Elegir candidato \u2014" }), (AWARD_PLAYERS[AWARD_PLAYER_LIST[aw.id]] || []).map(p => _jsx("option", { value: p, children: p }, p))] }), localAwards[aw.id] && _jsxs("div", { style: { fontSize: 11, color: T.green, marginTop: 4 }, children: ["\u2713 ", localAwards[aw.id]] })] }, aw.id))) }), !awardsLocked && (_jsxs("div", { style: { marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }, children: [_jsx("button", { style: st.btn('p'), onClick: saveAwards, disabled: savingAw, children: savingAw ? 'Guardando...' : 'Guardar premios' }), saved && _jsx("span", { style: st.chip('green'), children: "\u2713 Guardado" })] }))] }))] })), sec !== 'awards' && _jsx("p", { style: { fontSize: 11, color: T.textSec, marginTop: 16, opacity: 0.6 }, children: timeLocked ? '🔒 Predicciones cerradas el 11 jun 14:30 hs (Argentina)' : 'Las predicciones se guardan automáticamente · Cierre: 11 jun 14:30 hs (Argentina)' })] }));
}
// ─── MATCHES TAB ──────────────────────────────────────────────────────────────
function MatchesTab({ pred, savePred, mr, allPreds, user }) {
    const [local, setLocal] = useState({});
    const [saving, setSaving] = useState(null);
    const [showO, setShowO] = useState(null);
    useEffect(() => { setLocal(pred.matches || {}); }, [pred]);
    const getStatus = (m) => matchStatus(m, mr[m.id]?.locked, mr[m.id]?.played);
    const saveMatch = (mid) => { const m = local[mid]; if (m?.h == null || m?.a == null)
        return; setSaving(mid); savePred({ ...pred, matches: { ...pred.matches, [mid]: m } }); setSaving(null); };
    const ROUND_LABELS = { 1: 'Jornada 1', 2: 'Jornada 2', 3: 'Jornada 3 (simultánea)', 4: 'Round of 32 — Octavos', 5: 'Round of 16 — Cuartos', 6: 'Cuartos de Final', 7: 'Semifinales', 8: 'Tercer Puesto', 9: '⭐ FINAL ⭐' };
    const byDate = MATCHES.reduce((acc, m) => { const key = m.round >= 4 ? `rnd_${m.round}` : m.dateART; (acc[key] = acc[key] || []).push(m); return acc; }, {});
    const dateOrder = [...new Set(MATCHES.map(m => m.round >= 4 ? `rnd_${m.round}` : m.dateART))];
    const statusConfig = {
        upcoming: { label: 'Próximamente', color: T.textSec, chipV: '' },
        open: { label: 'Abierto', color: T.green, chipV: 'green' },
        locked: { label: 'Cerrado', color: T.gold, chipV: 'gold' },
        played: { label: 'Jugado', color: T.green, chipV: 'green' },
        tbd: { label: 'Por definir', color: T.textSec, chipV: '' },
    };
    return (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 20 }, children: "Cada partido se habilita a medianoche del d\u00EDa que se juega (hora Argentina)" }), dateOrder.map(date => {
                const dayMs = byDate[date];
                return (_jsxs("div", { style: { marginBottom: 28 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }, children: [_jsx("div", { style: { height: 1, width: 12, background: T.border } }), _jsx("h3", { style: { fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: date.startsWith('rnd_') ? T.gold : T.textSec, whiteSpace: 'nowrap' }, children: date.startsWith('rnd_') ? ROUND_LABELS[+date.slice(4)] : date }), _jsx("div", { style: { height: 1, flex: 1, background: T.border } })] }), dayMs.map(m => {
                            const status = getStatus(m);
                            const sc = statusConfig[status];
                            const res = mr[m.id];
                            const p = local[m.id] || {};
                            const sv = pred.matches?.[m.id];
                            const locked = status !== 'open';
                            let pts = null;
                            if (res?.played && sv?.h != null) {
                                pts = sv.h === res.h && sv.a === res.a ? 5 : Math.sign(sv.h - sv.a) === Math.sign(res.h - res.a) ? 3 : 0;
                            }
                            return (_jsxs("div", { style: { ...st.card, marginBottom: 8, opacity: status === 'upcoming' ? 0.55 : 1, borderLeft: `3px solid ${status === 'open' ? T.green : status === 'played' ? T.green : status === 'locked' ? T.gold : T.border}` }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [_jsxs("span", { style: { fontSize: 11, color: T.textSec }, children: [m.round >= 4 ? (m.label || `Ronda ${m.round}`) : `Grupo ${m.g}`, " \u00B7 ", m.timeART, " hs", m.venue ? ` · ${m.venue}` : ''] }), _jsx("span", { style: st.chip(sc.chipV), children: status === 'played' ? '✓ Jugado' : status === 'open' ? '● Abierto' : status === 'locked' ? '🔒 Cerrado' : '⏳ Próximamente' })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12 }, children: [_jsxs("div", { style: { textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }, children: [_jsx(Flag, { name: m.h, h: 20 }), _jsx("span", { style: { fontSize: 12, color: T.textMid, fontWeight: 500 }, children: m.h })] }), _jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [_jsx("input", { type: "number", min: 0, max: 20, disabled: locked, value: p.h ?? '', onChange: e => setLocal(prev => ({ ...prev, [m.id]: { ...prev[m.id], h: e.target.value === '' ? null : +e.target.value } })), style: { width: 52, height: 52, textAlign: 'center', border: `1px solid ${!locked ? T.green : T.border}`, borderRadius: 10, background: !locked ? 'rgba(0,201,107,0.06)' : T.bgInput, color: T.textPri, fontSize: 22, fontFamily: 'Bebas Neue', letterSpacing: 1, cursor: locked ? 'default' : 'text', outline: 'none', transition: 'border-color 0.15s' } }), _jsx("span", { style: { fontFamily: 'Bebas Neue', fontSize: 18, color: T.textSec, letterSpacing: 2 }, children: "VS" }), _jsx("input", { type: "number", min: 0, max: 20, disabled: locked, value: p.a ?? '', onChange: e => setLocal(prev => ({ ...prev, [m.id]: { ...prev[m.id], a: e.target.value === '' ? null : +e.target.value } })), style: { width: 52, height: 52, textAlign: 'center', border: `1px solid ${!locked ? T.green : T.border}`, borderRadius: 10, background: !locked ? 'rgba(0,201,107,0.06)' : T.bgInput, color: T.textPri, fontSize: 22, fontFamily: 'Bebas Neue', letterSpacing: 1, cursor: locked ? 'default' : 'text', outline: 'none', transition: 'border-color 0.15s' } })] }), _jsxs("div", { style: { textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }, children: [_jsx(Flag, { name: m.a, h: 20 }), _jsx("span", { style: { fontSize: 12, color: T.textMid, fontWeight: 500 }, children: m.a })] })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }, children: [_jsxs("div", { style: { fontSize: 12, color: T.textSec }, children: [res?.played && _jsxs("span", { children: ["Resultado: ", _jsxs("strong", { style: { color: T.textPri }, children: [res.h, " - ", res.a] })] }), !res?.played && sv?.h != null && status !== 'upcoming' && _jsxs("span", { style: { color: T.green }, children: ["\u2713 Guardado: ", sv.h, "-", sv.a] })] }), _jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [res?.played && _jsx("button", { style: { ...st.btn(), fontSize: 11, padding: '5px 12px', border: `1px solid ${T.border}` }, onClick: () => setShowO(showO === m.id ? null : m.id), children: showO === m.id ? 'Ocultar' : 'Ver predicciones' }), pts !== null && _jsx("div", { style: { ...st.chip(pts > 0 ? 'green' : ''), padding: '4px 10px' }, children: pts > 0 ? `+${pts} pts` : '0 pts' }), status === 'open' && _jsx("button", { style: { ...st.btn('p'), padding: '7px 18px', fontSize: 12 }, onClick: () => saveMatch(m.id), disabled: saving === m.id || p.h == null || p.a == null, children: saving === m.id ? '...' : 'Guardar' })] })] }), showO === m.id && res?.played && (_jsx("div", { style: { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }, children: Object.entries(allPreds).map(([u2, up]) => {
                                            const mp = up.matches?.[m.id];
                                            if (!mp || mp.h == null)
                                                return null;
                                            const p2 = mp.h === res.h && mp.a === res.a ? 5 : Math.sign(mp.h - mp.a) === Math.sign(res.h - res.a) ? 3 : 0;
                                            return (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '5px 0', borderBottom: `1px solid ${T.border}11` }, children: [_jsxs("span", { style: { color: u2 === user ? T.green : T.textMid, fontWeight: u2 === user ? 600 : 400 }, children: [u2, u2 === user && ' (vos)'] }), _jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [_jsxs("span", { style: { fontFamily: 'Bebas Neue', fontSize: 15, color: T.textPri, letterSpacing: 1 }, children: [mp.h, " - ", mp.a] }), _jsxs("span", { style: { ...st.chip(p2 > 0 ? 'green' : ''), fontSize: 10 }, children: [p2, " pts"] })] })] }, u2));
                                        }) }))] }, m.id));
                        })] }, date));
            })] }));
}
// ─── TABLE TAB ────────────────────────────────────────────────────────────────
function TableTab({ allPreds, mr, gr, fr, appState, currentUser, reloadAllPreds }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => { reloadAllPreds(); }, []);
    const refresh = () => { setLoading(true); reloadAllPreds(); setTimeout(() => setLoading(false), 1200); };
    const rows = Object.entries(allPreds).map(([u, p]) => ({ user: u, score: getScore(p, mr, gr, fr, appState), exactos: getExactos(p, mr, gr, fr, appState), locked: p?.initLocked })).sort((a, b) => b.score - a.score || b.exactos - a.exactos);
    return (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, children: [_jsx("p", { style: { fontSize: 13, color: T.textSec }, children: "Puntuaci\u00F3n en tiempo real" }), _jsx("button", { style: { ...st.btn(), fontSize: 12, padding: '6px 12px', border: `1px solid ${T.border}` }, onClick: refresh, disabled: loading, children: loading ? '...' : '↻ Actualizar' })] }), _jsx(Leaderboard, { data: rows, currentUser: currentUser }), _jsxs("div", { style: { marginTop: 16, padding: '12px 16px', background: T.bgCardHi, borderRadius: 10, border: `1px solid ${T.border}`, fontSize: 12, color: T.textSec, lineHeight: 1.8 }, children: [_jsx("span", { style: { color: T.textMid, fontWeight: 600 }, children: "Partidos:" }), " Exacto: 5 pts \u00B7 Ganador/empate: 3 pts", _jsx("br", {}), _jsx("span", { style: { color: T.textMid, fontWeight: 600 }, children: "Al terminar grupos:" }), " 1\u00B0+2\u00B0 correcto: 5 pts \u00B7 Solo 1\u00B0: 3 \u00B7 Solo 2\u00B0: 1 \u00B7 Mejor 3\u00B0: 1 c/u", _jsx("br", {}), _jsx("span", { style: { color: T.textMid, fontWeight: 600 }, children: "Al terminar el torneo:" }), " Campe\u00F3n: 10 \u00B7 Sub: 5 \u00B7 3\u00B0: 3 \u00B7 4\u00B0: 1 \u00B7 Premios FIFA: hasta 5 c/u"] })] }));
}
// ─── ADMIN WHATSAPP ──────────────────────────────────────────────────────────
function AdminWhatsApp({ group, mr, appState }) {
    const sendWA = (msg) => {
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    };
    const nextMatch = MATCHES.find(m => {
        const s = matchStatus(m, mr[m.id]?.locked, mr[m.id]?.played, mr);
        return s === 'open' || s === 'upcoming';
    });
    const pendingResults = MATCHES.filter(m => {
        const r = mr[m.id];
        return r?.played === false && matchStatus(m, r?.locked, r?.played, mr) === 'locked';
    }).length;
    const messages = [
        {
            label: '⚽ Recordatorio de pronosticar',
            icon: '⏰',
            text: () => `⚽ *PRODE MUNDIAL 2026 — ${group.name.toUpperCase()}*

⏰ Recordatorio: subí tus pronósticos antes de que cierren los partidos.

Ingresá al prode y cargá tus predicciones. ¡No pierdas los puntos!`,
        },
        {
            label: '🔔 Próximo partido',
            icon: '🏟',
            text: () => nextMatch
                ? `🏟 *PRODE MUNDIAL 2026 — ${group.name.toUpperCase()}*

Próximo partido: *${nextMatch.h} vs ${nextMatch.a}*
📅 ${nextMatch.dateART} · ${nextMatch.timeART} hs

¡Cargá tu pronóstico antes del cierre!`
                : '(no hay partidos próximos)',
        },
        {
            label: '🏆 Ver la tabla de posiciones',
            icon: '📊',
            text: () => `📊 *PRODE MUNDIAL 2026 — ${group.name.toUpperCase()}*

¿Ya viste cómo estás en la tabla? Entrá al prode y chequeá los puntos actualizados.

¡La competencia está muy reñida!`,
        },
        {
            label: '🎯 Resultados cargados',
            icon: '✅',
            text: () => `✅ *PRODE MUNDIAL 2026 — ${group.name.toUpperCase()}*

Se cargaron nuevos resultados. Entrá al prode para ver cuántos puntos sumaste y cómo quedó la tabla. ¡A ver quién acertó!`,
        },
    ];
    return (_jsxs("div", { style: { ...st.card, marginTop: 16 }, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 8 }, children: "\uD83D\uDCF2 Mensajes grupales por WhatsApp" }), _jsx("p", { style: { fontSize: 12, color: T.textSec, marginBottom: 12 }, children: "Envi\u00E1 mensajes predise\u00F1ados al grupo de WhatsApp." }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: messages.map((m, i) => (_jsxs("button", { onClick: () => sendWA(m.text()), style: { ...st.btn(), border: `1px solid ${T.border}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', fontSize: 12, color: T.textPri }, children: [_jsx("span", { style: { fontSize: 18 }, children: m.icon }), _jsx("span", { children: m.label })] }, i))) })] }));
}
// ─── INVITE PANEL ─────────────────────────────────────────────────────────────
function InvitePanel({ group }) {
    const [codes, setCodes] = useState([]);
    const [copied, setCopied] = useState(null);
    const [generating, setGenerating] = useState(false);
    useEffect(() => { loadCodes(); }, []);
    const loadCodes = async () => {
        const invites = await (async () => { try {
            const raw = localStorage.getItem('p26_invites');
            return raw ? JSON.parse(raw) : {};
        }
        catch {
            return DB['p26_invites'] || {};
        } })();
        DB['p26_invites'] = invites;
        const groupCodes = Object.entries(invites)
            .filter(([, v]) => v.group === group.name)
            .map(([code, v]) => ({ code, ...v }));
        setCodes(groupCodes);
    };
    const generateCode = async () => {
        setGenerating(true);
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const code = Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const invites = DB['p26_invites'] || {};
        invites[code] = { group: group.name, created: Date.now() };
        DB['p26_invites'] = invites;
        try {
            localStorage.setItem('p26_invites', JSON.stringify(invites));
        }
        catch { }
        await loadCodes();
        setGenerating(false);
    };
    const deleteCode = async (code) => {
        const invites = DB['p26_invites'] || {};
        delete invites[code];
        DB['p26_invites'] = invites;
        try {
            localStorage.setItem('p26_invites', JSON.stringify(invites));
        }
        catch { }
        await loadCodes();
    };
    const copyCode = (code) => {
        navigator.clipboard?.writeText(code).catch(() => { });
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };
    return (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Gener\u00E1 un c\u00F3digo y compartilo. El invitado lo ingresa al registrarse y queda en el grupo autom\u00E1ticamente." }), _jsx("div", { style: { ...st.card, background: T.bgCardHi, marginBottom: 16, padding: '14px 16px' }, children: _jsxs("div", { style: { fontSize: 12, color: T.textMid, lineHeight: 1.8 }, children: [_jsx("div", { children: "1. Gener\u00E1 un c\u00F3digo de invitaci\u00F3n abajo" }), _jsx("div", { children: "2. Compartilo por WhatsApp, mail o donde quieras" }), _jsxs("div", { children: ["3. El invitado abre el prode \u2192 \"", _jsx("strong", { style: { color: T.textPri }, children: "Tengo un c\u00F3digo" }), "\" \u2192 ingresa el c\u00F3digo \u2192 se registra \u2192 queda en el grupo"] })] }) }), codes.length > 0 && (_jsxs("div", { style: { marginBottom: 16 }, children: [_jsx("div", { style: { fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: T.textSec, textTransform: 'uppercase', marginBottom: 10 }, children: "C\u00F3digos activos" }), codes.map(({ code, created }) => (_jsxs("div", { style: { ...st.card, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', marginBottom: 8 }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 26, letterSpacing: 4, color: T.green }, children: code }), _jsxs("div", { style: { fontSize: 11, color: T.textSec, marginTop: 2 }, children: ["Creado ", new Date(created).toLocaleDateString('es-AR')] })] }), _jsxs("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap' }, children: [_jsxs("button", { onClick: () => {
                                            const groupName = group.name.toUpperCase();
                                            const msg = `🏆 *PRODE MUNDIAL 2026* ⚽\n\nEstás invitado al grupo *${groupName}*\n\n👉 Abrí el prode y tocá "Tengo un código de invitación"\n\n🔑 Tu código: *${code}*\n\n¡A pronosticar!`;
                                            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
                                        }, style: { ...st.btn('p'), padding: '7px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }, children: [_jsx("span", { children: "\uD83D\uDCF2" }), " Enviar por WhatsApp"] }), _jsx("button", { onClick: () => copyCode(code), style: { ...st.btn('g'), padding: '7px 14px', fontSize: 12, border: `1px solid ${T.green}44` }, children: copied === code ? '✓ Copiado' : 'Copiar código' }), _jsx("button", { onClick: () => deleteCode(code), style: { ...st.btn('x'), padding: '7px 14px', fontSize: 12, border: `1px solid ${T.red}44` }, children: "Eliminar" })] })] }, code)))] })), _jsx("button", { style: { ...st.btn('p'), padding: '10px 24px', opacity: generating ? 0.7 : 1 }, onClick: generateCode, disabled: generating, children: generating ? '⏳ Generando...' : '+ Generar código de invitación' })] }));
}
// ─── SYNC PANEL (resultados en vivo via Claude API) ──────────────────────────
function SyncPanel({ mrL, setMrL, grL, setGrL, setMsg }) {
    const [syncing, setSyncing] = useState(false);
    const [syncLog, setSyncLog] = useState('');
    const syncResults = async () => {
        setSyncing(true);
        setSyncLog('Consultando resultados del Mundial 2026...');
        try {
            const today = new Date().toLocaleDateString('es-AR');
            const prompt = `Necesito los resultados más recientes del Mundial FIFA 2026. 
Fecha de hoy: ${today}

Por favor buscá los resultados actualizados y devolvé un JSON con este formato exacto:
{
  "matches": [
    {"id": "ar1m1", "homeScore": 2, "awayScore": 1, "played": true},
    ...
  ],
  "groupStandings": {
    "A": {"first": "México", "second": "Corea del Sur"},
    ...
  }
}

Los IDs de partidos de grupos son: ${MATCHES.filter(m => m.round <= 3).slice(0, 5).map(m => m.id).join(', ')}... (etc)
Los nombres de equipos exactos son: ${GRP.flatMap(g => g.t).join(', ')}

Respondé SOLO con el JSON, sin texto adicional.`;
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 4000,
                    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
                    messages: [{ role: 'user', content: prompt }]
                })
            });
            const data = await response.json();
            // Extract text content from response
            const textBlocks = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
            // Try to parse JSON from response
            const jsonMatch = textBlocks.match(/\{[\s\S]*\}/);
            if (!jsonMatch)
                throw new Error('No se encontró JSON en la respuesta');
            const results = JSON.parse(jsonMatch[0]);
            let updated = 0;
            // Apply match results
            if (results.matches) {
                const newMr = { ...mrL };
                results.matches.forEach(m => {
                    if (m.played && m.homeScore != null && m.awayScore != null) {
                        newMr[m.id] = { ...(newMr[m.id] || {}), h: m.homeScore, a: m.awayScore, played: true, locked: true };
                        updated++;
                    }
                });
                setMrL(newMr);
            }
            // Apply group standings
            if (results.groupStandings) {
                const newGr = { ...grL, groups: { ...grL.groups } };
                Object.entries(results.groupStandings).forEach(([g, st]) => {
                    if (st.first || st.second) {
                        newGr.groups[g] = { ...(newGr.groups[g] || {}), ...st };
                    }
                });
                setGrL(newGr);
            }
            setSyncLog(`✓ Sincronizado: ${updated} resultados actualizados`);
            setMsg(`✓ ${updated} resultados sincronizados`);
        }
        catch (e) {
            setSyncLog(`Error: ${e.message}`);
            setMsg('⚠ Error al sincronizar — revisá los resultados manualmente');
        }
        finally {
            setSyncing(false);
            setTimeout(() => setSyncLog(''), 8000);
        }
    };
    return (_jsxs("div", { style: { ...st.card, marginTop: 8, borderColor: `rgba(116,172,223,0.3)` }, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 8 }, children: "\uD83C\uDF10 Sincronizar con FIFA (resultados en vivo)" }), _jsx("p", { style: { fontSize: 12, color: T.textSec, marginBottom: 12 }, children: "Usa inteligencia artificial para buscar y cargar autom\u00E1ticamente los \u00FAltimos resultados del Mundial. Revis\u00E1 los cambios antes de guardar." }), _jsx("button", { style: { ...st.btn('p'), fontSize: 12, opacity: syncing ? 0.7 : 1 }, onClick: syncResults, disabled: syncing, children: syncing ? '⏳ Sincronizando...' : '🔄 Obtener resultados en vivo' }), syncLog && (_jsx("div", { style: { marginTop: 10, padding: '8px 12px', background: syncLog.startsWith('✓') ? T.greenDim : T.redDim || 'rgba(244,63,94,0.1)', borderRadius: 8, fontSize: 12, color: syncLog.startsWith('✓') ? T.green : T.red || '#f43f5e', border: `1px solid ${syncLog.startsWith('✓') ? T.green + '33' : 'rgba(244,63,94,0.3)'}` }, children: syncLog }))] }));
}
// ─── ADMIN TAB ────────────────────────────────────────────────────────────────
function AdminTab({ mr, gr, fr, appState, onSave, group, setGroup, user }) {
    const [mrL, setMrL] = useState(() => JSON.parse(JSON.stringify(mr)));
    const [grL, setGrL] = useState(() => JSON.parse(JSON.stringify(gr)));
    const [frL, setFrL] = useState(() => JSON.parse(JSON.stringify(fr)));
    const [stL, setStL] = useState(() => ({ ...appState }));
    const [msg, setMsg] = useState('');
    const [sec, setSec] = useState('matches');
    const [toRm, setToRm] = useState('');
    const save = () => { onSave(mrL, grL, frL, stL); setMsg('✓ Guardado'); setTimeout(() => setMsg(''), 3000); };
    const removeMember = () => { if (!toRm || toRm === user)
        return; const gs = DB['p26_groups'] || {}; const k = group.name; if (gs[k]) {
        gs[k].members = gs[k].members.filter(m => m !== toRm);
        persist('p26_groups', gs);
        setGroup({ ...group, members: gs[k].members });
        setToRm('');
        setMsg('✓ Eliminado');
        setTimeout(() => setMsg(''), 3000);
    } };
    const aSecs = [{ k: 'matches', l: 'Partidos' }, { k: 'estado', l: 'Estado' }, { k: 'sim', l: '🧪 Simulación' }, { k: 'invites', l: '🔗 Invitar' }, { k: 'groups', l: 'Grupos' }, { k: 'podium', l: 'Podio' }, { k: 'awards', l: 'Premios' }, { k: 'members', l: 'Miembros' }];
    return (_jsxs("div", { children: [_jsx("div", { style: { display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }, children: aSecs.map(s => _jsx("button", { onClick: () => setSec(s.k), style: { padding: '6px 14px', border: `1px solid ${sec === s.k ? T.green : T.border}`, borderRadius: 20, fontSize: 12, cursor: 'pointer', background: sec === s.k ? T.greenDim : 'transparent', color: sec === s.k ? T.green : T.textSec, fontFamily: 'DM Sans', fontWeight: sec === s.k ? 600 : 400 }, children: s.l }, s.k)) }), sec === 'estado' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Controla qu\u00E9 predicciones est\u00E1n activas y cu\u00E1ndo se calculan puntos extra" }), [{ k: 'groupsFinished', l: 'Fase de grupos finalizada', desc: 'Habilita premios FIFA · suma puntos de clasificados y mejores 3° · auto-puebla octavos de final' }, { k: 'tournamentFinished', l: 'Torneo finalizado', desc: 'Suma puntos de podio y premios FIFA' }].map(({ k, l, desc }) => (_jsxs("div", { style: { ...st.card, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 2 }, children: l }), _jsx("div", { style: { fontSize: 12, color: T.textSec }, children: desc })] }), _jsx("div", { onClick: () => {
                                    const newVal = !stL[k];
                                    setStL(s => ({ ...s, [k]: newVal }));
                                    // Al marcar grupos finalizados, auto-poblar octavos
                                    if (k === 'groupsFinished' && newVal) {
                                        const updates = autoPopulateKnockout(grL, mrL);
                                        if (Object.keys(updates).length > 0)
                                            setMrL(prev => ({ ...prev, ...updates }));
                                    }
                                }, style: { width: 44, height: 24, borderRadius: 12, background: stL[k] ? T.green : T.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }, children: _jsx("div", { style: { position: 'absolute', top: 3, left: stL[k] ? 22 : 3, width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' } }) })] }, k))), _jsxs("div", { style: { ...st.card, marginTop: 8 }, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 8 }, children: "\uD83D\uDD04 Auto-poblar eliminatoria" }), _jsx("p", { style: { fontSize: 12, color: T.textSec, marginBottom: 12 }, children: "Calcula autom\u00E1ticamente los equipos de cada ronda eliminatoria seg\u00FAn los resultados de grupos cargados y el bracket oficial de la FIFA." }), _jsx("button", { style: { ...st.btn('g'), border: `1px solid ${T.green}44`, fontSize: 12 }, onClick: () => {
                                    const updates = autoPopulateKnockout(grL, mrL);
                                    if (Object.keys(updates).length > 0) {
                                        setMrL(prev => ({ ...prev, ...updates }));
                                        setMsg(`✓ ${Object.keys(updates).length} partidos actualizados`);
                                    }
                                    else
                                        setMsg('⚠ Sin datos suficientes — cargá resultados de grupos primero');
                                    setTimeout(() => setMsg(''), 3000);
                                }, children: "Calcular equipos de eliminatoria" })] }), _jsx(SyncPanel, { mrL: mrL, setMrL: setMrL, grL: grL, setGrL: setGrL, setMsg: setMsg })] })), sec === 'sim' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Simul\u00E1 cualquier momento del torneo para testear predicciones y puntajes" }), _jsxs("div", { style: st.card, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 12 }, children: "\uD83D\uDCC5 Fecha y hora simulada (hora Argentina)" }), _jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }, children: [_jsx("div", { style: { flex: 1, minWidth: 200 }, children: _jsx("input", { type: "datetime-local", style: { ...st.inp, marginBottom: 0 }, value: stL.simDate ? new Date(new Date(stL.simDate).getTime()).toISOString().slice(0, 16) : '', onChange: e => { if (!e.target.value) {
                                                setStL(s => ({ ...s, simDate: null }));
                                                return;
                                            } const localMs = new Date(e.target.value).getTime(); const artOffset = -3 * 60 * 60 * 1000; const utcMs = localMs - artOffset - new Date().getTimezoneOffset() * 60000; setStL(s => ({ ...s, simDate: new Date(utcMs).toISOString() })); } }) }), _jsx("button", { style: { ...st.btn('x'), marginBottom: 8, border: `1px solid ${T.red}44` }, onClick: () => setStL(s => ({ ...s, simDate: null })), children: "Limpiar" })] }), stL.simDate && _jsxs("div", { style: { marginTop: 10, padding: '8px 12px', background: T.greenDim, borderRadius: 8, fontSize: 12, color: T.green, border: `1px solid ${T.green}33` }, children: ["\u26A0 Simulando: ", _jsx("strong", { children: new Date(stL.simDate).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', dateStyle: 'full', timeStyle: 'short' }) })] }), !stL.simDate && _jsxs("div", { style: { marginTop: 10, padding: '8px 12px', background: T.bgCardHi, borderRadius: 8, fontSize: 12, color: T.textSec }, children: ["Usando hora real \u00B7 ", new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', dateStyle: 'full', timeStyle: 'short' })] })] }), _jsxs("div", { style: st.card, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 12 }, children: "\u26A1 Atajos" }), _jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 8 }, children: [{ l: 'Inicio del torneo', d: '2026-06-11T18:00:00Z' }, { l: 'Jornada 1 finalizada', d: '2026-06-14T06:00:00Z' }, { l: 'Jornada 2 finalizada', d: '2026-06-20T06:00:00Z' }, { l: 'Grupos finalizados', d: '2026-06-26T06:00:00Z' }, { l: 'Final del mundial', d: '2026-07-19T23:00:00Z' }].map(({ l, d }) => (_jsx("button", { style: { ...st.btn(), fontSize: 12, padding: '7px 14px', border: `1px solid ${T.border}` }, onClick: () => setStL(s => ({ ...s, simDate: d })), children: l }, l))) })] }), _jsxs("div", { style: st.card, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 10 }, children: "Estado de partidos con fecha simulada" }), MATCHES.map(m => { const simNow = stL.simDate ? new Date(stL.simDate) : new Date(); const lk = new Date(m.kickoff.getTime() - 30 * 60 * 1000); const op = new Date(m.kickoff); op.setUTCHours(3, 0, 0, 0); if (op > m.kickoff)
                                op.setUTCDate(op.getUTCDate() - 1); const r = mrL[m.id] || {}; let st = 'upcoming'; if (r.played)
                                st = 'played';
                            else if (r.locked || simNow >= lk)
                                st = 'locked';
                            else if (simNow >= op)
                                st = 'open'; const stColors = { upcoming: T.textSec, open: T.green, locked: T.gold, played: T.green }; const stLabels = { upcoming: '⏳', open: '🟢', locked: '🔒', played: '✓' }; return (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${T.border}22`, fontSize: 12 }, children: [_jsxs("span", { style: { color: T.textMid }, children: [m.dateART, " ", m.timeART, " \u00B7 ", _jsxs("strong", { style: { color: T.textPri }, children: [m.h, " vs ", m.a] })] }), _jsxs("span", { style: { color: stColors[st], fontWeight: 600 }, children: [stLabels[st], " ", st] })] }, m.id)); })] })] })), sec === 'matches' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Carg\u00E1 resultados y bloque\u00E1 predicciones. Para eliminatoria, primero defin\u00ED los equipos." }), MATCHES.map(m => {
                        const r = mrL[m.id] || { h: '', a: '', played: false, locked: false };
                        const isTBD = m.tbd && (!r.teamH && !m.h || !r.teamA && !m.a);
                        return (_jsxs("div", { style: { ...st.card, marginBottom: 8 }, children: [_jsx("div", { style: { fontSize: 12, color: m.round >= 4 ? T.gold : T.textSec, marginBottom: 8, fontWeight: m.round >= 4 ? 600 : 400 }, children: m.round >= 4 ? `${m.label || 'Eliminatoria'} (Ronda ${m.round})` : `Grupo ${m.g} · Jornada ${m.round}` }), _jsx("div", { style: { fontSize: 12, color: T.textSec, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }, children: m.round >= 4 ? (_jsxs(_Fragment, { children: [_jsx("input", { placeholder: "Equipo local", value: r.teamH || m.h || '', onChange: e => setMrL(p => ({ ...p, [m.id]: { ...r, teamH: e.target.value } })), style: { flex: 1, padding: '5px 8px', border: `1px solid ${T.border}`, borderRadius: 6, background: T.bgInput, color: T.textPri, fontSize: 12 } }), _jsx("span", { style: { color: T.textSec }, children: "vs" }), _jsx("input", { placeholder: "Equipo visitante", value: r.teamA || m.a || '', onChange: e => setMrL(p => ({ ...p, [m.id]: { ...r, teamA: e.target.value } })), style: { flex: 1, padding: '5px 8px', border: `1px solid ${T.border}`, borderRadius: 6, background: T.bgInput, color: T.textPri, fontSize: 12 } })] })) : (_jsxs(_Fragment, { children: [_jsx(Team, { name: m.h, size: 12 }), _jsx("span", { style: { color: T.textSec, marginInline: 4 }, children: "vs" }), _jsx(Team, { name: m.a, size: 12 })] })) }), _jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }, children: [_jsxs("div", { style: { display: 'flex', gap: 6, alignItems: 'center' }, children: [_jsx("input", { type: "number", min: 0, max: 20, value: r.h ?? '', onChange: e => setMrL(p => ({ ...p, [m.id]: { ...r, h: +e.target.value } })), style: { width: 52, height: 40, textAlign: 'center', border: `1px solid ${T.border}`, borderRadius: 8, background: T.bgInput, color: T.textPri, fontSize: 18, fontFamily: 'Bebas Neue', outline: 'none' } }), _jsx("span", { style: { color: T.textSec, fontFamily: 'Bebas Neue', fontSize: 16 }, children: "-" }), _jsx("input", { type: "number", min: 0, max: 20, value: r.a ?? '', onChange: e => setMrL(p => ({ ...p, [m.id]: { ...r, a: +e.target.value } })), style: { width: 52, height: 40, textAlign: 'center', border: `1px solid ${T.border}`, borderRadius: 8, background: T.bgInput, color: T.textPri, fontSize: 18, fontFamily: 'Bebas Neue', outline: 'none' } })] }), _jsxs("label", { style: { display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, cursor: 'pointer', color: T.textMid }, children: [_jsx("input", { type: "checkbox", checked: !!r.played, onChange: e => setMrL(p => ({ ...p, [m.id]: { ...r, played: e.target.checked } })) }), "Jugado"] }), _jsxs("label", { style: { display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, cursor: 'pointer', color: T.textMid }, children: [_jsx("input", { type: "checkbox", checked: !!r.locked, onChange: e => setMrL(p => ({ ...p, [m.id]: { ...r, locked: e.target.checked } })) }), "Bloqueado"] })] })] }, m.id));
                    })] })), sec === 'groups' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Clasificados reales por grupo" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(195px,1fr))', gap: 8, marginBottom: 12 }, children: GRP.map(gg => {
                            const g2 = grL.groups?.[gg.id] || {};
                            return (_jsxs("div", { style: { ...st.card, padding: '12px 14px' }, children: [_jsxs("div", { style: { fontFamily: 'Bebas Neue', fontSize: 14, letterSpacing: 2, color: T.green, marginBottom: 10 }, children: ["GRUPO ", gg.id] }), _jsxs("select", { value: g2.first || '', onChange: e => setGrL(p => ({ ...p, groups: { ...p.groups, [gg.id]: { ...g2, first: e.target.value } } })), style: { ...st.inp, marginBottom: 6 }, children: [_jsx("option", { value: '', children: "1\u00B0 lugar..." }), gg.t.map(t => _jsx("option", { value: t, children: t }, t))] }), _jsxs("select", { value: g2.second || '', onChange: e => setGrL(p => ({ ...p, groups: { ...p.groups, [gg.id]: { ...g2, second: e.target.value } } })), style: { ...st.inp, marginBottom: 0 }, children: [_jsx("option", { value: '', children: "2\u00B0 lugar..." }), gg.t.map(t => _jsx("option", { value: t, children: t }, t))] })] }, gg.id));
                        }) }), _jsxs("div", { style: st.card, children: [_jsxs("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 10 }, children: ["Mejores terceros clasificados \u00B7 ", _jsxs("span", { style: { color: T.green }, children: [(grL.thirds || []).length, "/8"] })] }), _jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 6 }, children: ALL_TEAMS.map(t => { const s = (grL.thirds || []).includes(t); return (_jsxs("button", { onClick: () => { const cur = grL.thirds || []; setGrL(p => ({ ...p, thirds: s ? cur.filter(x => x !== t) : cur.length < 8 ? [...cur, t] : cur })); }, style: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: `1px solid ${s ? T.green : T.border}`, borderRadius: 20, fontSize: 11, cursor: 'pointer', background: s ? T.greenDim : 'transparent', color: s ? T.green : T.textSec, transition: 'all 0.1s' }, children: [_jsx(Flag, { name: t, h: 13 }), t] }, t)); }) })] })] })), sec === 'podium' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Podio real del torneo" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }, children: [{ k: 'p1', l: '🥇 Campeón' }, { k: 'p2', l: '🥈 Subcampeón' }, { k: 'p3', l: '🥉 3° Puesto' }, { k: 'p4', l: '4° Puesto' }].map(({ k, l }) => (_jsxs("div", { style: st.card, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 8 }, children: l }), _jsxs("select", { value: frL.podium?.[k] || '', onChange: e => setFrL(p => ({ ...p, podium: { ...p.podium, [k]: e.target.value } })), style: { ...st.inp, marginBottom: 0 }, children: [_jsx("option", { value: '', children: "Elegir..." }), ALL_TEAMS.map(t => _jsx("option", { value: t, children: t }, t))] })] }, k))) })] })), sec === 'awards' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Ganadores reales de premios FIFA" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 10 }, children: AWARDS.map(aw => (_jsxs("div", { style: st.card, children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: T.textPri, marginBottom: 8 }, children: aw.label }), _jsxs("select", { style: { ...st.inp, marginBottom: 0 }, value: frL.awards?.[aw.id] || '', onChange: e => setFrL(p => ({ ...p, awards: { ...p.awards, [aw.id]: e.target.value } })), children: [_jsx("option", { value: '', children: "\u2014 Ganador real \u2014" }), (AWARD_PLAYERS[AWARD_PLAYER_LIST[aw.id]] || []).map(p => _jsx("option", { value: p, children: p }, p))] })] }, aw.id))) })] })), sec === 'members' && (_jsxs("div", { children: [_jsx("p", { style: { fontSize: 13, color: T.textSec, marginBottom: 16 }, children: "Participantes del grupo" }), group.members.map(m => (_jsxs("div", { style: { ...st.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', marginBottom: 6 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [_jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: T.bgCardHi, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: T.textMid, fontWeight: 600 }, children: m[0].toUpperCase() }), _jsxs("span", { style: { fontSize: 13, color: T.textPri, textTransform: 'capitalize' }, children: [m, m === user && _jsx("span", { style: { color: T.textSec }, children: " (vos)" }), m === group.admin && _jsx("span", { style: { color: T.gold }, children: " \uD83D\uDC51" })] })] }), m !== user && m !== group.admin && _jsx("button", { style: { ...st.btn('x'), padding: '5px 12px', fontSize: 11, border: `1px solid ${T.red}44` }, onClick: () => setToRm(m), children: "Eliminar" })] }, m))), toRm && (_jsxs("div", { style: { ...st.card, marginTop: 8, borderColor: `${T.red}44` }, children: [_jsxs("p", { style: { fontSize: 13, color: T.textPri, marginBottom: 12 }, children: ["\u00BFEliminar a ", _jsx("strong", { children: toRm }), " del grupo?"] }), _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [_jsx("button", { style: { ...st.btn('x'), border: `1px solid ${T.red}44` }, onClick: removeMember, children: "Confirmar" }), _jsx("button", { style: { ...st.btn(), border: `1px solid ${T.border}` }, onClick: () => setToRm(''), children: "Cancelar" })] })] }))] })), sec === 'invites' && _jsx(InvitePanel, { group: group }), sec === 'invites' && _jsx(AdminWhatsApp, { group: group, mr: mrL, appState: stL }), _jsxs("div", { style: { marginTop: 24, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("button", { style: st.btn('p'), onClick: save, children: "Guardar cambios" }), msg && _jsx("span", { style: { fontSize: 13, color: msg.startsWith('✓') ? T.green : T.red, fontWeight: 500 }, children: msg })] })] }));
}
// ─── LEADERBOARD ─────────────────────────────────────────────────────────────
function Leaderboard({ data, currentUser }) {
    if (!data.length)
        return (_jsx("div", { style: { textAlign: 'center', padding: '40px 20px', color: T.textSec }, children: _jsx("p", { style: { fontSize: 14 }, children: "Sin datos. Los puntos aparecen cuando hay resultados cargados." }) }));
    const medals = ['🥇', '🥈', '🥉'];
    return (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: data.map((row, i) => {
            const isMe = row.user === currentUser;
            return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: `1px solid ${isMe ? T.green : T.border}`, background: isMe ? T.greenDim : T.bgCard, transition: 'all 0.15s' }, children: [_jsx("div", { style: { fontFamily: 'Bebas Neue', fontSize: 20, minWidth: 32, textAlign: 'center', color: i === 0 ? T.gold : i === 1 ? '#9ca3af' : i === 2 ? '#cd7f32' : T.textSec }, children: medals[i] || `${i + 1}` }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("span", { style: { fontWeight: isMe ? 600 : 500, fontSize: 14, color: isMe ? T.green : T.textPri, textTransform: 'capitalize' }, children: row.user }), isMe && _jsx("span", { style: { fontSize: 11, color: T.green, marginLeft: 6, opacity: 0.8 }, children: "\u00B7 vos" }), row.exactos > 0 && _jsxs("span", { style: { fontSize: 10, color: T.textSec, marginLeft: 6 }, children: [row.exactos, " exacto", row.exactos !== 1 ? 's' : ''] })] }), _jsxs("div", { style: { fontFamily: 'Bebas Neue', fontSize: 26, color: isMe ? T.green : T.textPri, letterSpacing: 1 }, children: [row.score, _jsx("span", { style: { fontSize: 13, color: T.textSec, fontFamily: 'DM Sans', fontWeight: 400, letterSpacing: 0, marginLeft: 3 }, children: "pts" })] })] }, row.user));
        }) }));
}
