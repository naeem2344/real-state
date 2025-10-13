import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/Loader';
const Navebar = lazy(() => import('./components/Navebar'));
const RealState = lazy(() => import('./pages/RealState'));
const AutoMobile = lazy(() => import('./pages/AutoMobile'));
const AutoMobileScanner = lazy(() => import('./pages/AutoMobileScanner'));
const RealStateScanner = lazy(() => import('./pages/RealStateScanner'));

const App = () => {
  return (
    <React.Fragment>
      <Navebar />
      <Suspense fallback={<><Loader /></>}>
        <Routes>
          <Route index element={<><RealState /></>} />
          <Route path='/auto-moble' element={<><AutoMobile /></>} />
          <Route path='/auto-moble-scanner' element={<><AutoMobileScanner /></>} />
          <Route path='/real-state-scanner' element={<><RealStateScanner /></>} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default App