import axios from 'axios'
import React, { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API

export default function Dashboard({ token }) {
  console.log(token)
  const [data, setData] = useState([])
  async function getData() {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/foods`,
        headers: {
          'CF-Access-Client-Id': '8853ca70ca342d5659242857edb234de.access',
          'CF-Access-Client-Secret':
            'eec6df88a2637183a3df2171f944a2b58eed7ed645eb368edb51437ee8cdd777',
          Authorization: `Bearer ${token}`,
        },
      }
      axios
        .request(config)
        .then((response) => {
          console.log(response)
          setData(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (errors) {}
  }
  useEffect(() => {
    getData()

    return () => setData([])
  }, [])

  console.log(data)
  return (
    <div className='rounded-3xl bg-white shadow-[0_2px_20px_0_rgba(0,0,0,0.2)] px-10 py-8'>
      <div className='py-4 mb-6'>
        <p className='text-[28px] text-[#5B5B56] text-left'>Dashboard</p>
      </div>
      <div>
        <p className='text-[#393934] text-xs mb-6 text-left'>
          Selamat datang user@user.com
        </p>
        <p className='text-[#393934] text-xs mb-2 text-left'>Daftar makanan</p>
        <ul className='list-disc px-4'>
          {data.map((d) => (
            <li key={d.id} className='text-[#393934] text-xs text-left'>{d.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
