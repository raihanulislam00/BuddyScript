import Link from "next/link";
import { getExploreItem } from "@/lib/explore";

export default function InsightsPage() {
  const item = getExploreItem("insights");

  if (!item) {
    return <div>Insights content not found</div>;
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

        {/* Real-time Dashboard */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>📊 Real-time Performance Dashboard</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#28a745', marginBottom: '0.5rem' }}>98.7%</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>System Uptime</div>
              <div style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.25rem' }}>↗ +0.2% from yesterday</div>
            </div>
            
            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0070f3', marginBottom: '0.5rem' }}>2.4M</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Active Users</div>
              <div style={{ fontSize: '0.8rem', color: '#0070f3', marginTop: '0.25rem' }}>↗ +12% from last week</div>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffc107', marginBottom: '0.5rem' }}>156ms</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Avg Response Time</div>
              <div style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.25rem' }}>↗ 23ms faster</div>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#dc3545', marginBottom: '0.5rem' }}>$847K</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Revenue (MTD)</div>
              <div style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.25rem' }}>↗ +18% vs target</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
              📈 View Detailed Analytics
            </button>
            <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
              📱 Mobile Dashboard
            </button>
            <button style={{ backgroundColor: '#6f42c1', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
              🔔 Set Up Alerts
            </button>
          </div>
        </section>

        {/* AI-Powered Insights */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>🤖 AI-Powered Insights</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', border: '2px solid #0070f3', borderRadius: '8px', backgroundColor: '#f0f8ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#28a745', marginRight: '0.5rem' }}></div>
                <strong style={{ color: '#0070f3' }}>🎯 High Impact Opportunity</strong>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Mobile conversion rate optimization could increase revenue by 23%</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                Our AI detected that mobile users have a 34% lower conversion rate. Implementing progressive web app features 
                and optimizing checkout flow could generate an additional $180K monthly.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  View Full Analysis
                </button>
                <button style={{ backgroundColor: 'white', color: '#0070f3', border: '1px solid #0070f3', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Create Action Plan
                </button>
              </div>
            </div>

            <div style={{ padding: '1.5rem', border: '2px solid #ffc107', borderRadius: '8px', backgroundColor: '#fffbf0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffc107', marginRight: '0.5rem' }}></div>
                <strong style={{ color: '#e67e22' }}>⚠️ Attention Required</strong>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Server load increased 45% in EU region</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                Traffic surge detected in European markets. Consider auto-scaling or adding CDN endpoints 
                to maintain performance. Current response time: 340ms (target: &lt;200ms).
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ backgroundColor: '#ffc107', color: '#333', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Scale Resources
                </button>
                <button style={{ backgroundColor: 'white', color: '#e67e22', border: '1px solid #e67e22', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Monitor Closely
                </button>
              </div>
            </div>

            <div style={{ padding: '1.5rem', border: '2px solid #28a745', borderRadius: '8px', backgroundColor: '#f0fff4' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#28a745', marginRight: '0.5rem' }}></div>
                <strong style={{ color: '#28a745' }}>✅ Success Story</strong>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>A/B test results: New onboarding flow wins by 32%</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>
                The streamlined 3-step onboarding significantly outperformed the previous 7-step flow. 
                User completion rate increased from 68% to 89%. Ready to deploy to all users.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Deploy to 100%
                </button>
                <button style={{ backgroundColor: 'white', color: '#28a745', border: '1px solid #28a745', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  View Test Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Intelligence */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>🌍 Market Intelligence</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>🏆 Competitor Analysis</h4>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>TechCorp Inc.</span>
                  <span style={{ fontSize: '0.8rem', color: '#dc3545' }}>-2.4% market share</span>
                </div>
                <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '6px' }}>
                  <div style={{ backgroundColor: '#dc3545', width: '35%', height: '100%', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>InnovateNow</span>
                  <span style={{ fontSize: '0.8rem', color: '#28a745' }}>+1.8% market share</span>
                </div>
                <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '6px' }}>
                  <div style={{ backgroundColor: '#28a745', width: '28%', height: '100%', borderRadius: '4px' }}></div>
                </div>
              </div>
              <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}>
                View Full Report
              </button>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>📈 Trending Topics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#333' }}>#AI-Integration</span>
                  <span style={{ backgroundColor: '#28a745', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem' }}>+156%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#333' }}>#Remote-Work</span>
                  <span style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem' }}>+89%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#333' }}>#Sustainability</span>
                  <span style={{ backgroundColor: '#ffc107', color: '#333', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem' }}>+67%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#333' }}>#Cybersecurity</span>
                  <span style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem' }}>+234%</span>
                </div>
              </div>
              <button style={{ backgroundColor: '#6f42c1', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', width: '100%', marginTop: '1rem' }}>
                Track New Topic
              </button>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>💰 Revenue Forecast</h4>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745' }}>$2.3M</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Projected Q1 Revenue</div>
                <div style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.25rem' }}>+15% confidence interval</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Key Drivers:</div>
                <div style={{ fontSize: '0.7rem', color: '#333' }}>• Enterprise contracts: +$340K</div>
                <div style={{ fontSize: '0.7rem', color: '#333' }}>• Product launches: +$180K</div>
                <div style={{ fontSize: '0.7rem', color: '#333' }}>• Market expansion: +$120K</div>
              </div>
              <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}>
                Detailed Forecast
              </button>
            </div>
          </div>
        </section>

        {/* Custom Alerts */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>🔔 Custom Alert Rules</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f8f9fa' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Revenue drops below $50K daily</h4>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Notify: Slack #alerts + Email to finance team</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ backgroundColor: '#28a745', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem' }}>ACTIVE</span>
                <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>
                  Edit
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f8f9fa' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Server response time &gt; 500ms</h4>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Notify: PagerDuty + SMS to on-call engineer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ backgroundColor: '#28a745', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem' }}>ACTIVE</span>
                <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>
                  Edit
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#fff3cd' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>Competitor launches new feature</h4>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Notify: Weekly digest email to product team</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ backgroundColor: '#ffc107', color: '#333', padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem' }}>PAUSED</span>
                <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>
                  Activate
                </button>
              </div>
            </div>
          </div>

          <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '1rem' }}>
            ➕ Create New Alert Rule
          </button>
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