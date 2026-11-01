import Image from "next/image";
import { Cursor, SmoothScroll, Split } from "@/components/FX";
import { BackButton } from "@/components/Nav";
import { Counter, Reveal } from "@/components/Reveal";
import { BeforeAfter, ContactForm, ContactInfo, Featured, Header, Hero, Manifesto, Pinha, Portfolio, Process, ProjectViewerHost, Reels, Services, Testimonials } from "@/components/Site";
import { nav, stats, story, studio } from "@/lib/data";
import { asset } from "@/lib/base-path";
import { wrap } from "@/lib/ui";

function Head({ label, title, text, light = false }: { label: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className={`t-label ${light ? "text-sand" : "text-copper"}`}>{label}</p>
      <Split text={title} className="t-display t-h1 mt-4 max-w-[46rem]" />
      {text && <p className="mt-4 max-w-[36rem] text-[1rem] leading-relaxed text-cream/80">{text}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <BackButton />
      <Header />
      <ProjectViewerHost />
      <main>
        <Hero />

        <section className="py-20 md:py-32">
          <div className={wrap}>
            <Manifesto />
          </div>
        </section>

        <section id="destaques" data-title="Destaques" aria-label="Projetos em destaque">
          <div className={`${wrap} pb-12 text-center md:pb-16`}>
            <p className="t-label text-copper">Projetos selecionados</p>
            <Split text="Do projeto à *obra pronta*" className="t-display t-h1 mx-auto mt-4" />
          </div>
          <Featured />
        </section>

        <section className="relative z-10 border-y border-line bg-night py-14 md:py-20">
          <div className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4`}>
            {stats.map((s) => (
              <Reveal key={s.label} className="border-l border-line pl-4 md:pl-6">
                <p className="t-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-none text-copper">
                  {s.prefix}
                  <Counter value={s.value} decimals={s.decimals ?? 0} />
                  <span className="text-[0.55em]">{s.suffix}</span>
                </p>
                <p className="mt-3 text-[0.85rem] leading-snug text-cream/75">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projetos" data-title="Projetos" className="relative z-10 bg-night py-20 md:py-28">
          <div className={wrap}>
            <Head label="Portfólio" title="Todos os *projetos*" text="Clínicas, academia, padaria, casas, suítes e fachadas. Clique em um projeto para ver todas as fotos em tamanho grande, os vídeos e o antes." />
            <Portfolio />
          </div>
        </section>

        <section id="antes-depois" data-title="Antes e depois" className="tone-light py-20 md:py-28">
          <div className={wrap}>
            <Head label="Antes e depois" title="O que era e o que *virou*" text="Fotos tiradas do mesmo ponto, antes e depois da obra. Arraste a divisória." light />
            <BeforeAfter />
          </div>
        </section>

        <section id="processo" data-title="Processo" className="py-20 md:py-28">
          <div className={wrap}>
            <Head label="Processo" title="Como o seu projeto *acontece*" />
            <Process />
          </div>
        </section>

        <section id="servicos" data-title="Serviços" className="py-20 md:py-28">
          <div className={`${wrap} grid gap-10 md:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <p className="t-label text-copper">Serviços</p>
              <h2 className="t-display t-h1 mt-4">
                Arquitetura que cabe na <span className="text-copper">sua rotina.</span>
              </h2>
              <p className="mt-4 max-w-[24rem] leading-relaxed text-cream/80">Do projeto completo da casa a uma recepção que muda sem quebra-quebra. Presencial ou online.</p>
            </div>
            <Services />
          </div>
        </section>

        <section id="videos" data-title="Vídeos" className="overflow-hidden py-20 md:py-28">
          <div className={wrap}>
            <Head label="Vídeos" title="Obras em *movimento*" text="Os antes e depois que a Laísy mostra no Instagram. Toque para assistir com som." />
            <Reels />
          </div>
        </section>

        <section id="depoimentos" data-title="Depoimentos" className="py-20 md:py-28">
          <div className={wrap}>
            <Head label="Depoimentos" title="Quem já mora, trabalha e *recebe* nos projetos" />
            <Testimonials />
          </div>
        </section>

        <section id="sobre" data-title="Sobre" className="tone-light py-20 md:py-28">
          <div className={`${wrap} grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16`}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                <Image src={asset("/img/laisy.webp")} alt="A arquiteta Laísy Pinheiro Rocha" fill quality={90} sizes="(min-width: 768px) 500px, 100vw" className="object-cover object-[60%_30%]" />
              </div>
              <figure className="absolute -bottom-8 right-4 w-[42%] border-4 border-paper bg-paper shadow-xl md:-right-8">
                <div className="relative aspect-[3/4]">
                  <Image src={asset("/img/premio-palco.webp")} alt="Laísy no palco do Prêmio Melhores do Ano 2025" fill quality={82} sizes="220px" className="object-cover" />
                </div>
                <figcaption className="px-2 py-2 text-[0.7rem] leading-snug text-cream/80">1º lugar · Arquiteta · Melhores do Ano 2025</figcaption>
              </figure>
            </div>
            <div className="max-md:pt-6">
              <p className="t-label text-sand">Sobre</p>
              <h2 className="t-display t-h1 mt-4">
                Laísy Pinheiro Rocha, <span className="text-sand">arquiteta.</span>
              </h2>
              <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-cream/85">
                {story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <blockquote className="t-display mt-8 border-l-2 border-copper pl-5 text-[clamp(1.2rem,2vw,1.55rem)] leading-snug">Hoje eu sei: eu resolvo, eu transformo, eu entrego.</blockquote>
              <ul className="mt-8 grid gap-3 text-[0.9rem] sm:grid-cols-3">
                {["Graduada pela UFJF", "+250 projetos", "Eleita pelos clientes em 2025"].map((x) => (
                  <li key={x} className="border-t border-line pt-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contato" data-title="Contato" className="py-20 md:py-28">
          <div className={`${wrap} grid gap-12 md:grid-cols-[0.8fr_1.2fr]`}>
            <div>
              <p className="t-label text-copper">Contato</p>
              <Split text="Vamos começar o *seu projeto?*" className="t-display t-h1 mt-4" />
              <p className="mt-4 max-w-[24rem] leading-relaxed text-cream/80">Preencha e a mensagem abre pronta no WhatsApp da Laísy.</p>
              <div className="mt-10">
                <ContactInfo />
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="overflow-hidden border-t border-line">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]`}>
          <div>
            <Pinha className="h-12 w-auto" />
            <p className="mt-4 max-w-[20rem] text-[0.92rem] text-cream/75">{studio.slogan}</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="t-label text-[0.62rem] text-cream/60">Navegue</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-[0.92rem]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-copper">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-[0.92rem]">
            <p className="t-label text-[0.62rem] text-cream/60">Escritório</p>
            <p className="mt-4 text-cream/85">
              {studio.address}
              <br />
              {studio.city}
            </p>
            <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 block hover:text-copper">
              {studio.whatsappLabel}
            </a>
          </div>
        </div>
        <div className={`${wrap} select-none`} aria-hidden>
          <p className="t-display whitespace-nowrap text-center text-[clamp(2.2rem,10.5vw,8.6rem)] leading-[0.9] text-cream/10">Pinheiro Rocha</p>
        </div>
        <div className={`${wrap} flex flex-wrap justify-between gap-3 border-t border-line py-5 text-[0.78rem] text-cream/65`}>
          <p>© 2026 {studio.full}</p>
          <a href="#inicio" className="hover:text-cream">
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </>
  );
}
