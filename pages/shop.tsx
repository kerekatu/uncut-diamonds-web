import Layout from '@/components/Layout'
import { useModal } from '@/hooks/useModal'
import { addSpaceEveryCharacter } from '@/libs/helpers'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import PurchaseList from '@/components/PurchaseList'

const Modal = dynamic(() => import('@/components/Modal'))

// TODO: add types

interface ISelectedItem {
  id: string
  title: string
  price: number
}

const Shop = () => {
  const { data: session } = useSession()
  const { data: shop } = useSWR('/api/shop')
  const { data: user } = useSWR(`/api/users/${session?.user.id}`)
  const [selectedItem, setSelectedItem] = useState<ISelectedItem | null>(null)
  const { modalOpen, handleToggle, handleCancel } = useModal()

  if (!user && !shop) return <></>

  const isAffordable = (item: ISelectedItem): boolean =>
    item && item!.price <= user?.data.bank

  const handleAccept = async () => {
    const purchase = await fetch('/api/shop', {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: session?.user.id,
        item: selectedItem?.id,
        ref: session?.user.ref,
      }),
    })
    const response = await purchase.json()

    if (response.status === '200') {
      toast.success(`Przedmiot "${selectedItem?.title}" został kupiony`)
      handleCancel()
      setSelectedItem(null)
    } else {
      toast.error(`Coś poszło nie tak. Spróbuj ponownie`)
      handleCancel()
      setSelectedItem(null)
    }
  }

  return (
    <>
      <Layout pageTitle="Sklep">
        <section
          className={`flex flex-col gap-6 ${
            selectedItem || !session ? 'mb-16' : ''
          }`}
        >
          <ul className="grid gap-8 lg:gap-12 lg:grid-cols-2 xl:grid-cols-3">
            {shop?.data.length > 1 ? (
              shop.data
                .sort((a: any, b: any) => a.data.price - b.data.price)
                .map((item: any) => (
                  <li
                    className={`border-2 bg-zinc-900 rounded-xl px-8 py-4 cursor-pointer border-zinc-700 ${
                      isAffordable(item.data) &&
                      (selectedItem?.id === item.ref['@ref'].id
                        ? '!border-green-600'
                        : 'hover:border-green-600 hover:border-opacity-30')
                    } ${
                      !isAffordable(item.data)
                        ? 'opacity-50 cursor-default'
                        : ''
                    }`}
                    key={item.ref['@ref'].id}
                    onClick={() =>
                      isAffordable(item.data) &&
                      (selectedItem?.id === item.ref['@ref'].id
                        ? setSelectedItem(null)
                        : setSelectedItem({
                            id: item.ref['@ref'].id,
                            title: item.data.title,
                            price: item.data.price,
                          }))
                    }
                  >
                    <div className="flex flex-col h-full">
                      <span className="text-2xl font-bold">
                        {item.data.title}
                      </span>
                      <span className="font-light leading-6 mb-auto">
                        {item.data.description}
                      </span>
                      <div className="flex justify-between items-center mt-6 w-full">
                        <span>
                          Ilość:{' '}
                          {item.data.stock === 'Infinite'
                            ? '∞'
                            : item.data.stock}
                        </span>
                        <span className="flex items-center gap-1">
                          Cena: {addSpaceEveryCharacter(item.data.price)}
                          <Image
                            src="/static/diament.png"
                            alt="Uncut Diamonds Currency Symbol"
                            width={16}
                            height={16}
                            quality={100}
                          />
                        </span>
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li>{shop?.data[0].title}</li>
            )}
          </ul>
          {!session ? (
            <div className="fixed bottom-0 inset-x-0 bg-zinc-900 w-full px-10 p-6 flex items-center justify-center  font-bold gap-2 h-24 z-10 text-lg md:text-2xl">
              <a
                href="/api/auth/signin"
                className="text-green-500 underline transition-colors hover:text-green-600"
                onClick={(e) => {
                  e.preventDefault()
                  signIn('discord')
                }}
              >
                Zaloguj się
              </a>{' '}
              by skorzystać ze sklepu
            </div>
          ) : (
            selectedItem && (
              <div className="block fixed bottom-0 right-0 bg-zinc-900 w-full px-10 p-6 gap-2 h-24">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1">
                      <strong>Do zapłaty:</strong>{' '}
                      {addSpaceEveryCharacter(selectedItem!.price)}{' '}
                      <Image
                        src="/static/diament.png"
                        alt="Uncut Diamonds Currency Symbol"
                        width={16}
                        height={16}
                        quality={100}
                      />{' '}
                      ({user.data.bank - selectedItem!.price})
                    </span>
                    <span className="flex gap-1">
                      <strong>Wybrane:</strong>
                      {selectedItem!.title}
                    </span>
                  </div>
                  <button
                    className={`bg-green-600 px-24 py-2 rounded-xl text-white font-bold text-xl transition-all ${
                      selectedItem
                        ? 'opacity-100 cursor-pointer hover:bg-green-500'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={handleToggle}
                  >
                    Kup
                  </button>
                </div>
              </div>
            )
          )}
          <PurchaseList />
        </section>
        <Toaster />
      </Layout>

      {modalOpen && selectedItem ? (
        <Modal
          acceptButton={{ title: 'Akceptuj', handleAccept }}
          cancelButton={{ title: 'Anuluj', handleCancel }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            Kupujesz: {selectedItem.title}
            <div className="flex text-lg font-normal">
              <span className="flex items-center gap-1 mr-2">
                {addSpaceEveryCharacter(selectedItem.price)}
                <Image
                  src="/static/diament.png"
                  alt="Uncut Diamonds Currency Symbol"
                  width={16}
                  height={16}
                  quality={100}
                />
              </span>
              zostanie pobrane z twojego konta!
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default Shop
