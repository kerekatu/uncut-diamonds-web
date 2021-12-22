import Layout from '@/components/Layout'
import { addSpaceEveryCharacter } from '@/libshelpers'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const Shop = () => {
  const { data: users } = useSWR('/api/users/')
  const { data: shop } = useSWR('/api/shop')
  const { data: session } = useSession()
  const [selectedItem, setSelectedItem] = useState('')

  if (!users || !shop) return <></>

  return (
    <Layout pageTitle="Sklep">
      <section>
        <ul className="grid grid-cols-4 gap-12">
          {shop?.data.length > 1 ? (
            shop.data.map((item) => (
              <li
                className={`border-2  bg-zinc-900 rounded-xl px-8 py-4 cursor-pointer ${
                  selectedItem === item.ref['@ref'].id
                    ? 'border-green-600'
                    : 'border-zinc-700 hover:border-green-600 hover:border-opacity-30'
                }`}
                key={item.ref['@ref'].id}
                onClick={() =>
                  selectedItem === item.ref['@ref'].id
                    ? setSelectedItem('')
                    : setSelectedItem(item.ref['@ref'].id)
                }
              >
                <div className="flex flex-col h-full">
                  <span className="text-2xl font-bold">{item.data.title}</span>
                  <span className="font-light leading-6">
                    {item.data.description}
                  </span>
                  <span className="flex items-center gap-1 mt-auto self-end">
                    Cena: {addSpaceEveryCharacter(item.data.price)}
                    <Image
                      src="/static/diament.png"
                      alt="Uncut Diamonds Currency Symbol"
                      width={16}
                      height={16}
                      quality={100}
                    />
                  </span>
                  {/* <span>{item.data.stock}</span> */}
                </div>
              </li>
            ))
          ) : (
            <li>{shop.data[0].title}</li>
          )}
        </ul>
      </section>
    </Layout>
  )
}

export default Shop
