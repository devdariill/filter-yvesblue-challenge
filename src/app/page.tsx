import api from '@/api'
import HomeClient from './client'

export default async function Home () {
  const data = await api.impactAssessment.list()
  return (
    <HomeClient data={data}/>
  )
}
