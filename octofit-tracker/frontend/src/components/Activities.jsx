import { useEffect, useState } from 'react'
import { extractItems, formatReference } from './apiClient'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`)
        }

        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unknown error while loading activities')
          setItems([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-muted">
                    No activities found.
                  </td>
                </tr>
              )}
              {items.map((activity) => (
                <tr key={activity._id || `${activity.type}-${activity.performedAt}`}>
                  <td>
                    {activity.performedAt
                      ? new Date(activity.performedAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>{formatReference(activity.user)}</td>
                  <td>{formatReference(activity.team)}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.distanceKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
