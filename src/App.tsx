import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [expandedUsers, setExpandedUsers] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.error('Erreur:', error))
  }, [])

  const toggleExpand = (index) => {
    setExpandedUsers(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
  }

  return (
    <section className="card-grid">
      <h1>10 premiers utilisateurs</h1>
      <div className="cards-container">
        {users.map((user, index) => (
          <div key={index} className="card">
            <img src={user.picture.large} alt={`User ${index + 1}`} className="avatar" />
            <div className={`card-content ${expandedUsers.includes(index) ? 'expanded' : ''}`}>
              <h3>{`${user.name.first} ${user.name.last}`}</h3>
              {expandedUsers.includes(index) && (
                <>
                  <p>Email: {user.email}</p>
                  <p>Nationalité: {user.nat}</p>
                  <p>Âge: {user.dob.age}</p>
                </>
              )}
              <button onClick={() => toggleExpand(index)} className="expand-button">
                {expandedUsers.includes(index) ? '-' : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
