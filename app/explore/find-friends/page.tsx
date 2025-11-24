import Link from "next/link";
import { getExploreItem } from "@/lib/explore";

const pendingRequests = [
  { 
    id: "maya", 
    name: "Maya Patel", 
    title: "Product Designer at Figma", 
    mutual: 12, 
    avatar: "/assets/images/profile.png",
    timeAgo: "2 hours ago",
    message: "Hey! We worked on similar projects at DesignCorp. Would love to connect!",
    location: "San Francisco, CA",
    connections: 847
  },
  { 
    id: "leo", 
    name: "Leo Martinez", 
    title: "Senior Frontend Engineer at Netflix", 
    mutual: 5, 
    avatar: "/assets/images/profile.png",
    timeAgo: "1 day ago",
    message: "Noticed we're both React enthusiasts. Let's connect and share knowledge!",
    location: "Austin, TX",
    connections: 623
  },
  { 
    id: "alina", 
    name: "Alina Kost", 
    title: "Growth Strategist at Stripe", 
    mutual: 9, 
    avatar: "/assets/images/profile.png",
    timeAgo: "3 days ago",
    message: "We have many mutual connections in the growth community. Looking forward to connecting!",
    location: "New York, NY",
    connections: 1205
  },
  { 
    id: "carlos", 
    name: "Carlos Rodriguez", 
    title: "DevOps Engineer at Google", 
    mutual: 7, 
    avatar: "/assets/images/profile.png",
    timeAgo: "1 week ago",
    message: "Saw your post about Kubernetes best practices. Would love to discuss more!",
    location: "Mountain View, CA",
    connections: 892
  },
  { 
    id: "sophie", 
    name: "Sophie Chen", 
    title: "UX Researcher at Microsoft", 
    mutual: 3, 
    avatar: "/assets/images/profile.png",
    timeAgo: "2 weeks ago",
    message: "We attended the same UX conference last year. Hope you remember me!",
    location: "Seattle, WA",
    connections: 445
  }
];

const suggestedFriends = [
  {
    id: "james",
    name: "James Wilson",
    title: "Full Stack Developer",
    mutual: 15,
    avatar: "/assets/images/profile.png",
    reason: "Works at your previous company",
    location: "Portland, OR"
  },
  {
    id: "priya",
    name: "Priya Sharma",
    title: "Data Scientist at Apple",
    mutual: 8,
    avatar: "/assets/images/profile.png",
    reason: "Attended same university",
    location: "Cupertino, CA"
  },
  {
    id: "alex",
    name: "Alex Thompson",
    title: "Product Manager",
    mutual: 11,
    avatar: "/assets/images/profile.png",
    reason: "Similar interests and skills",
    location: "Chicago, IL"
  }
];

export default function FindFriendsPage() {
  const item = getExploreItem("find-friends");

  if (!item) {
    return <div>Find friends content not found</div>;
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

        {/* Friend Requests Received */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>📨 Friend Requests ({pendingRequests.length})</h2>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>People who want to connect with you</p>
            </div>
            <Link href="/friend-requests" style={{ backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem' }}>
              View All Requests
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingRequests.map((request) => (
              <div key={request.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                padding: '1.5rem', 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px', 
                backgroundColor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                  <img 
                    src={request.avatar} 
                    alt={request.name}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid #e0e0e0'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, color: '#333' }}>{request.name}</h4>
                      <span style={{ 
                        backgroundColor: '#f0f8ff', 
                        color: '#0070f3', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '10px', 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold'
                      }}>
                        {request.connections} connections
                      </span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>{request.title}</p>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.8rem' }}>📍 {request.location}</p>
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '0.75rem', 
                      borderRadius: '6px', 
                      marginBottom: '0.5rem',
                      borderLeft: '3px solid #0070f3'
                    }}>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontStyle: 'italic', color: '#555' }}>
                        "{request.message}"
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#666' }}>
                      <span>👥 {request.mutual} mutual connections</span>
                      <span>🕒 {request.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '120px' }}>
                  <button style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    ✓ Accept
                  </button>
                  <button style={{ 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontSize: '0.8rem'
                  }}>
                    Ignore
                  </button>
                  <button style={{ 
                    backgroundColor: 'white', 
                    color: '#0070f3', 
                    border: '1px solid #0070f3', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontSize: '0.7rem'
                  }}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* People You May Know */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>🤝 People You May Know</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {suggestedFriends.map((friend) => (
              <div key={friend.id} style={{ 
                padding: '1.5rem', 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px', 
                backgroundColor: '#fff', 
                textAlign: 'center'
              }}>
                <img 
                  src={friend.avatar} 
                  alt={friend.name}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    marginBottom: '1rem',
                    border: '3px solid #e0e0e0'
                  }}
                />
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>{friend.name}</h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>{friend.title}</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.8rem' }}>📍 {friend.location}</p>
                <div style={{ 
                  backgroundColor: '#fff3cd', 
                  color: '#856404', 
                  padding: '0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem', 
                  marginBottom: '1rem'
                }}>
                  {friend.reason}
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#666' }}>
                  👥 {friend.mutual} mutual connections
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ 
                    backgroundColor: '#0070f3', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontSize: '0.8rem',
                    flex: 1
                  }}>
                    ➕ Connect
                  </button>
                  <button style={{ 
                    backgroundColor: 'white', 
                    color: '#6c757d', 
                    border: '1px solid #6c757d', 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontSize: '0.8rem'
                  }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>⚡ Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ 
              padding: '1.5rem', 
              border: '2px dashed #0070f3', 
              borderRadius: '8px', 
              backgroundColor: '#f0f8ff', 
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0070f3' }}>📧 Invite by Email</h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#666' }}>
                Send invitations to friends via email
              </p>
              <button style={{ 
                backgroundColor: '#0070f3', 
                color: 'white', 
                border: 'none', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                Send Invites
              </button>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              border: '2px dashed #28a745', 
              borderRadius: '8px', 
              backgroundColor: '#f0fff4', 
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>📱 Import Contacts</h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#666' }}>
                Find friends from your phone contacts
              </p>
              <button style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                Import Now
              </button>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              border: '2px dashed #6f42c1', 
              borderRadius: '8px', 
              backgroundColor: '#f8f5ff', 
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#6f42c1' }}>🔗 Share Profile</h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#666' }}>
                Share your profile link on social media
              </p>
              <button style={{ 
                backgroundColor: '#6f42c1', 
                color: 'white', 
                border: 'none', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                Copy Link
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