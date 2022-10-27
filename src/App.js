import React, { createContext, useReducer } from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import musicdata from './Musicdata';
import Music from './components/Music'

export const musicContext = createContext();
const App = () => {
    return (
        <>
      <musicContext.Provider value={musicdata}>
        <Music />
      </musicContext.Provider>
    </>
  )
}

export default App