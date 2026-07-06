import { useEffect, useState } from 'react'
import { extractItems, formatReference, getEndpoint } from './apiClient'

function Users() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getEndpoint('users'), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`)
        }

        const payload = await response.json()
        setItems(extractItems(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unknown error while loading users')
          setItems([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <h2 className="h4">Users</h2>
      {loading && <p>Loading users...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Fitness Level</th>
                <th>Goals</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No users found.
                  </td>
                </tr>
              )}
              {items.map((user) => (
                <tr key={user._id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.fitnessLevel}</td>
                  <td>{Array.isArray(user.goals) ? user.goals.join(', ') : 'N/A'}</td>
                  <td>{formatReference(user.team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
