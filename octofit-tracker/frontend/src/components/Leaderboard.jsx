import { useEffect, useState } from 'react'
import { extractItems, formatReference } from './apiClient'

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`)
        }

        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unknown error while loading leaderboard')
          setItems([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Period</th>
                <th>Metric</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No leaderboard entries found.
                  </td>
                </tr>
              )}
              {items.map((entry) => (
                <tr key={entry._id || `${entry.rank}-${entry.score}-${entry.period}`}>
                  <td>{entry.rank}</td>
                  <td>{formatReference(entry.user)}</td>
                  <td>{formatReference(entry.team)}</td>
                  <td>{entry.period}</td>
                  <td>{entry.metric}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
