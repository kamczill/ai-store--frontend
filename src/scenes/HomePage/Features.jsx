import React from 'react'
import featureAvatar from './../../assets/feature-avatar-1.svg'

import Feature from '../../components/Feature'
const Features = () => {
  return (
    <>
        <h2 class='text-3xl mt-12 text-center'>Dlaczego warto?</h2>
        <div class='flex flex-col gap-10 justify-center items-center mt-10 px-5 lg:flex-row'>
            <Feature 
                img={featureAvatar}
                headline='Lorem ipsum'
                text='Lorem ipsum Lorem ipsum Lorem ipsum'
            />
            <Feature 
                img={featureAvatar}
                headline='Lorem ipsum'
                text='Lorem ipsum Lorem ipsum Lorem ipsum'
            />
            <Feature 
                img={featureAvatar}
                headline='Lorem ipsum'
                text='Lorem ipsum Lorem ipsum Lorem ipsum'
            />
        </div>
    </>
  )
}

export default Features