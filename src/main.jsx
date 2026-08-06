import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext/AuthContext'
import { MovieContextProvider } from './context/movieContext/MovieContext.jsx'
import { MovieListContextProvider } from './context/movieListContext/MovieListContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <MovieListContextProvider>
          <App />
        </MovieListContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
