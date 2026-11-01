"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { beforeAfter, featured, nav, process, projects, services, studio, testimonials, videos, type Category, type Project } from "@/lib/data";
import { asset } from "@/lib/base-path";
import { sizes } from "@/lib/sizes";
import { wrap } from "@/lib/ui";
import { IconInstagram, IconPin, IconRight, IconWhatsapp } from "./Icons";
import { Magnetic, RevealImage } from "./FX";
import { useHistoryLayer } from "./Nav";

/* ---------- utilitários ---------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const byId = (id: string) => projects.find((p) => p.id === id)!;
const whatsappLink = (msg: string) => `${studio.whatsapp}?text=${encodeURIComponent(msg)}`;

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

/** Vídeo de prévia: só toca enquanto está na tela. */
function usePlayInView(threshold = 0.5) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Esc fecha, trava a rolagem e liga a janela ao histórico (voltar do celular fecha). */
function useLayer(open: boolean, close: () => void, extra?: (e: KeyboardEvent) => void) {
  useHistoryLayer(open, close);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      extra?.(e);
    };
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", k);
    };
  }, [open, close, extra]);
}

/* abre o visualizador de qualquer lugar da página */
const openProject = (id: string, start = 0) => window.dispatchEvent(new CustomEvent("pr:project", { detail: { id, start } }));

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-line py-2 text-[0.72rem]">
      ← Voltar
    </button>
  );
}

export function Pinha({ className = "h-7 w-auto" }: { className?: string }) {
  return <Image src={asset("/img/pinha.png")} alt="" width={146} height={220} unoptimized className={className} />;
}

