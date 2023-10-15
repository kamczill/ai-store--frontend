import React from 'react'
import { Disclosure } from '@headlessui/react'
import { BsChevronCompactUp } from 'react-icons/bs'
import { questionsAndAnswers } from '../../assets/questionsAndAnswers'

const FAQ = () => {
  return (
    <div className="w-full px-5 py-12 flex flex-col gap-8">
        <div>
                <h2 className='text-3xl text-center'>FAQ</h2>
        </div>
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white px-2">
        {questionsAndAnswers?.map((object, idx) => (
            <Disclosure as="div" className={`mt-4 ${idx === questionsAndAnswers.length -1 ? 'mb-2': ''}`}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-600 px-4 py-4 text-left text-white text-md font-ms font-medium hover:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{object.question}</span>
                  <BsChevronCompactUp
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 font-ms" >
                    {object.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
        
      </div>
    </div>
  )
}

export default FAQ