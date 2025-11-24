import Link from "next/link";
import { getExploreItem } from "@/lib/explore";

export default function LearningPage() {
  const item = getExploreItem("learning");

  if (!item) {
    return <div>Learning content not found</div>;
  }

  return (
    <div className="feed-page feed-page--light">
      <main className="explore-page">
        <header className="card explore-hero">
          <div className="explore-hero__pill">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge ? <span className="feed-pill">{item.badge}</span> : null}
          </div>
          <h1>{item.heroTitle}</h1>
          <p className="explore-hero__subtitle">{item.heroSubtitle}</p>
          <p className="explore-hero__description">{item.description}</p>
          <div className="explore-hero__cta">
            <Link href={item.ctaHref} className="btn btn-primary">
              {item.ctaLabel}
            </Link>
            <Link href="/feed" className="btn btn-light">
              Back to feed
            </Link>
          </div>
          <ul className="explore-hero__stats">
            {item.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <section className="card explore-highlights">
          <div className="explore-highlights__header">
            <h2>Why you&apos;ll love {item.label}</h2>
            <p>Three quick wins to get you started.</p>
          </div>
          <ul>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {/* Featured Learning Paths Section */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>🌟 Featured Learning Paths</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>🚀 Full Stack Development</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>Master React, Node.js, and databases from zero to deployment</p>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                  12 weeks
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#666' }}>• 156 enrolled</span>
              </div>
              <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Start Learning
              </button>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>🎨 UI/UX Design Fundamentals</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>Design principles, prototyping, and user research methods</p>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                  8 weeks
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#666' }}>• 89 enrolled</span>
              </div>
              <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Start Learning
              </button>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ color: '#0070f3', marginBottom: '0.5rem' }}>📊 Data Science with Python</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>Analytics, machine learning, and data visualization</p>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                  10 weeks
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#666' }}>• 203 enrolled</span>
              </div>
              <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Start Learning
              </button>
            </div>
          </div>
        </section>

        {/* Live Sessions Today */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>📅 Live Sessions Today</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🔥 React Performance Optimization</h4>
                <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>Learn advanced techniques to speed up your React apps</p>
                <span style={{ color: '#0070f3', fontSize: '0.8rem' }}>with Sarah Chen • 2:00 PM PST</span>
              </div>
              <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Join Live
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>💡 Design System Workshop</h4>
                <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>Build scalable design systems from scratch</p>
                <span style={{ color: '#0070f3', fontSize: '0.8rem' }}>with Alex Rodriguez • 4:30 PM PST</span>
              </div>
              <button style={{ backgroundColor: '#ffc107', color: '#333', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Remind Me
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🤖 AI & Machine Learning Q&A</h4>
                <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>Open session for all your AI questions</p>
                <span style={{ color: '#0070f3', fontSize: '0.8rem' }}>with Dr. Maria Johnson • 6:00 PM PST</span>
              </div>
              <button style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Join Queue
              </button>
            </div>
          </div>
        </section>

        {/* Your Learning Progress */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>📈 Your Learning Progress</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>JavaScript Fundamentals</h4>
              <div style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', height: '8px', marginBottom: '0.5rem' }}>
                <div style={{ backgroundColor: '#28a745', width: '75%', height: '100%', borderRadius: '10px' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>75% Complete • 3 lessons left</span>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>CSS Grid & Flexbox</h4>
              <div style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', height: '8px', marginBottom: '0.5rem' }}>
                <div style={{ backgroundColor: '#ffc107', width: '45%', height: '100%', borderRadius: '10px' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>45% Complete • 5 lessons left</span>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Node.js APIs</h4>
              <div style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', height: '8px', marginBottom: '0.5rem' }}>
                <div style={{ backgroundColor: '#17a2b8', width: '20%', height: '100%', borderRadius: '10px' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>20% Complete • Just started!</span>
            </div>
          </div>
        </section>

        {/* Study Groups */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>👥 Active Study Groups</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', marginRight: '1rem' }}>
                  JS
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>JavaScript Mastery Group</h4>
                  <p style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}>24 members • Daily challenges • Next meetup: Tomorrow 7 PM</p>
                </div>
              </div>
              <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Join Group
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#28a745', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', marginRight: '1rem' }}>
                  UX
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>UX Design Fundamentals</h4>
                  <p style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}>18 members • Weekly case studies • Next meetup: Friday 6 PM</p>
                </div>
              </div>
              <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Join Group
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#dc3545', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', marginRight: '1rem' }}>
                  AI
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Machine Learning Bootcamp</h4>
                  <p style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}>31 members • Code reviews • Next meetup: Wednesday 8 PM</p>
                </div>
              </div>
              <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Join Group
              </button>
            </div>
          </div>
        </section>

        <section className="explore-sections">
          {item.sections.map((section) => (
            <article key={section.title} className="card explore-tile">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}