/* ---------- cabeçalho com menu em tela cheia ---------- */
const menuImgs = ["/img/sala-2.webp", "/img/clinica-1.webp", "/img/padaria-0.webp", "/img/sala-0.webp", "/img/dynafit-0.webp", "/img/laisy.webp", "/img/chale-0.webp"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(0);
  const close = useCallback(() => setOpen(false), []);
  useLayer(open, close);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      if (y > 600 && y > last + 2) setHidden(true);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${solid && !open ? "bg-ink/90 shadow-[0_1px_0_rgba(241,235,225,0.08)]" : ""}`}>
        <div className={`${wrap} flex h-[4.5rem] items-center justify-between gap-4 text-[#f1ebe1]`}>
          <a href="#inicio" data-no-back onClick={close} className="flex items-center gap-3" aria-label="Pinheiro Rocha, início">
            <Pinha className="h-8 w-auto" />
            <span className="leading-none">
              <span className="t-display block text-[1.02rem] tracking-[0.08em]">Pinheiro Rocha</span>
              <span className="mt-1 block text-[0.56rem] tracking-[0.26em] text-[#f1ebe1]/70 uppercase">Arquitetura e Urbanismo</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <Magnetic strength={0.2}>
              <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-copper py-2.5 max-sm:hidden">
                Pedir orçamento
              </a>
            </Magnetic>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="btn py-2.5 pr-1 hover:text-copper" aria-label={open ? "Fechar menu" : "Abrir menu"}>
              <span className="max-sm:hidden">{open ? "Fechar" : "Menu"}</span>
              <span className="flex w-6 flex-col gap-[6px]">
                <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : "ml-2 w-4"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-ink text-[#f1ebe1] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`} aria-hidden={!open}>
        <div className={`${wrap} grid h-full items-center gap-10 pt-20 pb-8 md:grid-cols-[1.1fr_0.9fr]`}>
          <nav aria-label="Menu" className="flex flex-col">
            {nav.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                tabIndex={open ? 0 : -1}
                onClick={close}
                onPointerEnter={() => setHover(i)}
                className="group flex items-baseline gap-4 border-b border-[#f1ebe1]/10 py-2.5 md:py-3"
                style={{ transition: `opacity .6s ${0.2 + i * 0.05}s, transform .6s ${0.2 + i * 0.05}s`, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(24px)" }}
              >
                <span className="w-7 text-[0.7rem] text-copper">0{i + 1}</span>
                <span className="t-display text-[clamp(1.6rem,4.2vw,3rem)] transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-copper">{n.label}</span>
              </a>
            ))}
            <div className="mt-8 flex flex-wrap gap-3" style={{ transition: "opacity .6s .6s", opacity: open ? 1 : 0 }}>
              <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-copper">
                <IconWhatsapp className="h-4 w-4" /> {studio.whatsappLabel}
              </a>
              <a href={studio.instagram} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-line">
                <IconInstagram className="h-4 w-4" /> {studio.handle}
              </a>
            </div>
          </nav>
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[4px] md:block">
            {open &&
              menuImgs.map((src, i) => (
                <Image key={src} src={asset(src)} alt="" fill quality={92} sizes="40vw" className={`object-cover transition-[opacity,transform] duration-700 ${hover === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- topo: fotos de projeto alternando em tela cheia ---------- */
const heroSlides = [
  { src: "/img/sala-0.webp", label: "Sala e cozinha integradas · obra pronta" },
  { src: "/img/clinica-0.webp", label: "Clínica Ceemed · obra pronta" },
  { src: "/img/dynafit-0.webp", label: "Academia Dynafit · obra pronta" },
];

export function Hero() {
  const [i, setI] = useState(0);
  const bg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bg.current && y < window.innerHeight * 1.2) bg.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="inicio" className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-ink text-[#f1ebe1]">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        {heroSlides.map((s, k) => (
          <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1.6s] ${k === i ? "opacity-100" : "opacity-0"}`}>
            <Image src={asset(s.src)} alt="" fill priority={k === 0} quality={92} sizes="100vw" className={`object-cover ${k === i ? "animate-[slowZoom_7s_ease-out_both]" : ""}`} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.55)_0%,rgba(20,18,16,0.2)_35%,rgba(20,18,16,0.85)_100%)]" />
      </div>
      <div className={`${wrap} relative flex h-full flex-col justify-end pb-10 pt-28 md:pb-14`}>
        <p className="t-label animate-[fadeUp_1s_0.2s_both] text-copper">Arquitetura e rotina, para viver bem</p>
        <h1 className="t-display t-hero mt-4 max-w-[14ch]" aria-label={studio.slogan}>
          {["Onde a vida", "ganha forma,", "beleza e propósito."].map((l, k) => (
            <span key={l} className="block overflow-hidden pb-[0.08em] pt-[0.14em]">
              <span className={`block animate-[riseIn_1.2s_cubic-bezier(0.16,1,0.3,1)_both] ${k > 0 ? "text-copper" : ""}`} style={{ animationDelay: `${0.25 + k * 0.12}s` }}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <div className="mt-8 grid animate-[fadeUp_1s_0.8s_both] gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-[34rem] text-[1rem] leading-relaxed text-[#f1ebe1]/85">
            Arquitetura, interiores e fachadas da arquiteta Laísy Pinheiro Rocha. Presencial em Bom Jardim de Minas, Juiz de Fora e região, e online para todo o Brasil.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projetos" className="btn btn-copper">
              Ver projetos <IconRight className="h-3.5 w-3.5" />
            </a>
            <a href="#contato" className="btn bg-[#f1ebe1] text-ink hover:-translate-y-0.5">
              Pedir orçamento
            </a>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#f1ebe1]/15 pt-4 text-[0.75rem] text-[#f1ebe1]/75">
          <span className="min-w-0 truncate">{heroSlides[i].label}</span>
          <div className="flex gap-1.5">
            {heroSlides.map((s, k) => (
              <button key={s.src} type="button" onClick={() => setI(k)} aria-label={`Mostrar ${s.label}`} className="relative h-[3px] w-10 overflow-hidden bg-[#f1ebe1]/25">
                {k === i && <span key={i} className="absolute inset-0 origin-left animate-[fill_6s_linear_both] bg-copper" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- manifesto: texto e foto que se revela ---------- */
const principles = [
  "Cada projeto começa entendendo a rotina de quem vai viver ali, o terreno e o clima.",
  "Paleta bem definida, madeira, textura e luz quente: casa com aconchego, não vitrine.",
  "Linhas que continuam bonitas daqui a muitos anos, longe das modas passageiras.",
  "Ouvir, ajustar e refazer até ficar do jeitinho que o cliente sonhou.",
];

export function Manifesto() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-16">
      <div>
        <p className="t-label text-copper">Como a gente pensa</p>
        <h2 className="t-display t-h1 mt-4">
          Casa com identidade, <span className="text-copper">não com tendência.</span>
        </h2>
        <ul className="mt-8 space-y-5">
          {principles.map((p, i) => (
            <li key={p} className="flex gap-4 border-t border-line pt-5 text-[0.98rem] leading-relaxed text-cream/85">
              <span className="mt-1 h-2 w-2 shrink-0 bg-copper" style={{ opacity: 1 - i * 0.15 }} />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <RevealImage className="relative aspect-[4/5] md:aspect-[5/6]">
        <Image src={asset("/img/chale-0.webp")} alt="Chalé com madeira e janelas de moldura vermelha, projetado pelo escritório" fill quality={92} sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        <span className="absolute bottom-3 left-3 bg-ink/75 px-3 py-1.5 text-[0.72rem] text-[#f1ebe1]">Chalé · obra pronta</span>
      </RevealImage>
    </div>
  );
}

/* ---------- projetos em destaque: cartões em tela cheia que se empilham ---------- */
export function Featured() {
  return (
    <div>
      {featured.map((id, i) => {
        const p = byId(id);
        return (
          <div key={id} className="sticky top-0 h-[100svh] overflow-hidden bg-ink" style={{ zIndex: i + 1 }}>
            <button type="button" onClick={() => openProject(id)} className="group absolute inset-0 text-left" data-cursor="Ver projeto" aria-label={`Ver o projeto ${p.title}`}>
              <Image src={asset(p.cover)} alt={`${p.title}: ${p.kind}`} fill quality={92} sizes="100vw" className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.35)_0%,transparent_30%,transparent_55%,rgba(20,18,16,0.9)_100%)]" />
              <span className={`${wrap} absolute inset-x-0 bottom-0 flex flex-col items-center pb-12 text-center text-[#f1ebe1] md:pb-16`}>
                <span className="t-label text-[#f1ebe1]/80">
                  0{i + 1} / 0{featured.length} · {p.status}
                </span>
                <span className="t-display mt-3 text-[clamp(2.1rem,5.5vw,4.6rem)] text-copper">{p.title}</span>
                <span className="mt-2 text-[0.95rem] tracking-[0.08em] text-[#f1ebe1]/85">
                  {p.kind} · {p.place} · {p.year}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 bg-copper px-5 py-2 text-[0.72rem] font-semibold tracking-[0.14em] text-ink uppercase transition-transform group-hover:-translate-y-0.5">
                  Ver {p.shots.length} fotos <IconRight className="h-3 w-3" />
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- portfólio filtrável ---------- */
const filters: ("Todos" | Category)[] = ["Todos", "Comercial", "Residencial", "Fachadas"];
const cols = [7, 5, 5, 7, 6, 6];
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];
// largura do último cartão conforme o espaço que sobrou na linha (classes completas para o Tailwind gerar)
const lastSpan: Record<number, string> = { 5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 12: "md:col-span-12" };

export function Portfolio() {
  const [f, setF] = useState<(typeof filters)[number]>("Todos");
  const list = projects.filter((p) => f === "Todos" || p.category === f);
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar projetos">
        {filters.map((x) => {
          const n = x === "Todos" ? projects.length : projects.filter((p) => p.category === x).length;
          return (
            <button key={x} type="button" role="tab" aria-selected={f === x} onClick={() => setF(x)} className={`btn py-2 text-[0.72rem] ${f === x ? "bg-copper text-ink" : "btn-line"}`}>
              {x} <span className="opacity-60">{n}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-12 md:gap-5">
        {list.map((p, i) => {
          // o último cartão ocupa o resto da linha, para não sobrar buraco no fim da grade
          const used = list.slice(0, i).reduce((t, _, k) => (t + cols[k % cols.length]) % 12, 0);
          const span = i === list.length - 1 ? lastSpan[12 - used] : spans[i % spans.length];
          return <ProjectCard key={`${f}-${p.id}`} p={p} i={i} span={span} />;
        })}
      </div>
    </>
  );
}

function ProjectCard({ p, i, span }: { p: Project; i: number; span: string }) {
  const [ref, v] = useInView<HTMLButtonElement>(0.15);
  const second = p.shots.find((s, k) => k > 0 && !s.tag)?.src ?? p.shots[1].src;
  const vids = p.videos?.length ?? 0;
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => openProject(p.id)}
      data-cursor="Abrir"
      className={`group relative h-[24rem] overflow-hidden bg-coal text-left text-[#f1ebe1] transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[32rem] ${span} ${v ? "opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: `${(i % 2) * 90}ms` }}
    >
      <Image src={asset(p.cover)} alt={`${p.title}: ${p.kind}`} fill quality={92} sizes="(min-width: 768px) 700px, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      <Image src={asset(second)} alt="" fill quality={92} sizes="(min-width: 768px) 700px, 100vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,18,16,0.88)_100%)]" />
      <span className="absolute left-4 top-4 bg-ink/70 px-2.5 py-1 text-[0.68rem] tracking-[0.12em] uppercase">{p.category}</span>
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <span className="min-w-0">
          <span className="t-display block text-[clamp(1.4rem,2.4vw,2rem)]">{p.title}</span>
          <span className="mt-1 block text-[0.85rem] text-[#f1ebe1]/80">
            {p.kind} · {p.year}
          </span>
        </span>
        <span className="shrink-0 text-right text-[0.75rem] text-[#f1ebe1]/80">
          {p.shots.length} fotos
          {vids ? ` · ${vids} ${vids > 1 ? "vídeos" : "vídeo"}` : ""}
          <span className="mt-2 ml-auto flex h-10 w-10 items-center justify-center bg-copper text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
            <IconRight className="h-4 w-4" />
          </span>
        </span>
      </span>
    </button>
  );
}

/* ---------- visualizador de projeto (fotos grandes + vídeos) ---------- */
type Media = { t: "img"; src: string; tag?: string; note?: string } | { t: "video"; id: string };

export function ProjectViewerHost() {
  const [state, setState] = useState<{ id: string; start: number } | null>(null);
  useEffect(() => {
    const on = (e: Event) => setState((e as CustomEvent<{ id: string; start: number }>).detail);
    window.addEventListener("pr:project", on);
    return () => window.removeEventListener("pr:project", on);
  }, []);
  const close = useCallback(() => setState(null), []);
  return state ? <ProjectViewer key={state.id} id={state.id} start={state.start} onClose={close} /> : null;
}

function ProjectViewer({ id, start, onClose }: { id: string; start: number; onClose: () => void }) {
  const p = byId(id);
  const media: Media[] = [...p.shots.map((s) => ({ t: "img" as const, ...s })), ...(p.videos ?? []).map((v) => ({ t: "video" as const, id: v }))];
  const [i, setI] = useState(start);
  const [info, setInfo] = useState(false);
  const total = media.length;
  const go = useCallback((d: number) => setI((v) => (v + d + total) % total), [total]);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go],
  );
  useLayer(true, onClose, keys);
  const swipe = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-k="${i}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [i]);
  const cur = media[i];
  return (
    <div className="fixed inset-0 z-[70] flex animate-[fadeUp_0.4s_both] flex-col bg-ink text-[#f1ebe1]" role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="flex items-center justify-between gap-3 p-3 md:p-4">
        <BackBtn onClick={onClose} />
        <p className="min-w-0 truncate text-center text-[0.9rem]">
          <span className="t-display text-copper">{p.title}</span>
          <span className="text-[#f1ebe1]/70">
            {" "}
            · {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </p>
        <button type="button" onClick={() => setInfo((v) => !v)} className="btn btn-line py-2 text-[0.72rem]" aria-expanded={info}>
          {info ? "Fechar" : "Sobre"}
        </button>
      </div>
      <div
        className="relative flex-1 touch-pan-y"
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 50 && cur.t === "img") go(dx < 0 ? 1 : -1);
        }}
      >
        {cur.t === "img" ? (
          <div key={cur.src} className="absolute inset-0 flex animate-[fadeUp_0.4s_both] items-center justify-center">
            {/* tamanho real como teto: foto pequena aparece menor, mas nítida, em vez de esticada */}
            <Image src={asset(cur.src)} alt={`${p.title}: ${cur.tag ? cur.tag.toLowerCase() : "foto"} ${i + 1}`} width={sizes[cur.src]?.[0] ?? 1440} height={sizes[cur.src]?.[1] ?? 960} unoptimized className="h-auto max-h-full w-auto max-w-full object-contain" />
            {(cur.tag || cur.note) && (
              <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 text-[0.75rem]">
                {cur.tag && <span className="bg-copper px-2.5 py-1 font-semibold text-ink">{cur.tag}</span>}
                {cur.note && <span className="bg-ink/80 px-2.5 py-1">{cur.note}</span>}
              </span>
            )}
          </div>
        ) : (
          <video key={cur.id} className="absolute inset-0 m-auto max-h-full max-w-full animate-[fadeUp_0.4s_both]" src={asset(`/vid/${cur.id}.mp4`)} poster={asset(`/vid/${cur.id}.webp`)} autoPlay controls playsInline />
        )}
        <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center border border-[#f1ebe1]/30 bg-ink/70 hover:bg-copper hover:text-ink" aria-label="Anterior">
          <IconRight />
        </button>
        <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#f1ebe1]/30 bg-ink/70 hover:bg-copper hover:text-ink" aria-label="Próxima">
          <IconRight />
        </button>
        <aside className={`absolute bottom-0 right-0 top-0 w-full max-w-[24rem] overflow-y-auto border-l border-[#f1ebe1]/10 bg-[#1d1a17]/97 p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${info ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!info}>
          <p className="t-label text-copper">{p.status}</p>
          <h3 className="t-display mt-3 text-[1.9rem]">{p.title}</h3>
          <p className="mt-1 text-[#f1ebe1]/75">
            {p.kind} · {p.place} · {p.year}
          </p>
          <p className="mt-5 leading-relaxed text-[#f1ebe1]/90">{p.text}</p>
          <a href={whatsappLink(`Olá, Laísy! Vi o projeto ${p.title} no site e quero conversar sobre um projeto.`)} target="_blank" rel="noopener noreferrer" className="btn btn-copper mt-6">
            Quero um projeto assim
          </a>
        </aside>
      </div>
      <div ref={strip} className="no-scrollbar flex gap-2 overflow-x-auto p-3 md:p-4 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
        {media.map((m, k) => (
          <button key={k} data-k={k} type="button" onClick={() => setI(k)} className={`relative h-14 w-20 shrink-0 overflow-hidden transition-opacity ${k === i ? "opacity-100 ring-2 ring-copper" : "opacity-45 hover:opacity-90"}`} aria-label={m.t === "img" ? `Foto ${k + 1}` : "Vídeo"}>
            <Image src={asset(m.t === "img" ? m.src : `/vid/${m.id}.webp`)} alt="" fill quality={60} sizes="80px" className="object-cover" />
            {m.t === "video" && <span className="absolute inset-0 flex items-center justify-center bg-ink/40 text-[0.8rem]">▶</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- antes e depois: arrastar a divisória ---------- */
export function BeforeAfter() {
  const [t, setT] = useState(0);
  const [x, setX] = useState(50);
  const [hint, setHint] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  const [ref, v] = useInView<HTMLDivElement>(0.4);
  // ao aparecer, a divisória passeia sozinha uma vez para mostrar que dá para arrastar
  useEffect(() => {
    if (!v || reduced()) return;
    const a = setTimeout(() => setX(22), 300);
    const b = setTimeout(() => setX(78), 1300);
    const c = setTimeout(() => setX(50), 2300);
    return () => [a, b, c].forEach(clearTimeout);
  }, [v, t]);
  const move = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    setHint(false);
  };
  const cur = beforeAfter[t];
  return (
    <div ref={ref}>
      <div
        ref={box}
        className={`relative aspect-[4/5] touch-pan-y overflow-hidden bg-coal select-none sm:aspect-[16/10] ${drag ? "" : "[&_.cut]:transition-[clip-path] [&_.bar]:transition-[left] [&_.cut]:duration-700 [&_.bar]:duration-700"}`}
        onPointerDown={(e) => {
          setDrag(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => drag && move(e.clientX)}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
        data-cursor="Arraste"
      >
        {beforeAfter.map((b, k) => (
          <div key={b.label} className={`absolute inset-0 transition-opacity duration-500 ${k === t ? "opacity-100" : "opacity-0"}`}>
            <Image src={asset(b.before)} alt={`${b.label}: antes`} fill quality={92} sizes="(min-width: 768px) 1160px, 100vw" className="object-cover" draggable={false} />
            <div className="cut absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
              <Image src={asset(b.after)} alt={`${b.label}: depois`} fill quality={92} sizes="(min-width: 768px) 1160px, 100vw" className="object-cover" draggable={false} />
            </div>
          </div>
        ))}
        <div className="bar absolute inset-y-0 w-px bg-[#f1ebe1]" style={{ left: `${x}%` }}>
          <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-copper text-ink shadow-lg">
            <IconRight className="h-3.5 w-3.5 rotate-180" />
            <IconRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <span className="absolute left-3 top-3 bg-ink/80 px-3 py-1 text-[0.72rem] tracking-[0.14em] text-[#f1ebe1] uppercase">Antes</span>
        <span className="absolute right-3 top-3 bg-copper px-3 py-1 text-[0.72rem] font-semibold tracking-[0.14em] text-ink uppercase">Depois</span>
        {hint && <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink/80 px-3 py-1.5 text-[0.75rem] text-[#f1ebe1]">Arraste para comparar</span>}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {beforeAfter.map((b, k) => (
            <button key={b.label} type="button" onClick={() => (setT(k), setX(50))} className={`btn py-2 text-[0.72rem] ${k === t ? "bg-ink text-[#f1ebe1]" : "btn-line"}`}>
              {b.label}
            </button>
          ))}
        </div>
        <p className="text-[0.85rem] text-cream/75">Fotos reais da obra: {cur.label.toLowerCase()} antes e depois.</p>
      </div>
    </div>
  );
}

/* ---------- processo 01 a 04, alternando lados ---------- */
export function Process() {
  return (
    <div className="space-y-14 md:space-y-20">
      {process.map((s, i) => (
        <div key={s.n} className={`grid items-center gap-6 md:grid-cols-12 md:gap-10 `}>
          <RevealImage className={`relative aspect-[4/3] md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
            <Image src={asset(s.img)} alt={s.t} fill quality={92} sizes="(min-width: 768px) 680px, 100vw" className="object-cover" />
          </RevealImage>
          <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:text-right" : ""}`}>
            <span className="t-display block text-[clamp(3.5rem,8vw,6.5rem)] leading-none text-cream/20" aria-hidden>{s.n}</span>
            <h3 className="t-display t-h3 mt-2 text-copper">{s.t}</h3>
            <p className={`mt-3 max-w-[26rem] leading-relaxed text-cream/80 ${i % 2 ? "md:ml-auto" : ""}`}>{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- serviços: lista com seta ---------- */
export function Services() {
  return (
    <ul className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.t}>
          <a href="#contato" className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-5 transition-colors hover:text-copper md:grid-cols-[3rem_1fr_1fr_auto] md:py-6">
            <span className="text-[0.75rem] text-cream/60">0{i + 1}</span>
            <span className="t-display text-[clamp(1.25rem,2.4vw,1.9rem)] transition-transform duration-500 group-hover:translate-x-2">{s.t}</span>
            <span className="text-[0.92rem] text-cream/75 max-md:col-start-2 max-md:row-start-2 max-md:-mt-3">{s.d}</span>
            <span className="flex h-10 w-10 items-center justify-center border border-line transition-colors group-hover:border-copper group-hover:bg-copper group-hover:text-ink max-md:col-start-3 max-md:row-span-2 max-md:row-start-1">
              <IconRight className="h-4 w-4" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---------- vídeos: faixa arrastável de reels ---------- */
export function Reels() {
  const [open, setOpen] = useState<string | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const row = useRef<HTMLDivElement>(null);
  const scrollBy = (d: number) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className="flex h-11 w-11 rotate-180 items-center justify-center border border-line hover:border-copper hover:bg-copper hover:text-ink" aria-label="Vídeos anteriores">
          <IconRight className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className="flex h-11 w-11 items-center justify-center border border-line hover:border-copper hover:bg-copper hover:text-ink" aria-label="Próximos vídeos">
          <IconRight className="h-4 w-4" />
        </button>
      </div>
      <div ref={row} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {videos.map((x) => (
          <ReelCard key={x.id} x={x} onOpen={() => setOpen(x.id)} />
        ))}
      </div>
      {open && <VideoModal id={open} title={videos.find((v) => v.id === open)!.title} onClose={close} />}
    </>
  );
}

function ReelCard({ x, onOpen }: { x: (typeof videos)[number]; onOpen: () => void }) {
  const ref = usePlayInView(0.6);
  return (
    <button type="button" onClick={onOpen} data-cursor="Assistir" className="group relative aspect-[9/16] w-[62vw] max-w-[17rem] shrink-0 snap-start overflow-hidden bg-coal text-left text-[#f1ebe1] sm:w-[15rem]">
      <video ref={ref} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={asset(`/vid/${x.id}-p.mp4`)} poster={asset(`/vid/${x.id}.webp`)} muted loop playsInline preload="none" />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(20,18,16,0.9)_100%)]" />
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-copper text-[0.75rem] text-ink">▶</span>
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="t-label block text-[0.62rem] text-copper">{x.tag}</span>
        <span className="t-display mt-1 block text-[1.15rem]">{x.title}</span>
      </span>
    </button>
  );
}

function VideoModal({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  useLayer(true, onClose);
  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-ink/97 p-4 text-[#f1ebe1]" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <BackBtn onClick={onClose} />
      </div>
      <video className="max-h-[82vh] w-auto max-w-full animate-[fadeUp_0.5s_both]" src={asset(`/vid/${id}.mp4`)} poster={asset(`/vid/${id}.webp`)} autoPlay controls playsInline />
      <p className="t-display text-[1rem]">{title}</p>
    </div>
  );
}

/* ---------- depoimentos: citação grande + foto de projeto ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused || reduced()) return;
    const id = setTimeout(() => setI((v) => (v + 1) % n), 8000);
    return () => clearTimeout(id);
  }, [i, paused, n]);
  const t = testimonials[i];
  return (
    <div className="grid items-stretch gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-coal md:aspect-auto md:min-h-[32rem]">
        {testimonials.map((x, k) => (
          <Image key={x.name} src={asset(x.img)} alt="" fill quality={92} sizes="(min-width: 768px) 480px, 100vw" className={`object-cover transition-[opacity,transform] duration-[1.2s] ${k === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
        ))}
        <span className="absolute bottom-3 left-3 bg-ink/80 px-3 py-1.5 text-[0.72rem] text-[#f1ebe1]">Projeto Pinheiro Rocha</span>
      </div>
      <div className="flex flex-col justify-between">
        <div key={i} className="animate-[fadeUp_0.7s_both]">
          <span className="t-display block text-[5rem] leading-[0.6] text-copper" aria-hidden>
            “
          </span>
          <blockquote className="t-display mt-4 text-[clamp(1.35rem,2.6vw,2.15rem)] leading-[1.25]">{t.text}</blockquote>
          <p className="mt-6 text-[0.95rem]">
            <span className="font-semibold">{t.name}</span> <span className="text-cream/70">· {t.about}</span>
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <button type="button" onClick={() => setI((v) => (v - 1 + n) % n)} className="flex h-11 w-11 rotate-180 items-center justify-center border border-line hover:border-copper hover:bg-copper hover:text-ink" aria-label="Depoimento anterior">
            <IconRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => setI((v) => (v + 1) % n)} className="flex h-11 w-11 items-center justify-center border border-line hover:border-copper hover:bg-copper hover:text-ink" aria-label="Próximo depoimento">
            <IconRight className="h-4 w-4" />
          </button>
          <div className="relative h-px flex-1 bg-line">
            <span className="absolute inset-y-0 left-0 bg-copper transition-[width] duration-500" style={{ width: `${((i + 1) / n) * 100}%` }} />
          </div>
          <span className="text-[0.8rem] tabular-nums text-cream/70">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- formulário que abre o WhatsApp ---------- */
const kinds = ["Projeto arquitetônico", "Fachada", "Interiores", "Espaço comercial", "Projeto online", "Outro"];
export function ContactForm() {
  const [f, setF] = useState({ nome: "", cidade: "", tipo: kinds[0], msg: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((v) => ({ ...v, [k]: e.target.value }));
  const field = "mt-1 w-full border-b border-line bg-transparent py-3 text-[1rem] text-cream outline-none transition-colors placeholder:text-cream/45 focus:border-copper";
  return (
    <form
      className="grid gap-x-6 gap-y-4 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappLink(`Olá, Laísy! Vim pelo site.\nNome: ${f.nome}\nCidade: ${f.cidade}\nProjeto: ${f.tipo}\n${f.msg}`), "_blank", "noopener");
      }}
    >
      <label className="t-label text-[0.65rem] text-cream/70">
        Nome
        <input required value={f.nome} onChange={set("nome")} placeholder="Seu nome" className={`${field} normal-case tracking-normal`} />
      </label>
      <label className="t-label text-[0.65rem] text-cream/70">
        Cidade
        <input required value={f.cidade} onChange={set("cidade")} placeholder="Onde é o projeto" className={`${field} normal-case tracking-normal`} />
      </label>
      <fieldset className="md:col-span-2">
        <legend className="t-label text-[0.65rem] text-cream/70">Tipo de projeto</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button key={k} type="button" onClick={() => setF((v) => ({ ...v, tipo: k }))} aria-pressed={f.tipo === k} className={`btn py-2 text-[0.7rem] ${f.tipo === k ? "bg-copper text-ink" : "btn-line"}`}>
              {k}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="t-label text-[0.65rem] text-cream/70 md:col-span-2">
        Conte um pouco
        <textarea value={f.msg} onChange={set("msg")} rows={3} placeholder="Ambientes, tamanho do terreno, prazo, o que você sonha..." className={`${field} resize-none normal-case tracking-normal`} />
      </label>
      <div className="mt-2 md:col-span-2">
        <button type="submit" className="btn btn-copper w-full justify-center md:w-auto md:px-10">
          <IconWhatsapp className="h-4 w-4" /> Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}

/* ---------- contato rápido: endereço e mapa ---------- */
export function ContactInfo() {
  return (
    <div className="space-y-6 text-[0.95rem]">
      <a href={studio.maps} target="_blank" rel="noopener noreferrer" className="group flex gap-3 hover:text-copper">
        <IconPin className="mt-1 h-4 w-4 shrink-0 text-copper" />
        <span>
          {studio.address}
          <br />
          {studio.city}
          <span className="mt-1 block text-[0.8rem] text-cream/65 group-hover:text-copper">Abrir no Google Maps →</span>
        </span>
      </a>
      <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-copper">
        <IconWhatsapp className="mt-0.5 h-4 w-4 shrink-0 text-copper" /> {studio.whatsappLabel}
      </a>
      <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-copper">
        <IconInstagram className="mt-0.5 h-4 w-4 shrink-0 text-copper" /> {studio.handle}
      </a>
    </div>
  );
}
