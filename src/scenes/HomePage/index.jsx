import React from 'react'
import tabletLogo from '../../assets/tablet-logo.png'
import Header from './Header'
import Features from './Features'
import FreeGuide from './FreeGuide'
import SocialMedia from './SocialMedia'
import TopTools from './TopTools'
import NewsetProducts from './NewsetProducts'

const index = () => {
  return (
   <>
    <Header />
    <FreeGuide />
    <NewsetProducts /> 
    <Features />
    <TopTools />
    <SocialMedia />
   </>
  )
}

export default index