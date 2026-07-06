export function getApiOrigin() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
}

export function getEndpoint(resourceName) {
  return `${getApiOrigin()}/api/${resourceName}/`
}

export function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const directCollections = [
    payload.items,
    payload.data,
    payload.results,
    payload.docs,
    payload.records,
    payload.rows,
  ]

  for (const collection of directCollections) {
    if (Array.isArray(collection)) {
      return collection
    }
  }

  const nestedCollections = [payload.items, payload.data, payload.pagination]

  for (const container of nestedCollections) {
    if (!container || typeof container !== 'object') {
      continue
    }

    const candidates = [
      container.items,
      container.data,
      container.results,
      container.docs,
      container.records,
      container.rows,
    ]

    for (const collection of candidates) {
      if (Array.isArray(collection)) {
        return collection
      }
    }
  }

  return []
}

export function formatReference(value, field = 'name') {
  if (value && typeof value === 'object') {
    return value[field] ?? value.title ?? value._id ?? 'N/A'
  }

  return value ?? 'N/A'
}
