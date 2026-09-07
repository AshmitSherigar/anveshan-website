import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Menu,
  MoveUpRight,
  Play,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";

type EventItem = {
  date: string;
  month: string;
  title: string;
  description: string;
  meta: string;
  tone: "indigo" | "paper" | "ink";
};

const events: EventItem[] = [
  {
    date: "18",
    month: "OCT",
    title: "Machine Learning, without the fog",
    description:
      "A friendly, hands-on evening with scikit-learn, small datasets, and the questions that matter before the model.",
    meta: "Workshop · 18:30 · Lab 3",
    tone: "indigo",
  },
  {
    date: "02",
    month: "NOV",
    title: "Build sprint / 24 hours",
    description:
      "Bring a half-formed idea. Leave with something a stranger can click, break, and remember.",
    meta: "Hackathon · 10:00 · Innovation Hall",
    tone: "paper",
  },
];

const notes = [
  {
    number: "01",
    kicker: "Field notes / 04",
    title: "We stopped asking what to build.",
    excerpt:
      "The better question was: who would be quietly delighted if this existed?",
    detail:
      "A short note on choosing constraints for our September build sprint.",
  },
  {
    number: "02",
    kicker: "From the lab / 12",
    title: "The useful prototype is usually the ugly one.",
    excerpt:
      "A working rough edge teaches more than a polished guess ever will.",
    detail:
      "Three things our members learned shipping their first browser extension.",
  },
  {
    number: "03",
    kicker: "Reading list / 08",
    title: "A small internet for curious people.",
    excerpt: "Nine links for making, thinking, and getting unstuck this month.",
    detail:
      "Our monthly collection of tools, essays, and odd little rabbit holes.",
  },
];

const members = [
  {
    initials: "P1",
    name: "PERSON 1",
    role: "systems / third year",
    quote: "I came for the Python sessions. I stayed for the questions after.",
    color: "member-indigo",
  },
  {
    initials: "P2",
    name: "PERSON 2",
    role: "design + hardware / second year",
    quote: "The best projects here start as half a sentence on a whiteboard.",
    color: "member-sand",
  },
  {
    initials: "P3",
    name: "PERSON 3",
    role: "web / final year",
    quote:
      "There is always someone willing to look at the problem from one step sideways.",
    color: "member-lilac",
  },
];

