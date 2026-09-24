"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type DashboardView = "overview" | "trends" | "referrals" | "outcomes";

const ArrowRight = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUpRight = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const House = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m3 11 9-7 9 7v9H3v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const Users = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const Heart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

const Clipboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 4.5A2.5 2.5 0 0 1 11.5 2h1A2.5 2.5 0 0 1 15 4.5V6H9V4.5Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 11h6M9 15h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="m8 12 2.6 2.6L16.5 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Clock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const ShieldHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.6 3 8.9 7 10 4-1.1 7-5.4 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M15.7 9.4a2.1 2.1 0 0 0-3 0l-.7.7-.7-.7a2.1 2.1 0 0 0-3 3l.7.7 3 2.9 3-2.9.7-.7a2.1 2.1 0 0 0 0-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const Leaf = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 10-6 10-15Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M4 20c3-5 7-8 12-10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const Voice = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const personas = [
  ["Community health workers", "Keep the visit moving, remember what matters, and make the next step in care easier to follow."],
  ["Supervisors & facility teams", "See where follow-up is due, where referrals are waiting, and where teams may need support."],
  ["County & national health teams", "Understand service reach, care gaps, and emerging patterns without losing sight of data quality."],
  ["Delivery NGOs & partners", "Coordinate programmes around real care journeys rather than disconnected activity counts."],
  ["Funders & evaluators", "Review clearly defined outcomes with context, caveats, and an evidence trail for independent review."],
];

const journey = [
  ["01", "Listen", "A community health worker visits a household, listens to the person’s concern, and explains the support available."],
  ["02", "Record & support", "The worker captures the concern and receives approved supportive guidance, even when signal is unreliable."],
  ["03", "Connect", "When more help is needed, the person is linked to an appropriate referral or service."],
  ["04", "Follow up", "The team checks whether care was reached and what still needs attention."],
  ["05", "Learn", "Partners review what changed and where care journeys are still breaking down — not just how many activities happened."],
];

const referrals = [
  { household: "Household #A214", support: "Primary care", status: "Confirmed received", due: "Completed" },
  { household: "Household #B083", support: "Wellbeing support", status: "Follow-up due", due: "Tomorrow" },
  { household: "Household #C119", support: "NCD review", status: "Referred", due: "In 2 days" },
  { household: "Household #D041", support: "Primary care", status: "Confirmed received", due: "Completed" },
  { household: "Household #E167", support: "Wellbeing support", status: "Follow-up due", due: "Today" },
];

const trendData = [
  { label: "W1", wellbeing: 18, ncd: 12 },
  { label: "W2", wellbeing: 22, ncd: 15 },
  { label: "W3", wellbeing: 29, ncd: 18 },
  { label: "W4", wellbeing: 31, ncd: 22 },
  { label: "W5", wellbeing: 37, ncd: 25 },
  { label: "W6", wellbeing: 34, ncd: 28 },
];

const dashboardTabs: { id: DashboardView; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "trends", label: "Care trends" },
  { id: "referrals", label: "Referrals & follow-up" },
  { id: "outcomes", label: "Outcomes" },
];

