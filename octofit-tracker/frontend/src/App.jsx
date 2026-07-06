import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiOrigin = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="container py-4 text-start">
      <header className="mb-4">
        <h1 className="h3 mb-2">OctoFit Tracker</h1>
        <p className="text-muted mb-3">
          React 19 presentation tier connected to the OctoFit API.
        </p>
        {!codespaceName && (
          <div className="alert alert-warning py-2 mb-3" role="alert">
            VITE_CODESPACE_NAME is not set. Using localhost fallback: {apiOrigin}
          </div>
        )}
        <div className="small text-body-secondary mb-3">
          API origin: <span className="fw-semibold">{apiOrigin}</span>
        </div>
        <nav className="nav nav-pills gap-2 flex-wrap">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-body-secondary'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
