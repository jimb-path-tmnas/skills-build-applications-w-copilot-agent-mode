import { useEffect, useState } from 'react'
import { extractItems } from './apiClient'

function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`)
        }

        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unknown error while loading workouts')
          setItems([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Duration (min)</th>
                <th>Target Muscles</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No workouts found.
                  </td>
                </tr>
              )}
              {items.map((workout) => (
                <tr key={workout._id || workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.category}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.durationMinutes}</td>
                  <td>
                    {Array.isArray(workout.targetMuscles)
                      ? workout.targetMuscles.join(', ')
                      : 'N/A'}
                  </td>
                  <td>{workout.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
