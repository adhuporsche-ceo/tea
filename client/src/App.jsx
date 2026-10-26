
import { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
} from 'react-router-dom';
import './App.css';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

const internships = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    category: 'Development',
    duration: '3 months',
    type: 'Remote',
    stipend: '₹10,000/mo',
    level: 'Beginner friendly',
    icon: '✦',
    color: 'violet',
    description:
      'Create beautiful, responsive user experiences using React, JavaScript, and modern CSS. Work alongside designers and developers to turn ideas into polished digital products.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    responsibilities: [
      'Build responsive and accessible user interfaces.',
      'Create reusable React components.',
      'Collaborate with the design and development teams.',
    ],
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Code Labs',
    category: 'Development',
    duration: '6 months',
    type: 'Hybrid',
    stipend: '₹15,000/mo',
    level: 'Intermediate',
    icon: '⌘',
    color: 'blue',
    description:
      'Build reliable server-side applications and REST APIs. Learn database design, authentication, and backend development using Node.js and Express.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    responsibilities: [
      'Develop and maintain REST API endpoints.',
      'Design and query MongoDB collections.',
      'Write clean, secure, and maintainable code.',
    ],
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'InnovateX',
    category: 'Development',
    duration: '4 months',
    type: 'Remote',
    stipend: '₹12,000/mo',
    level: 'Beginner friendly',
    icon: '◈',
    color: 'cyan',
    description:
      'Work across the entire application stack, from interactive React interfaces to Express APIs and MongoDB data storage.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    responsibilities: [
      'Develop features across frontend and backend.',
      'Connect interfaces to REST APIs.',
      'Test, debug, and document application features.',
    ],
  },
  {
    id: '4',
    title: 'Data Analyst',
    company: 'DataWorks',
    category: 'Data & AI',
    duration: '3 months',
    type: 'On-site',
    stipend: '₹8,000/mo',
    level: 'Beginner friendly',
    icon: '◉',
    color: 'orange',
    description:
      'Turn raw data into meaningful insights. Learn to clean datasets, analyze trends, and communicate findings through reports and visualizations.',
    skills: ['Python', 'SQL', 'Excel', 'Data visualization'],
    responsibilities: [
      'Clean and organize datasets.',
      'Identify trends and useful business insights.',
      'Prepare reports and visual summaries.',
    ],
  },
  {
    id: '5',
    title: 'UI/UX Design Intern',
    company: 'Pixel Studio',
    category: 'Design',
    duration: '3 months',
    type: 'Remote',
    stipend: '₹9,000/mo',
    level: 'Beginner friendly',
    icon: '✳',
    color: 'pink',
    description:
      'Help design intuitive digital experiences through user research, wireframes, prototypes, and thoughtful visual design.',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'UI design'],
    responsibilities: [
      'Create wireframes and interactive prototypes.',
      'Contribute to design systems and components.',
      'Use feedback to improve user experiences.',
    ],
  },
  {
    id: '6',
    title: 'AI / ML Intern',
    company: 'Future Intelligence',
    category: 'Data & AI',
    duration: '6 months',
    type: 'Hybrid',
    stipend: '₹18,000/mo',
    level: 'Intermediate',
    icon: '✧',
    color: 'green',
    description:
      'Explore machine learning workflows, prepare data, experiment with models, and help develop intelligent software solutions.',
    skills: ['Python', 'Pandas', 'NumPy', 'Machine learning'],
    responsibilities: [
      'Prepare datasets for model training.',
      'Experiment with machine learning algorithms.',
      'Evaluate models and document results.',
    ],
  },
];

