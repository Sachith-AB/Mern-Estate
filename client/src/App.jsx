import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Headers from './components/Headers';
import CreateListing from './pages/createListing';
import PrivateRoute from './components/PrivateRoute';
import UpdateListing from './pages/UpdateListing';
import Listing_Page from './pages/Listing_Page';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
    <Headers/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
        </Route>
        <Route path='/listing/:listingId' element={<Listing_Page/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  )
}
