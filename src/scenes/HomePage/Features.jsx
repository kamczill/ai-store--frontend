import Feature from '../../components/Feature'
import {AiOutlineFilePdf, AiOutlineArrowRight, AiOutlineArrowDown } from 'react-icons/ai'
import {VscAccount } from 'react-icons/vsc'
import {BsFillCartCheckFill } from 'react-icons/bs'

const Features = () => {
  return (
    <div className='py-12 px-5 bg-gray-200 '>
        <h2 className='text-3xl text-center'>Jak to działa?</h2>
        <div className='flex justify-center'>
        <p className='max-w-[1200px] text-center text-lg font-ms pt-8'>
        Umożliwiamy nie tylko zakup e-booków i plików PDF z szerokiej gamy tytułów, ale także bezpośredni odczyt zawartości na platformie. Intuicyjny interfejs i zaawansowane funkcje sprawiają, że lektura staje się prawdziwą przyjemnością, łącząc zakupy i czytanie w jednym miejscu.
        </p>
        </div>
        <div className='flex flex-col gap-10 justify-center items-center mt-8 px-5 lg:flex-row'>
          <Feature headline='Załóż konto' text='W prosty sposób!' img={<VscAccount size={100} color={'#ffffff'}/>}/>
          <AiOutlineArrowRight size={40} className='hidden lg:block' />
          <AiOutlineArrowDown size={40} className='lg:hidden' />
          <Feature headline='Złóż zamówienie' text='Realizowane natychmiast' img={<BsFillCartCheckFill size={100} color={'#ffffff'}/>}/>
          <AiOutlineArrowRight size={40} className='hidden lg:block'/>
          <AiOutlineArrowDown size={40} className='lg:hidden' />
          <Feature headline='Korzystaj!' text='Pobierz lub Otwórz' img={<AiOutlineFilePdf size={100} color={'#ffffff'}/>}/>
        </div>
    </div>
  )
}

export default Features