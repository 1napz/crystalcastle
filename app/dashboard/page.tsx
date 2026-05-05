'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/devops')
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 DevOps Dashboard</h1>

      <h2>CI Status</h2>
      <p>{data.ciStatus}</p>

      <h2>Last Commit</h2>
      <p>{data.lastCommit}</p>

      <h2>Vercel</h2>
      <p>{data.vercelStatus}</p>

      <h2>PRs</h2>
      <ul>
        {data.prs.map((pr: any) => (
          <li key={pr.id}>
            #{pr.number} - {pr.title}
          </li>
        ))}
      </ul>
    </div>
  )
}