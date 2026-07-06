import { useEffect, useState } from 'react'
import { extractItems, getEndpoint } from './apiClient'

function Teams() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getEndpoint('teams'), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`)
        }

        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unknown error while loading teams')
          setItems([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <h2 className="h4">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Focus</th>
                <th>Motto</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No teams found.
                  </td>
                </tr>
              )}
              {items.map((team) => (
                <tr key={team._id || team.name}>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{team.focus}</td>
                  <td>{team.motto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