const categories = ['All', 'Development', 'Data & AI', 'Design'];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  };

  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark"><Icon name="layers" size={23} /></span>
          <span>intern<span className="brand-accent">sphere</span><small>CAREER STARTS HERE</small></span>
        </Link>

        <button
          className="mobile-menu"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>Explore internships</NavLink>
          <NavLink to="/applications" onClick={closeMenu}>My applications</NavLink>
          <a className="nav-cta" href="#internships" onClick={closeMenu}>
            Find an opportunity <Icon name="arrow" size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ search, setSearch }) {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-content">
        <div className="hero-pill">
          <span className="live-dot" /> YOUR NEXT CHAPTER STARTS HERE
        </div>
        <h1>
          Turn your potential
          <br />
          into <span>opportunity.</span>
        </h1>
        <p className="hero-description">
          Discover meaningful internships, learn from real projects,
          and build the future you imagine.
        </p>
        <div className="hero-search">
          <Icon name="search" size={21} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles, companies or skills..."
            aria-label="Search internships"
          />
          <a href="#internships" className="search-button">Explore roles</a>
        </div>
        <div className="hero-trust">
          <span><Icon name="check" size={15} /> Curated opportunities</span>
          <span><Icon name="check" size={15} /> Student focused</span>
          <span><Icon name="check" size={15} /> Career ready skills</span>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-center"><Icon name="spark" size={56} /></div>
        <div className="floating-card floating-card-top">
          <span className="float-icon float-violet">✦</span>
          <span><strong>Find your fit</strong><small>Roles that inspire you</small></span>
        </div>
        <div className="floating-card floating-card-bottom">
          <span className="float-icon float-green"><Icon name="check" size={20} /></span>
          <span><strong>Start growing</strong><small>One application at a time</small></span>
        </div>
        <div className="art-star star-one">✳</div>
        <div className="art-star star-two">✧</div>
      </div>
    </section>
  );
}

function InternshipCard({ item }) {
  return (
    <article className="internship-card">
      <div className="card-topline">
        <div className={`company-symbol ${item.color}`}>{item.icon}</div>
        <span className="open-badge"><span /> Open</span>
      </div>
      <p className="company-name">{item.company}</p>
      <h3>{item.title}</h3>
      <div className="card-meta">
        <span><Icon name="clock" size={15} /> {item.duration}</span>
        <span><Icon name="pin" size={15} /> {item.type}</span>
      </div>
      <div className="card-skills">
        {item.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}
      </div>
      <div className="card-bottom">
        <div className="stipend-label">
          <small>MONTHLY STIPEND</small>
          <strong>{item.stipend}</strong>
        </div>
        <Link
          className="card-arrow"
          to={`/internships/${item.id}`}
          aria-label={`View ${item.title} details`}
        >
          <Icon name="arrow" size={20} />
        </Link>
      </div>
    </article>
  );
}

