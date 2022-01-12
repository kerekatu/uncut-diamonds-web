import { fromUnixTime, format } from 'date-fns'
import { pl } from 'date-fns/locale'
import useSWR from 'swr'
import { FaunaResponse, Purchase } from 'types'

const PurchaseList = () => {
  const { data: purchases } = useSWR<FaunaResponse<Purchase>>(`/api/purchases`)

  if (!purchases) return <></>

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Ostatnio kupione</h2>
      <ul className="flex flex-col bg-zinc-900 rounded-xl px-8 py-4 divide-y divide-dashed divide-zinc-800">
        {Array.isArray(purchases?.data) &&
          purchases.data
            .sort((a, b) => b.ts - a.ts)
            .slice(0, 5)
            .map((purchase) => (
              <li key={purchase.ref.id} className="p-4">
                <div className="flex flex-col">
                  <span>
                    Użytkownik: <strong>{purchase.data.userId}</strong>
                  </span>
                  <span>
                    Przedmiot: <strong>{purchase.data.item.title}</strong>
                  </span>
                  <span>
                    Data:{' '}
                    <strong>
                      {format(
                        fromUnixTime(purchase.ts / 1000000),
                        'dd.MM.yyyy - HH:mm',
                        { locale: pl }
                      )}
                    </strong>
                  </span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default PurchaseList