export function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="anveshan-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        .anveshan-page {
          --av-ink: #18181b;
          --av-body: #51525b;
          --av-muted: #a1a1aa;
          --av-line: #e5e5e8;
          --av-base: #fafafa;
          --av-accent: #4f46e5;
          --av-accent-soft: #eef0ff;
          --av-paper: #f6f4ef;
          --av-sans: 'DM Sans', sans-serif;
          --av-display: 'Syne', sans-serif;
          --av-mono: 'DM Mono', monospace;
          min-height: 100dvh;
          background: var(--av-base);
          color: var(--av-ink);
          font-family: var(--av-sans);
          overflow: hidden;
        }
        .anveshan-page * { box-sizing: border-box; }
        .anveshan-page a { color: inherit; text-decoration: none; }
        .av-container { width: min(1160px, calc(100% - 48px)); margin: 0 auto; }
        .av-mono { font-family: var(--av-mono); letter-spacing: .02em; }
        .av-kicker { color: var(--av-accent); font: 500 11px/1.4 var(--av-mono); letter-spacing: .12em; text-transform: uppercase; }
        .av-nav {
          align-items: center; display: flex; height: 82px; justify-content: space-between;
          position: relative; z-index: 20;
        }
        .av-brand { align-items: center; display: inline-flex; gap: 10px; font: 800 20px var(--av-display); letter-spacing: -.04em; }
        .av-mark { align-items: center; background: var(--av-accent); color: white; display: inline-flex; font: 500 12px var(--av-mono); height: 26px; justify-content: center; width: 26px; }
        .av-links { align-items: center; display: flex; gap: 32px; }
        .av-links button, .av-menu-button {
          background: transparent; border: 0; color: var(--av-body); cursor: pointer; font: 500 13px var(--av-mono); padding: 8px 0;
          transition: color .18s ease;
        }
        .av-links button:hover { color: var(--av-accent); }
        .av-nav-cta {
          align-items: center; background: var(--av-ink); border: 1px solid var(--av-ink); color: white; cursor: pointer;
          display: inline-flex; font: 500 12px var(--av-mono); gap: 10px; padding: 12px 15px; transition: transform .18s ease, background .18s ease;
        }
        .av-nav-cta:hover { background: var(--av-accent); border-color: var(--av-accent); transform: translateY(-2px); }
        .av-menu-button { display: none; }
        .av-hero { min-height: 700px; padding: 82px 0 112px; position: relative; }
        .av-hero:before { color: rgba(79,70,229,.07); content: '01 / 04'; font: 500 10px var(--av-mono); left: 0; position: absolute; top: 34px; }
        .av-hero-grid { align-items: end; display: grid; gap: 64px; grid-template-columns: minmax(0, 1.1fr) minmax(350px, .9fr); }
        .av-hero-copy { position: relative; z-index: 2; }
        .av-hero h1 {
          font: 800 clamp(54px, 7vw, 94px)/.93 var(--av-display); letter-spacing: -.075em; margin: 22px 0 30px; max-width: 740px;
        }
        .av-hero h1 em { color: var(--av-accent); font-style: normal; }
        .av-hero-sub { color: var(--av-body); font-size: 18px; line-height: 1.6; margin: 0; max-width: 480px; }
        .av-hero-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 14px; margin-top: 40px; }
        .av-button {
          align-items: center; border: 1px solid var(--av-accent); cursor: pointer; display: inline-flex; font: 500 13px var(--av-mono); gap: 14px;
          justify-content: center; padding: 15px 18px; transition: transform .18s ease, background .18s ease, color .18s ease;
        }
        .av-button-primary { background: var(--av-accent); color: white; }
        .av-button-primary:hover { background: #3d35ca; transform: translateY(-2px); }
        .av-button-ghost { background: transparent; color: var(--av-accent); }
        .av-button-ghost:hover { background: var(--av-accent-soft); transform: translateY(-2px); }
        .av-hero-aside { align-self: end; position: relative; }
        .av-code-card { background: var(--av-ink); color: #d4d4d8; min-height: 320px; overflow: hidden; padding: 25px 25px 22px; position: relative; }
        .av-code-card:after { border: 1px solid rgba(255,255,255,.08); content: ''; height: calc(100% - 24px); left: 12px; position: absolute; top: 12px; width: calc(100% - 24px); }
        .av-code-top { align-items: center; display: flex; justify-content: space-between; margin-bottom: 35px; position: relative; z-index: 1; }
        .av-code-dots { display: flex; gap: 5px; }
        .av-code-dots i { background: #71717a; display: block; height: 6px; width: 6px; }
        .av-code-label { color: #a5b4fc; font: 11px var(--av-mono); }
        .av-code-lines { font: 13px/2 var(--av-mono); position: relative; z-index: 1; }
        .av-code-lines > span { display: block; white-space: nowrap; }
        .av-code-lines .line-no { color: #52525b; display: inline-block; text-align: right; width: 25px; }
        .av-code-lines .purple { color: #a5b4fc; }.av-code-lines .green { color: #86efac; }.av-code-lines .cream { color: #fde68a; }
        .av-orbit { align-items: center; border: 1px solid rgba(79,70,229,.3); display: flex; height: 136px; justify-content: center; position: absolute; right: -38px; top: -58px; transform: rotate(22deg); width: 210px; }
        .av-orbit:after { background: var(--av-accent); content: ''; height: 8px; position: absolute; right: 24px; top: 8px; width: 8px; }
        .av-hero-note { color: var(--av-muted); font: 11px/1.5 var(--av-mono); margin-top: 16px; max-width: 280px; }
        .av-scroll { align-items: center; bottom: 30px; color: var(--av-muted); display: flex; font: 10px var(--av-mono); gap: 12px; left: 50%; position: absolute; transform: translateX(-50%); white-space: nowrap; }
        .av-scroll svg { animation: av-bob 1.8s ease-in-out infinite; }
        @keyframes av-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(4px) } }
        .av-rule { border: 0; border-top: 1px solid var(--av-line); margin: 0; }
        .av-section { padding: 126px 0; }
        .av-section-head { align-items: end; display: flex; justify-content: space-between; margin-bottom: 54px; }
        .av-section-title { font: 700 clamp(32px, 4vw, 50px)/1.02 var(--av-display); letter-spacing: -.055em; margin: 16px 0 0; max-width: 550px; }
        .av-section-intro { color: var(--av-body); font-size: 15px; line-height: 1.7; margin: 0; max-width: 290px; }
        .av-event-grid { display: grid; gap: 18px; grid-template-columns: 1.15fr .85fr; }
        .av-event { border: 1px solid var(--av-line); min-height: 322px; padding: 26px; position: relative; transition: border-color .18s ease, transform .22s ease; }
        .av-event:hover { border-color: var(--av-accent); transform: translateY(-4px); }
        .av-event-indigo { background: var(--av-accent); color: white; border-color: var(--av-accent); }
        .av-event-paper { background: var(--av-paper); }
        .av-event-ink { background: var(--av-ink); color: white; }
        .av-event-date { align-items: baseline; display: flex; gap: 9px; }
        .av-event-date strong { font: 700 48px/.9 var(--av-display); letter-spacing: -.08em; }
        .av-event-date span { font: 500 11px var(--av-mono); letter-spacing: .12em; }
        .av-event h3 { font: 700 25px/1.08 var(--av-display); letter-spacing: -.04em; margin: 52px 0 12px; max-width: 320px; }
        .av-event p { color: inherit; font-size: 14px; line-height: 1.65; margin: 0; max-width: 390px; opacity: .72; }
        .av-event-meta { bottom: 25px; font: 11px var(--av-mono); left: 26px; opacity: .6; position: absolute; }
        .av-event-arrow { position: absolute; right: 26px; top: 27px; }
        .av-view-link { align-items: center; color: var(--av-accent); display: inline-flex; font: 500 12px var(--av-mono); gap: 10px; padding-bottom: 5px; border-bottom: 1px solid var(--av-accent); transition: gap .18s ease; }
        .av-view-link:hover { gap: 16px; }
        .av-statement { background: var(--av-ink); color: white; overflow: hidden; padding: 124px 0; position: relative; }
        .av-statement:before { color: rgba(255,255,255,.035); content: '{ curiosity: true }'; font: 800 clamp(60px, 15vw, 190px)/1 var(--av-display); left: -18px; position: absolute; top: 38px; white-space: nowrap; }
        .av-statement-inner { position: relative; z-index: 1; }
        .av-statement h2 { font: 700 clamp(42px, 6.6vw, 84px)/.98 var(--av-display); letter-spacing: -.07em; margin: 22px 0 36px; max-width: 840px; }
        .av-statement h2 span { color: #a5b4fc; }
        .av-statement p { color: #a1a1aa; font-size: 16px; line-height: 1.65; max-width: 460px; }
        .av-members-layout { display: grid; gap: 72px; grid-template-columns: .72fr 1.28fr; }
        .av-members-copy { align-self: start; position: sticky; top: 30px; }
        .av-members-copy p { color: var(--av-body); font-size: 15px; line-height: 1.7; margin: 26px 0 0; max-width: 270px; }
        .av-member-list { border-top: 1px solid var(--av-line); }
        .av-member { align-items: center; border-bottom: 1px solid var(--av-line); display: grid; gap: 20px; grid-template-columns: 66px 1fr auto; padding: 22px 0; }
        .av-avatar { align-items: center; display: flex; font: 500 13px var(--av-mono); height: 66px; justify-content: center; width: 66px; }
        .member-indigo { background: var(--av-accent-soft); color: var(--av-accent); }.member-sand { background: #ede8dc; color: #77684d; }.member-lilac { background: #ece8f5; color: #6d5ba0; }
        .av-member h3 { font: 700 20px var(--av-display); letter-spacing: -.035em; margin: 0 0 5px; }
        .av-member-role { color: var(--av-muted); font: 10px var(--av-mono); text-transform: uppercase; letter-spacing: .08em; }
        .av-member-quote { color: var(--av-body); font-size: 13px; line-height: 1.5; margin: 0; max-width: 250px; text-align: right; }
        .av-notes { background: var(--av-paper); }
        .av-notes-grid { display: grid; gap: 0; grid-template-columns: repeat(3, 1fr); }
        .av-note { border-left: 1px solid #dcd9d0; min-height: 320px; padding: 0 28px; transition: background .18s ease; }
        .av-note:first-child { padding-left: 0; border-left: 0; }.av-note:hover { background: rgba(255,255,255,.55); }
        .av-note-number { color: var(--av-accent); font: 500 12px var(--av-mono); }
        .av-note h3 { font: 700 25px/1.12 var(--av-display); letter-spacing: -.05em; margin: 52px 0 20px; max-width: 260px; }
        .av-note-excerpt { color: var(--av-body); font-size: 14px; line-height: 1.65; margin: 0; max-width: 260px; }
        .av-note-trigger { background: transparent; border: 0; border-bottom: 1px solid var(--av-accent); color: var(--av-accent); cursor: pointer; font: 500 11px var(--av-mono); margin-top: 24px; padding: 0 0 4px; }
        .av-note-detail { color: var(--av-body); font-size: 13px; line-height: 1.6; margin: 18px 0 0; max-width: 270px; }
        .av-join { padding: 132px 0 144px; position: relative; }
        .av-join-grid { align-items: end; display: grid; gap: 60px; grid-template-columns: 1fr .8fr; }
        .av-join h2 { font: 700 clamp(42px, 6.5vw, 76px)/.96 var(--av-display); letter-spacing: -.07em; margin: 18px 0 30px; max-width: 660px; }
        .av-join h2 em { color: var(--av-accent); font-style: normal; }
        .av-join-aside { border-left: 1px solid var(--av-line); padding-left: 26px; }
        .av-join-aside p { color: var(--av-body); font-size: 15px; line-height: 1.7; margin: 0 0 25px; }
        .av-join-aside span { color: var(--av-muted); display: block; font: 11px var(--av-mono); margin-top: 18px; }
        .av-footer { background: var(--av-ink); color: white; padding: 48px 0 32px; }
        .av-footer-main { align-items: start; display: grid; gap: 40px; grid-template-columns: 1.2fr .8fr .8fr; }
        .av-footer .av-brand { color: white; }.av-footer-tag { color: #a1a1aa; font-size: 13px; line-height: 1.6; margin-top: 17px; max-width: 220px; }
        .av-footer h4 { color: #71717a; font: 500 10px var(--av-mono); letter-spacing: .1em; margin: 2px 0 18px; text-transform: uppercase; }
        .av-footer-links { display: flex; flex-direction: column; gap: 11px; }.av-footer-links button, .av-footer-links a { background: transparent; border: 0; color: #d4d4d8; cursor: pointer; font: 13px var(--av-sans); padding: 0; text-align: left; transition: color .18s ease; }.av-footer-links button:hover, .av-footer-links a:hover { color: #a5b4fc; }
        .av-footer-bottom { align-items: center; border-top: 1px solid #303035; color: #71717a; display: flex; font: 10px var(--av-mono); justify-content: space-between; margin-top: 70px; padding-top: 22px; }
        .av-social { display: flex; gap: 14px; }.av-social a { color: #a1a1aa; transition: color .18s ease, transform .18s ease; }.av-social a:hover { color: white; transform: translateY(-2px); }
        .av-reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }.av-reveal.is-visible { opacity: 1; transform: translateY(0); }
        .av-delay-1 { transition-delay: .08s; }.av-delay-2 { transition-delay: .16s; }.av-delay-3 { transition-delay: .24s; }
        .av-toast { align-items: center; background: var(--av-ink); bottom: 22px; color: white; display: flex; font: 12px var(--av-mono); gap: 10px; left: 50%; padding: 14px 17px; position: fixed; transform: translateX(-50%); z-index: 50; }
        .av-mobile-menu { background: var(--av-base); border-bottom: 1px solid var(--av-line); display: none; left: 0; padding: 8px 24px 24px; position: absolute; right: 0; top: 81px; z-index: 10; }
        .av-mobile-menu button { background: transparent; border: 0; border-bottom: 1px solid var(--av-line); color: var(--av-ink); display: block; font: 500 13px var(--av-mono); padding: 16px 0; text-align: left; width: 100%; }
        @media (max-width: 780px) {
          .av-container { width: min(100% - 36px, 580px); }.av-links, .av-nav-cta { display: none; }.av-menu-button { display: inline-flex; }
          .av-mobile-menu.open { display: block; }.av-hero { min-height: 700px; padding-top: 50px; }.av-hero:before { display: none; }.av-hero-grid, .av-event-grid, .av-members-layout, .av-join-grid { grid-template-columns: 1fr; gap: 45px; }.av-hero h1 { font-size: clamp(52px, 16vw, 84px); }.av-hero-aside { margin-top: 8px; }.av-code-card { min-height: 300px; }.av-section { padding: 88px 0; }.av-section-head { align-items: start; flex-direction: column; gap: 24px; margin-bottom: 35px; }.av-event { min-height: 310px; }.av-statement { padding: 90px 0; }.av-members-copy { position: static; }.av-member { align-items: start; grid-template-columns: 55px 1fr; }.av-avatar { height: 55px; width: 55px; }.av-member-quote { grid-column: 2; text-align: left; }.av-notes-grid { grid-template-columns: 1fr; }.av-note, .av-note:first-child { border-bottom: 1px solid #dcd9d0; border-left: 0; min-height: auto; padding: 30px 0; }.av-note h3 { margin-top: 30px; }.av-join { padding: 90px 0; }.av-join-aside { border-left: 0; border-top: 1px solid var(--av-line); padding: 24px 0 0; }.av-footer-main { grid-template-columns: 1fr 1fr; }.av-footer-main > :first-child { grid-column: 1 / -1; }.av-footer-bottom { align-items: start; flex-direction: column; gap: 18px; margin-top: 48px; }
        }
        @media (prefers-reduced-motion: reduce) { .av-reveal, .av-reveal.is-visible, .av-scroll svg { animation: none; transition: none; transform: none; } }
      `}</style>

      <header className="av-container">
        <nav className="av-nav">
          <button
            className="av-brand"
            onClick={() => scrollTo("top")}
            aria-label="Back to top"
          >
            <span className="av-mark">A/</span>
            <span>Anveshan</span>
          </button>
          <div className="av-links">
            <button onClick={() => scrollTo("events")}>Calendar</button>
            <button onClick={() => scrollTo("members")}>People</button>
            <button onClick={() => scrollTo("notes")}>Notes</button>
          </div>
          <button className="av-nav-cta" onClick={() => scrollTo("join")}>
            Join the club <ArrowRight size={14} />
          </button>
          <button
            className="av-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
        <div className={`av-mobile-menu ${menuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("events")}>Calendar</button>
          <button onClick={() => scrollTo("members")}>People</button>
          <button onClick={() => scrollTo("notes")}>Notes</button>
          <button onClick={() => scrollTo("join")}>Join the club</button>
        </div>
      </header>

      <section className="av-hero av-container" id="top">
        <div className="av-hero-grid">
          <div className="av-hero-copy av-reveal is-visible">
            <div className="av-kicker">Student tech club / est. 2019</div>
            <h1>
              Curious minds.
              <br />
              <em>Working code.</em>
            </h1>
            <p className="av-hero-sub">
              Anveshan is a small, welcoming corner of campus for people who
              like to take things apart, make them better, and show their work.
            </p>
            <div className="av-hero-actions">
              <button
                className="av-button av-button-primary"
                onClick={() => scrollTo("events")}
              >
                See what&apos;s next <ArrowRight size={15} />
              </button>
              <button
                className="av-button av-button-ghost"
                onClick={() => scrollTo("about")}
              >
                Our approach <ArrowDown size={15} />
              </button>
            </div>
          </div>
          <div className="av-hero-aside av-reveal av-delay-2 is-visible">
            <div className="av-code-card">
              <div className="av-code-top">
                <div className="av-code-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="av-code-label">anveshan / now</span>
              </div>
              <div className="av-code-lines">
                <span>
                  <b className="line-no">01</b>{" "}
                  <span className="purple">const</span> club ={" "}
                  <span className="green">await</span> gather();
                </span>
                <span>
                  <b className="line-no">02</b>{" "}
                </span>
                <span>
                  <b className="line-no">03</b> club.
                  <span className="cream">make</span>(
                  <span className="green">&quot;something useful&quot;</span>);
                </span>
                <span>
                  <b className="line-no">04</b> club.
                  <span className="cream">share</span>({`{`} notes, demos {`}`}
                  );
                </span>
                <span>
                  <b className="line-no">05</b>{" "}
                </span>
                <span>
                  <b className="line-no">06</b>{" "}
                  <span className="purple">return</span>{" "}
                  <span className="green">curiosity</span>;
                </span>
              </div>
              <div className="av-orbit" />
            </div>
            <div className="av-hero-note">
              A club for the in-between stage — after the tutorial, before the
              startup.
            </div>
          </div>
        </div>
        <div className="av-scroll">
          <ArrowDown size={13} /> Scroll to explore
        </div>
      </section>

      <section className="av-section" id="events">
        <div className="av-container">
          <div className="av-section-head av-reveal">
            <div>
              <div className="av-kicker">On the calendar / 02</div>
              <h2 className="av-section-title">
                Come for a session.
                <br />
                Stay for the side quest.
              </h2>
            </div>
            <p className="av-section-intro">
              No gatekeeping, no obligatory jargon. Just good prompts, useful
              people, and a little room to try.
            </p>
          </div>
          <div className="av-event-grid">
            {events.map((event, index) => (
              <article
                className={`av-event av-event-${event.tone} av-reveal av-delay-${index + 1}`}
                data-reveal
                key={event.title}
              >
                <div className="av-event-date">
                  <strong>{event.date}</strong>
                  <span>{event.month}</span>
                </div>
                <MoveUpRight className="av-event-arrow" size={20} />
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="av-event-meta">{event.meta}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="av-statement" id="about">
        <div className="av-container av-statement-inner av-reveal" data-reveal>
          <div className="av-kicker">The short version</div>
          <h2>
            Learn in public.
            <br />
            <span>Make room for better questions.</span>
          </h2>
          <p>
            Anveshan is student-led and deliberately small. We trade polished
            answers for generous feedback, and follow interesting problems
            further than the syllabus usually allows.
          </p>
          <button
            className="av-button av-button-ghost"
            style={{ marginTop: 28, borderColor: "#a5b4fc", color: "#a5b4fc" }}
            onClick={() => scrollTo("join")}
          >
            Find your people <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="av-section" id="members">
        <div className="av-container">
          <div className="av-members-layout">
            <div className="av-members-copy av-reveal" data-reveal>
              <div className="av-kicker">People / 24 active members</div>
              <h2 className="av-section-title">
                Not a network.
                <br />A table.
              </h2>
              <p>
                Everyone brings a different unfinished thing. That is the point.
                Meet the people making the club what it is.
              </p>
            </div>
            <div className="av-member-list av-reveal av-delay-1" data-reveal>
              {members.map((member) => (
                <article className="av-member" key={member.name}>
                  <div className={`av-avatar ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3>{member.name}</h3>
                    <div className="av-member-role">{member.role}</div>
                  </div>
                  <p className="av-member-quote">&quot;{member.quote}&quot;</p>
                </article>
              ))}
              <button
                className="av-view-link"
                style={{
                  marginTop: 26,
                  background: "transparent",
                  border: 0,
                  borderBottom: "1px solid var(--av-accent)",
                  cursor: "pointer",
                }}
                onClick={() => setJoined(true)}
              >
                Meet more makers <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="av-section av-notes" id="notes">
        <div className="av-container">
          <div className="av-section-head av-reveal" data-reveal>
            <div>
              <div className="av-kicker">Updates / writing / links</div>
              <h2 className="av-section-title">
                A few things
                <br />
                we&apos;ve been thinking about.
              </h2>
            </div>
            <button className="av-view-link" onClick={() => setSelectedNote(0)}>
              Read all notes <ArrowRight size={14} />
            </button>
          </div>
          <div className="av-notes-grid">
            {notes.map((note, index) => (
              <article
                className={`av-note av-reveal av-delay-${index + 1}`}
                data-reveal
                key={note.number}
              >
                <div className="av-note-number">
                  {note.number} — {note.kicker}
                </div>
                <h3>{note.title}</h3>
                <p className="av-note-excerpt">{note.excerpt}</p>
                <button
                  className="av-note-trigger"
                  onClick={() =>
                    setSelectedNote(selectedNote === index ? null : index)
                  }
                >
                  {selectedNote === index ? "Close note" : "Open note"}{" "}
                  <ChevronRight size={12} style={{ verticalAlign: "middle" }} />
                </button>
                {selectedNote === index && (
                  <p className="av-note-detail">{note.detail}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="av-join" id="join">
        <div className="av-container av-join-grid">
          <div className="av-reveal" data-reveal>
            <div className="av-kicker">Open invitation</div>
            <h2>
              Bring a question.
              <br />
              <em>Leave with a start.</em>
            </h2>
            <button
              className="av-button av-button-primary"
              onClick={() => setJoined(true)}
            >
              {joined ? "You are on the list" : "I want to join"}{" "}
              {joined ? <Check size={15} /> : <ArrowRight size={15} />}
            </button>
          </div>
          <div className="av-join-aside av-reveal av-delay-2" data-reveal>
            <p>
              We meet every Thursday at 6:30 in the old media lab. You do not
              need a portfolio, a team, or a perfect idea.
            </p>
            <div className="av-kicker">Next open table</div>
            <span>Thursday · 06:30 PM · Media Lab 2</span>
          </div>
        </div>
      </section>

      <footer className="av-footer">
        <div className="av-container">
          <div className="av-footer-main">
            <div>
              <div className="av-brand">
                <span className="av-mark">A/</span>
                <span>Anveshan</span>
              </div>
              <p className="av-footer-tag">
                A student tech club for people who keep asking “what if?”
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <div className="av-footer-links">
                <button onClick={() => scrollTo("events")}>Calendar</button>
                <button onClick={() => scrollTo("members")}>People</button>
                <button onClick={() => scrollTo("notes")}>Notes</button>
              </div>
            </div>
            <div>
              <h4>Find us</h4>

<div className="av-footer-links">
  <a
    href="https://github.com"
    target="_blank"
    rel="noreferrer"
  >
    <ExternalLink
      size={14}
      style={{ verticalAlign: "middle", marginRight: 8 }}
    />
    GitHub
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
  >
    <ExternalLink
      size={14}
      style={{ verticalAlign: "middle", marginRight: 8 }}
    />
    LinkedIn
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noreferrer"
  >
    <ExternalLink
      size={14}
      style={{ verticalAlign: "middle", marginRight: 8 }}
    />
    Instagram
  </a>
</div>
            </div>
          </div>
          <div className="av-footer-bottom">
            <span>© 2025 Anveshan / built by the club</span>
            <span className="av-mono">NO BIG DEAL, JUST GOOD WORK.</span>
          </div>
        </div>
      </footer>
      {joined && (
        <div className="av-toast">
          <Check size={15} color="#a5b4fc" /> Nice. We&apos;ll save you a seat
          at the next table.{" "}
          <button
            onClick={() => setJoined(false)}
            style={{
              background: "transparent",
              border: 0,
              color: "#a1a1aa",
              cursor: "pointer",
              marginLeft: 8,
            }}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </main>
  );
}

export default Landing;
