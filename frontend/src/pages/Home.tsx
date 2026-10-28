
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  {
    number: '01',
    icon: '◎',
    title: 'Track applications',
    description:
      'Keep your job applications in one place. Record companies, job titles, application dates, and current status.',
  },
  {
    number: '02',
    icon: '↗',
    title: 'Manage interviews',
    description:
      'Organise interview dates, prepare for upcoming opportunities, and remember when to follow up.',
  },
  {
    number: '03',
    icon: '▥',
    title: 'Measure your progress',
    description:
      'See your job search progress at a glance and understand which applications need your attention.',
  },
]

const sampleApplications = [
  {
    company: 'Atlassian',
    role: 'Junior Frontend Developer',
    initials: 'A',
    status: 'Interview',
    color: 'lavender',
  },
  {
    company: 'Canva',
    role: 'Graduate Software Engineer',
    initials: 'C',
    status: 'Applied',
    color: 'peach',
  },
  {
    company: 'Microsoft',
    role: 'Web Developer',
    initials: 'M',
    status: 'In review',
    color: 'blue',
  },
]

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero section */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR CAREER JOURNEY, ORGANISED
            </div>

            <h1>
              Your next job.
              <br />
              <span>One clear plan.</span>
            </h1>

            <p className="hero-description">
              Stop juggling spreadsheets and scattered notes.
              Organise your job search, track every application,
              and move towards your next opportunity with confidence.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="button button-primary">
                Start your job search <span>→</span>
              </Link>

              <a href="#how-it-works" className="button button-secondary">
                See how it works
              </a>
            </div>

            <div className="hero-note">
              <span className="check-circle">✓</span>
              A simpler way to manage your job search
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="hero-visual">
            <div className="visual-orb orb-one" />
            <div className="visual-orb orb-two" />

            <div className="dashboard-preview">
              <div className="preview-topbar">
                <div>
                  <span className="preview-kicker">YOUR WORKSPACE</span>
                  <h3>Job search overview</h3>
                </div>
                <div className="avatar">S</div>
              </div>

              <div className="welcome-banner">
                <div>
                  <span className="welcome-label">
                    KEEP MOVING FORWARD
                  </span>
                  <h4>Every application counts.</h4>
                  <p>Your next opportunity starts here.</p>
                </div>
                <span className="welcome-symbol">↗</span>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Applications</span>
                  <strong>24</strong>
                  <span className="stat-caption">Total tracked</span>
                </div>

                <div className="stat-card">
                  <span className="stat-label">Interviews</span>
                  <strong>06</strong>
                  <span className="stat-caption">Opportunities</span>
                </div>

                <div className="stat-card">
                  <span className="stat-label">Follow-ups</span>
                  <strong>03</strong>
                  <span className="stat-caption">To remember</span>
                </div>
              </div>

              <div className="application-panel">
                <div className="panel-heading">
                  <h4>Recent applications</h4>
                  <span>Preview data</span>
                </div>

                {sampleApplications.map((application) => (
                  <div
                    className="application-row"
                    key={application.company}
                  >
                    <div className={`company-logo ${application.color}`}>
                      {application.initials}
                    </div>

                    <div className="application-info">
                      <strong>{application.company}</strong>
                      <span>{application.role}</span>
                    </div>

                    <span
                      className={`status status-${application.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="preview-bottom">
                <span className="preview-bottom-icon">✦</span>
                One organised space for your next big move.
              </div>
            </div>

            <div className="floating-card floating-top">
              <span className="floating-check">✓</span>
              <div>
                <strong>Stay organised</strong>
                <span>One step at a time</span>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <span className="floating-calendar">▦</span>
              <div>
                <strong>Keep on track</strong>
                <span>Remember your next steps</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="trust-strip">
          <span>BUILT FOR A MORE ORGANISED JOB SEARCH</span>
          <div className="trust-items">
            <span>Less confusion</span>
            <span className="trust-separator">✳</span>
            <span>More focus</span>
            <span className="trust-separator">✳</span>
            <span>Clear next steps</span>
          </div>
        </section>

        {/* Features */}
        <section className="features-section section-wrap" id="features">
          <div className="section-heading">
            <span className="section-label">A BETTER WAY TO JOB HUNT</span>
            <h2>
              Everything in one place.
              <br />
              <span>Progress you can see.</span>
            </h2>
            <p>
              A job search can get complicated. JobFlow helps you keep
              important information organised and easy to find.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className="feature-card-top">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-number">{feature.number}</span>
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="how-section" id="how-it-works">
          <div className="how-inner">
            <div className="how-intro">
              <span className="section-label">SIMPLE BY DESIGN</span>
              <h2>
                Small steps.
                <br />
                <span>Real progress.</span>
              </h2>
              <p>
                Spend less time trying to remember everything and more
                time preparing for the right opportunity.
              </p>
              <Link to="/register" className="text-link">
                Start organising your search <span>→</span>
              </Link>
            </div>

            <div className="steps-list">
              <div className="step-item">
                <span className="step-number">01</span>
                <div>
                  <h3>Add your applications</h3>
                  <p>
                    Record the role, company, date, and job details.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <span className="step-number">02</span>
                <div>
                  <h3>Update your progress</h3>
                  <p>
                    Keep track as you apply, interview, and follow up.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <span className="step-number">03</span>
                <div>
                  <h3>Plan your next move</h3>
                  <p>
                    See what needs attention and decide what to do next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="cta-section" id="get-started">
          <div className="cta-decoration">✳</div>
          <span className="section-label">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
          <h2>
            Make your job search
            <br />
            <span>feel more manageable.</span>
          </h2>
          <p>
            Bring your applications together and take the next step.
          </p>
          <Link to="user/register" className="button button-light">
            Get started with JobFlow <span>→</span>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}