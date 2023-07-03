import React from 'react'
import featureAvatar from './../../assets/feature-avatar-1.svg'

import Feature from '../../components/Feature'
const Features = () => {
  return (
    <div class='py-6'>
        <h2 class='text-3xl mt-4 text-center'>Dlaczego warto?</h2>
        <div class='flex flex-col gap-10 justify-center items-center mt-10 px-5 pb-8 lg:flex-row'>
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
    </div>
  )
}

export default Features