import React from 'react'
import AiTool from '../../components/AiTool'
import icon1 from '../../assets/icon-1.png'
import icon2 from '../../assets/icon-2.png'
import icon3 from '../../assets/icon-3.png'
import icon4 from '../../assets/icon-4.png'

const TopTools = () => {
  return (
    <div className='flex justify-center items-center font-poppins p-5 py-12'>
        <div className='flex flex-col max-w-[1200px] '>
            <div>
                <h2 className='text-3xl text-center'>Polecane narzędzia AI</h2>
            </div>
            <div className='mt-8 grid gap-8 lg:grid-cols-3 lg:grid-rows-2 lg:max-h-[700px]'>
                <AiTool 
                    icon={icon1}
                    name='Midjourney'
                    description='Midjourney to niezwykle popularny ostatnimi czasy generator obrazów, bazujący na sztucznej inteligencji. Na podstawie komunikatu tekstowego, wprowadzanego przez użytkownika (tzw. promptu) tworzy on wizualizacje, które oddają rzeczywistość bądź wręcz przeciwnie – stanowią jej fantazyjną, niekiedy wręcz surrealistyczną wizję. '
                    href='dsda'
                    grid='lg:col-span-2'
                    smallImage
                />
                <AiTool 
                    icon={icon2}
                    name='ChatGPT'
                    description='GPT-4 stanowi następną ewolucję w rodzinie modeli językowych GPT. To model uczenia głębokiego, który bazuje na architekturze transformerowej, gwarantującej jego zdolności do przetwarzania ogromnych ilości informacji w niemal natychmiastowym tempie. Dzięki temu GPT-4 osiąga niezwykłe rezultaty w generowaniu tekstu oraz analizie języka naturalnego.

                    Model ten przewyższa swojego poprzednika, GPT-3, pod względem jakości generowanych odpowiedzi, zrozumienia kontekstu i zdolności adaptacyjnych. W porównaniu z wcześniejszymi wersjami, GPT-4 jest bardziej odporny na wprowadzanie w błąd, redukuje błędy oraz generuje bardziej koherentne i precyzyjne odpowiedzi na szeroką gamę zapytań.'
                    href='dsda'
                    grid='lg:row-span-2'
                />
                <AiTool 
                    icon={icon3}
                    name='DALL-E 2'
                    description='Model uczenia maszynowego zdolny do tworzenia nowych, oryginalnych obrazów na podstawie podanych mu opisów tekstowych. Dall-e 2 zapewnia lepszą jakość generowanych obrazów i bardziej złożone wizualizacje.'
                    href='dsda'
                />
                <AiTool 
                    icon={icon4}
                    name='D-ID'
                    description='Technologia służąca do ochrony tożsamości poprzez modyfikowanie twarzy na zdjęciach w taki sposób, aby były trudne do rozpoznania dla algorytmów rozpoznawania twarzy, zachowując jednocześnie naturalny wygląd.'
                    href='dsda'
                />
            </div>
        </div>
    </div>
  )
}

export default TopTools