'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/actions/auth'

export default function Test() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const userData = await getUser()
      setData(userData)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8" style={{ background: '#1A0800', color: '#F0C040', minHeight: '100vh' }}>
      <h1 className="text-2xl font-bold mb-6">Debug User Info</h1>
      <pre className="bg-[#2C1A0E] p-4 rounded-lg overflow-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
      {data?.profile && (
        <div className="mt-4 p-4 bg-[#3D2010] rounded-lg">
          <p><strong>User Role:</strong> <span style={{ color: data.profile.role === 'admin' ? '#6A9A5A' : '#C1440E' }}>{data.profile.role}</span></p>
          {data.profile.role !== 'admin' && (
            <p className="mt-2 text-[#C1440E]">⚠️ You need role = 'admin' to access the admin dashboard</p>
          )}
        </div>
      )}
      {!data?.user && (
        <div className="mt-4 p-4 bg-[#3D2010] rounded-lg">
          <p style={{ color: '#C1440E' }}>⚠️ You are NOT logged in!</p>
        </div>
      )}
    </div>
  )
}