function MiniTrend({ values }: { values: number[] }) {
  const points = values
    .map((value, index) => `${index * 28},${42 - ((value - Math.min(...values)) / Math.max(1, Math.max(...values) - Math.min(...values))) * 30}`)
    .join(" ");
  return (
    <svg className="mini-trend" viewBox="0 0 140 48" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DemoTag({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "demo-tag compact" : "demo-tag"}>Sample data for illustration</span>;
}

function DashboardOverview() {
  return (
    <div className="dashboard-view">
      <div className="dashboard-view-head">
        <div>
          <span className="dashboard-kicker">Mwangaza County · fictional demo area</span>
          <h4>September overview</h4>
        </div>
        <div className="freshness"><span /> Data freshness: 18 min</div>
      </div>

      <div className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-icon"><House /></div>
          <span>Households visited</span>
          <strong>126</strong>
          <div className="kpi-foot"><span>+11 this week</span><MiniTrend values={[12, 16, 18, 21, 25, 28]} /></div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon"><Users /></div>
          <span>Coverage this month</span>
          <strong>68%</strong>
          <div className="kpi-progress"><i style={{ width: "68%" }} /></div>
          <small>of the illustrative monthly visit plan</small>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon"><Clipboard /></div>
          <span>Referrals pending</span>
          <strong>9</strong>
          <div className="kpi-foot"><span>3 due today</span><MiniTrend values={[14, 13, 12, 10, 11, 9]} /></div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon"><Heart /></div>
          <span>NCD follow-ups</span>
          <strong>28</strong>
          <div className="kpi-foot"><span>this week</span><MiniTrend values={[12, 15, 18, 22, 25, 28]} /></div>
        </article>
      </div>

      <div className="dashboard-lower-grid">
        <article className="panel-card">
          <div className="panel-title-row">
            <div><span className="eyebrow-small">Care activity</span><h5>What teams are seeing</h5></div>
            <span className="quiet-chip">Last 6 weeks</span>
          </div>
          <div className="activity-bars">
            {[
              ["Household visits", 84],
              ["Wellbeing conversations", 58],
              ["NCD follow-ups", 64],
              ["Referral follow-ups", 42],
            ].map(([label, value]) => (
              <div className="activity-row" key={String(label)}>
                <div><span>{label}</span><b>{value}</b></div>
                <div className="activity-track"><i style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card attention-card">
          <div className="panel-title-row">
            <div><span className="eyebrow-small">Needs attention</span><h5>Follow-up queue</h5></div>
            <span className="count-badge">6</span>
          </div>
          <div className="attention-list">
            <div><span className="attention-dot gold" /><p><b>3 referrals</b><small>due for confirmation today</small></p><Clock /></div>
            <div><span className="attention-dot blue" /><p><b>2 households</b><small>scheduled for repeat NCD follow-up</small></p><Heart /></div>
            <div><span className="attention-dot green" /><p><b>1 wellbeing case</b><small>follow-up conversation due tomorrow</small></p><CheckCircle /></div>
          </div>
        </article>
      </div>
    </div>
  );
}

function DashboardTrends() {
  const max = 40;
  return (
    <div className="dashboard-view">
      <div className="dashboard-view-head">
        <div>
          <span className="dashboard-kicker">Mwangaza County · fictional demo area</span>
          <h4>Care trends</h4>
        </div>
        <div className="legend"><span><i className="legend-green" /> Wellbeing screenings</span><span><i className="legend-blue" /> NCD follow-ups</span></div>
      </div>

      <article className="panel-card chart-panel">
        <div className="chart-axis-label">Illustrative weekly activity</div>
        <div className="bar-chart" role="img" aria-label="Illustrative six week bar chart of wellbeing screenings and NCD follow-ups">
          <div className="y-grid"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div>
          <div className="bar-chart-columns">
            {trendData.map((row) => (
              <div className="bar-group" key={row.label}>
                <div className="bars">
                  <i className="bar bar-green" style={{ height: `${(row.wellbeing / max) * 100}%` }} title={`${row.wellbeing} wellbeing screenings`} />
                  <i className="bar bar-blue" style={{ height: `${(row.ncd / max) * 100}%` }} title={`${row.ncd} NCD follow-ups`} />
                </div>
                <span>{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="trend-insight-grid">
        <article className="panel-card insight-card"><span className="insight-icon green"><Heart /></span><div><b>Wellbeing conversations</b><strong>34</strong><small>illustrative activity in the latest week</small></div></article>
        <article className="panel-card insight-card"><span className="insight-icon blue"><Clipboard /></span><div><b>NCD follow-ups</b><strong>28</strong><small>illustrative activity in the latest week</small></div></article>
        <article className="panel-card insight-card"><span className="insight-icon gold"><Clock /></span><div><b>Follow-up due</b><strong>6</strong><small>sample items currently needing attention</small></div></article>
      </div>
    </div>
  );
}

function DashboardReferrals() {
  return (
    <div className="dashboard-view">
      <div className="dashboard-view-head">
        <div>
          <span className="dashboard-kicker">Mwangaza County · fictional demo area</span>
          <h4>Referrals & follow-up</h4>
        </div>
        <span className="quiet-chip">Illustrative queue</span>
      </div>
      <article className="panel-card table-panel">
        <div className="table-wrap">
          <table className="demo-table">
            <thead><tr><th>Case</th><th>Support</th><th>Status</th><th>Next step</th></tr></thead>
            <tbody>
              {referrals.map((row) => (
                <tr key={row.household}>
                  <td><b>{row.household}</b><small>anonymized demo case</small></td>
                  <td>{row.support}</td>
                  <td><span className={`status-chip ${row.status.toLowerCase().replaceAll(" ", "-")}`}>{row.status}</span></td>
                  <td>{row.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <div className="referral-summary">
        <article><span className="summary-dot green" /><div><b>2</b><small>confirmed received</small></div></article>
        <article><span className="summary-dot gold" /><div><b>2</b><small>follow-up due</small></div></article>
        <article><span className="summary-dot blue" /><div><b>1</b><small>newly referred</small></div></article>
      </div>
    </div>
  );
}

function DashboardOutcomes() {
  return (
    <div className="dashboard-view">
      <div className="dashboard-view-head">
        <div>
          <span className="dashboard-kicker">Mwangaza County · fictional demo area</span>
          <h4>Illustrative outcomes view</h4>
        </div>
        <span className="verification-pill">Verification pending</span>
      </div>

      <div className="outcome-grid">
        <article className="panel-card outcome-primary">
          <span className="eyebrow-small">Follow-up continuity</span>
          <div className="outcome-number">73%</div>
          <p>of eligible sample referrals have a documented follow-up within 14 days.</p>
          <div className="outcome-progress"><i style={{ width: "73%" }} /></div>
          <small>Illustrative metric only · not a reported AFYA OS result</small>
        </article>
        <article className="panel-card evidence-card">
          <div className="evidence-row"><span><CheckCircle /></span><div><b>46</b><small>eligible sample referrals</small></div></div>
          <div className="evidence-row"><span><Heart /></span><div><b>34</b><small>sample follow-ups recorded</small></div></div>
          <div className="evidence-row"><span><Clock /></span><div><b>12</b><small>sample journeys incomplete</small></div></div>
        </article>
      </div>

      <article className="outcome-caveat">
        <ShieldHeart />
        <div><b>Evidence before claims.</b><p>In a real programme, outcome definitions, source evidence, missing follow-up, and independent review would need to be considered before any result is presented as verified.</p></div>
      </article>
    </div>
  );
}

function DashboardDemo() {
  const [active, setActive] = useState<DashboardView>("overview");
  const view = useMemo(() => {
    if (active === "trends") return <DashboardTrends />;
    if (active === "referrals") return <DashboardReferrals />;
    if (active === "outcomes") return <DashboardOutcomes />;
    return <DashboardOverview />;
  }, [active]);

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><Image src="/brand/afyaos-logo.png" alt="AFYA OS" width={132} height={53} /></div>
        <div className="dashboard-area"><span>M</span><div><b>Mwangaza County</b><small>Fictional demo area</small></div></div>
        <nav aria-label="Demo dashboard navigation">
          {dashboardTabs.map((tab) => (
            <button key={tab.id} className={active === tab.id ? "active" : ""} onClick={() => setActive(tab.id)} type="button">
              {tab.id === "overview" && <House />}
              {tab.id === "trends" && <Heart />}
              {tab.id === "referrals" && <Clipboard />}
              {tab.id === "outcomes" && <CheckCircle />}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note"><DemoTag compact /><p>This preview uses fictional people, places and activity.</p></div>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <div><span className="mobile-dashboard-title">Afya Grid preview</span><DemoTag /></div>
          <div className="dashboard-profile"><span>FD</span><div><b>Demo supervisor</b><small>Preview role</small></div></div>
        </div>
        <div className="dashboard-mobile-tabs" aria-label="Demo dashboard tabs">
          {dashboardTabs.map((tab) => <button type="button" key={tab.id} className={active === tab.id ? "active" : ""} onClick={() => setActive(tab.id)}>{tab.label}</button>)}
        </div>
        {view}
      </div>
    </div>
  );
}

function PhoneHouseholds() {
  return (
    <div className="phone-screen">
      <div className="phone-status"><span>09:41</span><span>Low connectivity</span></div>
      <div className="phone-head"><div><small>Good morning</small><b>Today’s households</b></div><span className="avatar">CHW</span></div>
      <DemoTag compact />
      <div className="phone-search">Search households</div>
      <div className="phone-summary"><span><b>6</b><small>visits today</small></span><span><b>2</b><small>follow-ups due</small></span></div>
      <div className="phone-list">
        <div><span className="house-avatar">A</span><p><b>Household #A214</b><small>Follow-up · 10:30</small></p><i>›</i></div>
        <div><span className="house-avatar">B</span><p><b>Household #B083</b><small>New visit · 11:45</small></p><i>›</i></div>
        <div><span className="house-avatar">C</span><p><b>Household #C119</b><small>NCD review · 14:00</small></p><i>›</i></div>
      </div>
      <div className="phone-nav"><span className="selected">Home</span><span>Households</span><span>Follow-up</span></div>
    </div>
  );
}

function PhoneEncounter() {
  return (
    <div className="phone-screen">
      <div className="phone-status"><span>09:41</span><span>Saved on device</span></div>
      <div className="screen-back">‹ <span>Household #B083</span></div>
      <DemoTag compact />
      <div className="encounter-title"><small>Wellbeing conversation</small><b>How has the last week felt?</b><p>Use the person’s own words and choose the closest response.</p></div>
      <div className="choice-list"><button>Mostly okay</button><button className="selected">Some difficult days</button><button>Hard most days</button><button>Prefer not to answer</button></div>
      <div className="support-note"><Heart /><p><b>Supportive prompt</b><small>“Thank you for sharing that. We can take this one step at a time.”</small></p></div>
      <button className="phone-primary">Continue</button>
    </div>
  );
}

function PhoneReferral() {
  return (
    <div className="phone-screen">
      <div className="phone-status"><span>09:41</span><span>Connection available</span></div>
      <div className="screen-back">‹ <span>Referral</span></div>
      <DemoTag compact />
      <div className="referral-icon"><CheckCircle /></div>
      <div className="referral-title"><b>Referral prepared</b><p>Review the details with the person before confirming the next step.</p></div>
      <div className="referral-card">
        <small>Sample destination</small><b>Community Care Centre — Demo</b>
        <div><span>Purpose</span><strong>Primary care review</strong></div>
        <div><span>Preferred day</span><strong>Thursday morning</strong></div>
        <div><span>Follow-up</span><strong>Within 7 days</strong></div>
      </div>
      <div className="consent-check"><span>✓</span><p><b>Person has reviewed the referral</b><small>Illustrative consent confirmation</small></p></div>
      <button className="phone-primary">Confirm referral</button>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="AFYA OS home"><Image src="/brand/afyaos-logo.png" alt="AFYA OS" width={176} height={70} priority /></a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#serves">Who it serves</a>
            <a href="#journey">Care journey</a>
            <a href="#demo">Product preview</a>
            <a href="#approach">Approach</a>
          </nav>
          <a className="button button-small button-dark" href="#contact">Partner with us <ArrowRight /></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="concept-pill"><span /> Pre-pilot concept preview · Kenya</div>
            <div className="hero-mark"><span>Human wellbeing.</span><span>Intelligent infrastructure.</span></div>
            <h1>Care should not disappear between a household visit and the next follow-up.</h1>
            <p className="hero-lede">AFYA OS is a proposed community health platform designed to help health workers recognize needs, connect people to appropriate support, and keep the care journey visible across mental health, primary care, and long-term conditions.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#demo">See the product preview <ArrowRight /></a>
              <a className="button button-ghost" href="#contact">Start a partnership conversation</a>
            </div>
            <div className="hero-note"><span>Concept preview</span><p>AFYA OS is pre-pilot. Screens and activity shown on this site are illustrative, not live service data.</p></div>
          </div>

          <div className="hero-preview" aria-label="AFYA OS two layer product concept">
            <div className="hero-preview-top">
              <span className="preview-kicker">One connected care experience</span>
              <DemoTag />
            </div>
            <div className="two-layer-card field-layer">
              <div className="layer-icon"><Leaf /></div>
              <div><span>For the field</span><h3>Daktari AI</h3><p>A calm companion for community health workers during household visits — designed to keep essential work usable through low connectivity.</p></div>
              <span className="layer-number">01</span>
            </div>
            <div className="care-bridge"><span>visit</span><i /><span>referral</span><i /><span>follow-up</span><i /><span>outcome</span></div>
            <div className="two-layer-card grid-layer">
              <div className="layer-icon"><Users /></div>
              <div><span>For coordination</span><h3>Afya Grid</h3><p>A shared view of referrals, follow-up, service reach and outcome evidence for authorized supervisors, county teams and partners.</p></div>
              <span className="layer-number">02</span>
            </div>
          </div>
        </div>
      </section>

      <section className="continuity-strip" aria-label="AFYA OS focus areas">
        <div className="container continuity-grid"><span>Mental health & wellbeing</span><i /><span>Primary healthcare</span><i /><span>NCD follow-up</span><i /><span>Continuity of care</span></div>
      </section>

      <section className="section serves-section" id="serves">
        <div className="container section-heading centered">
          <div className="section-kicker">Who it serves</div>
          <h2>Different people. One clearer care journey.</h2>
          <p>AFYA OS is shaped around the people delivering, coordinating, reviewing and supporting community care — with each audience seeing what is relevant to their role.</p>
        </div>
        <div className="container persona-grid">
          {personas.map(([title, copy], index) => (
            <article className="persona-card" key={title}>
              <span className="persona-index">0{index + 1}</span>
              <div className="persona-icon">{index === 0 ? <Heart /> : index === 1 ? <Users /> : index === 2 ? <House /> : index === 3 ? <Leaf /> : <CheckCircle />}</div>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="container split-heading">
          <div><div className="section-kicker light">The care journey</div><h2>From a first conversation to a visible next step.</h2></div>
          <p>AFYA OS is designed around what happens to a person after a need is recognized — not just the moment a form is completed.</p>
        </div>
        <div className="container journey-flow">
          {journey.map(([number, title, copy], index) => (
            <article className="journey-step" key={number}>
              <div className="journey-top"><span>{number}</span>{index < journey.length - 1 && <i />}</div>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section demo-section" id="demo">
        <div className="container demo-heading">
          <div><div className="section-kicker">Afya Grid preview</div><h2>A realistic glimpse of how coordinated community care could feel.</h2></div>
          <div className="demo-heading-note"><DemoTag /><p>Everything below is fictional. The preview demonstrates intended user experience, not current programme performance.</p></div>
        </div>
        <div className="container"><DashboardDemo /></div>
      </section>

      <section className="section mobile-section" id="daktari">
        <div className="container mobile-intro">
          <div><div className="section-kicker">Daktari AI preview</div><h2>Designed for the rhythm of a household visit.</h2></div>
          <p>The field experience is intentionally simple: find the household, listen and record, receive approved supportive guidance, and make the next step in care clear. These screens are concept mockups.</p>
        </div>
        <div className="container phone-showcase">
          <div className="phone-item"><div className="phone-frame"><div className="phone-notch" /><PhoneHouseholds /></div><div className="phone-caption"><span>01</span><div><h3>Plan the day</h3><p>See scheduled households and follow-up needs without overwhelming the worker.</p></div></div></div>
          <div className="phone-item raised"><div className="phone-frame"><div className="phone-notch" /><PhoneEncounter /></div><div className="phone-caption"><span>02</span><div><h3>Support the conversation</h3><p>Keep the person’s voice central while presenting calm, approved prompts to the worker.</p></div></div></div>
          <div className="phone-item"><div className="phone-frame"><div className="phone-notch" /><PhoneReferral /></div><div className="phone-caption"><span>03</span><div><h3>Make the next step clear</h3><p>Review a referral together and make follow-up visible instead of treating referral as the end.</p></div></div></div>
        </div>
      </section>

      <section className="section approach-section" id="approach">
        <div className="container approach-grid">
          <div className="approach-copy"><div className="section-kicker light">Our approach</div><h2>Human care stays central.</h2><p>AFYA OS is being shaped as support infrastructure for community care — not a substitute for qualified professionals, trusted local services, or human judgment.</p><a href="#contact" className="text-link">Talk with us about a responsible pilot <ArrowRight /></a></div>
          <div className="commitment-grid">
            <article><span><ShieldHeart /></span><h3>Privacy & consent first</h3><p>People should understand what is recorded, why it matters, and how their information is used for the agreed care purpose.</p></article>
            <article><span><Heart /></span><h3>Qualified human oversight</h3><p>Care decisions remain with trained people and approved service pathways; the platform supports rather than replaces them.</p></article>
            <article><span><CheckCircle /></span><h3>Honest evidence</h3><p>Planned benefits, observed activity, and verified outcomes are treated as different things — with caveats kept visible.</p></article>
            <article><span><Voice /></span><h3>Community voice</h3><p>Language, accessibility, confidentiality and feedback should be shaped with the people and communities the programme serves.</p></article>
          </div>
        </div>
      </section>

      <section className="section partnership-section" id="contact">
        <div className="container partnership-card">
          <div className="partnership-copy">
            <div className="section-kicker">Partnership</div>
            <h2>Help shape a practical first pilot in Kenya.</h2>
            <p>AFYA OS is seeking conversations with health-service providers, county health teams, community organizations, researchers, evaluators and funders who can help test whether this model improves continuity of care in a real local context.</p>
            <div className="partner-types"><span>Health providers</span><span>County teams</span><span>Community organizations</span><span>Researchers</span><span>Funders</span></div>
            <div className="partnership-actions">
              <a className="button button-primary" href="mailto:denishomondi00@gmail.com?subject=AFYA%20OS%20partnership%20conversation&body=Hi%20Frank%2C%0A%0AI%27d%20like%20to%20discuss%20AFYA%20OS%20and%20a%20potential%20partnership.%0A%0AOrganization%3A%0ARole%3A%0ACare%20gap%20or%20population%20of%20interest%3A%0A%0A">Start a partnership conversation <ArrowUpRight /></a>
              <a className="button button-ghost" href="/documents/afyaos-partnership-brief.pdf" target="_blank" rel="noreferrer">View partnership brief</a>
            </div>
          </div>
          <div className="founder-card">
            <div className="founder-photo"><Image src="/founder/frank-denish-omondi.png" alt="Portrait of AFYA OS founder Frank Denish Omondi" width={440} height={440} /></div>
            <div className="founder-meta"><span>Founder</span><h3>Frank Denish Omondi</h3><p>Founder & Lead Engineer, AFYA OS</p><a href="mailto:denishomondi00@gmail.com">denishomondi00@gmail.com <ArrowUpRight /></a></div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand"><Image src="/brand/afyaos-logo.png" alt="AFYA OS" width={160} height={64} /><p>Human wellbeing. Intelligent infrastructure.</p></div>
          <div className="footer-note"><b>Concept status</b><p>AFYA OS is an early-stage, pre-pilot concept. Product screens, names, places and activity shown here are illustrative and do not represent live service delivery or verified health outcomes.</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 AFYA OS</span><span>Community health · Kenya</span><a href="mailto:denishomondi00@gmail.com">Contact</a></div>
      </footer>
    </main>
  );
}
