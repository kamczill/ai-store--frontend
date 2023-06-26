import React from 'react'
import AiTool from '../../components/AiTool'
import icon1 from '../../assets/icon-1.png'
import icon2 from '../../assets/icon-2.png'
import icon3 from '../../assets/icon-3.png'
import icon4 from '../../assets/icon-4.png'

const TopTools = () => {
  return (
    <div class='flex justify-center items-center'>
        <div class='flex flex-col max-w-[1200px]'>
            <div>
                <h2 class='text-3xl mt-12 text-center'>Najlepsze narzędzia AI</h2>
            </div>
            <div class='mt-10 grid gap-10 lg:grid-cols-2'>
                <AiTool 
                    icon={icon1}
                    name='Glam'
                    description='Ai Video Generator blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
                    href='dsda'
                />
                <AiTool 
                    icon={icon2}
                    name='Glam'
                    description='Ai Video Generator blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
                    href='dsda'
                />
                <AiTool 
                    icon={icon3}
                    name='Glam'
                    description='Ai Video Generator blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
                    href='dsda'
                />
                <AiTool 
                    icon={icon4}
                    name='Glam'
                    description='Ai Video Generator blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
                    href='dsda'
                />
            </div>
        </div>
    </div>
  )
}

export default TopTools