function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [workType, setWorkType] = useState('All');

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();

    return internships.filter((item) => {
      const matchesSearch = [
        item.title, item.company, item.category, item.description, ...item.skills,
      ].join(' ').toLowerCase().includes(term);

      return matchesSearch
        && (category === 'All' || item.category === category)
        && (workType === 'All' || item.type === workType);
    });
  }, [search, category, workType]);

  return (
    <>
      <Hero search={search} setSearch={setSearch} />

      <section className="stats-strip" aria-label="Portal highlights">
        <div className="stat-item">
          <span className="stat-icon"><Icon name="briefcase" size={21} /></span>
          <div><strong>{internships.length}+</strong><small>Opportunities</small></div>
        </div>
        <div className="stat-item">
          <span className="stat-icon"><Icon name="users" size={21} /></span>
          <div><strong>Student first</strong><small>Designed for learners</small></div>
        </div>
        <div className="stat-item">
          <span className="stat-icon"><Icon name="spark" size={21} /></span>
          <div><strong>Career growth</strong><small>Skills that matter</small></div>
        </div>
      </section>

      <main className="page-section" id="internships">
        <div className="section-heading">
          <div>
            <p className="section-kicker">EXPLORE POSSIBILITIES</p>
            <h2>Find your next opportunity<span>.</span></h2>
            <p className="section-subtitle">Explore roles that match your interests and ambitions.</p>
          </div>
          <span className="result-count">{filtered.length} opportunities</span>
        </div>

        <div className="filter-toolbar">
          <div className="category-filters" aria-label="Filter by category">
            {categories.map((value) => (
              <button
                key={value}
                className={`filter-chip ${category === value ? 'active' : ''}`}
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <select
            className="work-filter"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            aria-label="Filter by work arrangement"
          >
            <option value="All">All work types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="internship-grid">
            {filtered.map((item) => <InternshipCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon"><Icon name="search" size={28} /></span>
            <h3>No matching internships</h3>
            <p>Try a different search term or clear your filters.</p>
            <button
              className="button-primary"
              onClick={() => { setSearch(''); setCategory('All'); setWorkType('All'); }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="bottom-banner">
          <div className="banner-icon"><Icon name="spark" size={28} /></div>
          <div>
            <h3>Your first opportunity can change everything.</h3>
            <p>Choose a role, submit your application, and take the next step.</p>
          </div>
          <a className="banner-link" href="#internships">Explore roles <Icon name="arrow" size={17} /></a>
        </div>
      </main>
    </>
  );
}

function Details() {
  const { id } = useParams();
  const item = internships.find((internship) => internship.id === id);

  if (!item) {
    return (
      <main className="page-section not-found">
        <h2>Internship not found</h2>
        <Link className="button-primary" to="/">Browse internships</Link>
      </main>
    );
  }

  return (
    <main className="page-section detail-layout">
      <Link to="/" className="back-link"><Icon name="back" size={18} /> Back to opportunities</Link>

      <section className="detail-hero">
        <div className={`company-symbol detail-symbol ${item.color}`}>{item.icon}</div>
        <span className="open-badge"><span /> Accepting applications</span>
        <p className="company-name">{item.company}</p>
        <h1>{item.title}</h1>
        <p className="detail-description">{item.description}</p>
        <div className="detail-meta">
          <span><Icon name="clock" size={17} /> {item.duration}</span>
          <span><Icon name="pin" size={17} /> {item.type}</span>
          <span><Icon name="briefcase" size={17} /> {item.level}</span>
        </div>
      </section>

      <div className="detail-columns">
        <div className="detail-main">
          <section className="content-panel">
            <p className="section-kicker">THE ROLE</p>
            <h2>What you'll work on</h2>
            <ul className="responsibility-list">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility}><Icon name="check" size={18} />{responsibility}</li>
              ))}
            </ul>
          </section>
          <section className="content-panel">
            <p className="section-kicker">WHAT YOU'LL LEARN</p>
            <h2>Skills you'll build</h2>
            <div className="detail-skills">
              {item.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </section>
        </div>

        <aside className="apply-panel">
          <p className="section-kicker">YOUR NEXT STEP</p>
          <h2>Ready to apply?</h2>
          <p>Submit your details to register your interest in this opportunity.</p>
          <div className="apply-stipend"><small>MONTHLY STIPEND</small><strong>{item.stipend}</strong></div>
          <Link className="button-primary button-full" to={`/apply/${item.id}`}>
            Apply for this internship <Icon name="arrow" size={18} />
          </Link>
          <p className="secure-note"><Icon name="check" size={15} /> Your details are submitted securely to the application API.</p>
        </aside>
      </div>
    </main>
  );
}

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = internships.find((internship) => internship.id === id);
  const [formData, setFormData] = useState({ name: '', email: '', rollNumber: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!item) {
    return <main className="page-section"><h2>Internship not found</h2><Link to="/">Browse internships</Link></main>;
  }

  function updateField(event) {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      rollNumber: formData.rollNumber.trim(),
      internship: item.title,
    };

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || result.message || `Request failed (${response.status})`);
      }

      setStatus({
        type: 'success',
        message: 'Your application has been submitted successfully!',
      });
      setFormData({ name: '', email: '', rollNumber: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: `${error.message}. Please check your backend URL and try again.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page-section form-page">
      <Link to={`/internships/${item.id}`} className="back-link">
        <Icon name="back" size={18} /> Back to internship
      </Link>

      <div className="form-layout">
        <section className="form-intro">
          <p className="section-kicker">ONE STEP CLOSER</p>
          <h1>Let's get your <span>journey</span> started.</h1>
          <p>Complete the application form with your student details. Please make sure your information is accurate.</p>
          <div className="selected-role">
            <div className={`company-symbol ${item.color}`}>{item.icon}</div>
            <div><small>APPLYING FOR</small><strong>{item.title}</strong><span>{item.company}</span></div>
          </div>
          <div className="form-assurance"><Icon name="check" size={18} /> Your application details will be saved by the portal.</div>
        </section>

        <section className="form-panel">
          <div className="form-panel-heading">
            <span className="form-step">APPLICATION FORM · STEP 1</span>
            <h2>Your details</h2>
            <p>All fields are required.</p>
          </div>

          <form onSubmit={submit} className="application-form">
            <label htmlFor="student-name">Full name</label>
            <div className="input-wrap">
              <Icon name="user" size={19} />
              <input
                id="student-name"
                name="name"
                value={formData.name}
                onChange={updateField}
                required
                minLength={2}
                maxLength={80}
                pattern=".*\S.*"
                title="Please enter your name."
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            <label htmlFor="student-email">Email address</label>
            <div className="input-wrap">
              <Icon name="mail" size={19} />
              <input
                id="student-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
                required
                maxLength={120}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <label htmlFor="student-roll">Student roll number</label>
            <div className="input-wrap">
              <Icon name="briefcase" size={19} />
              <input
                id="student-roll"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={updateField}
                required
                minLength={1}
                maxLength={40}
                pattern="[A-Za-z0-9/_-]+"
                title="Use letters, numbers, hyphens, underscores, or slashes."
                placeholder="e.g. 23CSE104"
              />
            </div>

            <label htmlFor="selected-internship">Selected internship</label>
            <input
              id="selected-internship"
              className="readonly-input"
              value={`${item.title} — ${item.company}`}
              readOnly
            />

            <button className="button-primary button-full submit-button" type="submit" disabled={submitting}>
              {submitting ? 'Submitting application…' : 'Submit application'}
              {!submitting && <Icon name="arrow" size={18} />}
            </button>

            {status.message && (
              <div className={`form-message ${status.type}`} role="status" aria-live="polite">
                <Icon name={status.type === 'success' ? 'check' : 'close'} size={19} />
                <span>{status.message}</span>
              </div>
            )}

            {status.type === 'success' && (
              <button
                className="secondary-button button-full"
                type="button"
                onClick={() => navigate('/applications')}
              >
                View application records
              </button>
            )}

            <p className="form-footnote">By submitting, you confirm that the information above is accurate.</p>
          </form>
        </section>
      </div>
    </main>
  );
}

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadApplications() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/applications`);
      const result = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(result.error || result.message || `Request failed (${response.status})`);
      }

      if (!Array.isArray(result)) {
        throw new Error('The API did not return an array of applications.');
      }

      setApplications(result);
    } catch (err) {
      setError(`${err.message}. Confirm that the backend is running and the API URL is configured.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <main className="page-section applications-page">
      <div className="section-heading">
        <div>
          <p className="section-kicker">APPLICATION MANAGEMENT</p>
          <h1>Application records<span>.</span></h1>
          <p className="section-subtitle">Applications retrieved from your backend API.</p>
        </div>
        <button className="secondary-button" onClick={loadApplications} disabled={loading}>
          {loading ? 'Refreshing…' : '↻ Refresh records'}
        </button>
      </div>

      {loading ? (
        <div className="empty-state"><div className="loading-spinner" /><h3>Loading applications…</h3></div>
      ) : error ? (
        <div className="empty-state error-state">
          <span className="empty-icon"><Icon name="layers" size={28} /></span>
          <h3>Unable to load records</h3>
          <p>{error}</p>
          <button className="button-primary" onClick={loadApplications}>Try again</button>
        </div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="briefcase" size={28} /></span>
          <h3>No applications yet</h3>
          <p>Submitted applications will appear here once the backend returns saved records.</p>
          <Link className="button-primary" to="/">Explore internships</Link>
        </div>
      ) : (
        <div className="records-panel">
          <div className="records-summary">
            <span className="records-number">{applications.length}</span>
            <div><strong>Saved applications</strong><p>Records returned by the application API</p></div>
          </div>
          <div className="table-scroll">
            <table className="applications-table">
              <thead>
                <tr><th>STUDENT</th><th>ROLL NUMBER</th><th>INTERNSHIP</th><th>EMAIL</th></tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={application._id || application.id || `${application.email}-${index}`}>
                    <td><strong>{application.name}</strong></td>
                    <td>{application.rollNumber}</td>
                    <td>{typeof application.internship === 'string' ? application.internship : application.internship?.title || '—'}</td>
                    <td>{application.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark"><Icon name="layers" size={21} /></span>
          <span>intern<span className="brand-accent">sphere</span></span>
        </Link>
        <p>Built for your next big opportunity.</p>
        <span className="footer-year">© {new Date().getFullYear()} InternSphere</span>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <main className="page-section not-found">
      <span className="not-found-code">404</span>
      <h1>Looks like you're off the path.</h1>
      <p>This page doesn't exist, but your next opportunity might.</p>
      <Link className="button-primary" to="/">Back to internships</Link>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships/:id" element={<Details />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
