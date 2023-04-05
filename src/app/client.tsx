'use client'
import type { ImpactAssessmentData } from '@/types'
import { useMemo, useState } from 'react'

interface Props {
  data: ImpactAssessmentData[]
}
const PAGE_SIZE = 10
export default function HomeClient ({ data }: Props) {
  const [page, setPage] = useState<number>(0)
  const [sort, setSort] = useState<keyof ImpactAssessmentData>('Company Name')
  const matches = useMemo(() => {
    // eslint-disable-next-line prefer-regex-literals, no-useless-escape
    const numberRegex = new RegExp(/[\$\(\)\,]/g, 'ig')
    return [...data].sort((a, b) => {
      const aVal = Number(String(a[sort]).replace(numberRegex, ''))
      const bVal = Number(String(b[sort]).replace(numberRegex, ''))
      if (!Number.isNaN(aVal) && !Number.isNaN(bVal)) {
      // if (typeof aVal === 'number' && typeof bVal === 'number') {
        return bVal - aVal
      }
      return (b[sort] as string).localeCompare(a[sort] as string)
      // return a[sort] > b[sort] ? 1 : -1
      // return String(a[sort]).localeCompare(String(b[sort]))
      // if (typeof a[sort] === 'number' && typeof b[sort] === 'number') {
      //   return a[sort] - (b[sort])
      // }
    }).slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  }, [sort, page, data])
  return (
    <main>
      <section className='overflow-x-auto'>
        <table>
          <thead>
            <tr>
              <th colSpan={3}></th>
              <th colSpan={2}>Women (Per 100)</th>
              <th colSpan={2}>CO2 SCOPE 1 & 2</th>
              <th colSpan={2}>CO2 SCOPE 3</th>
              <th/>
            </tr>
            <tr>
              <th className={sort === 'Company Name' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('Company Name') } }>Company Name</th>
              <th className={sort === 'Total Revenue' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('Total Revenue') } }>Total Company Revenue</th>
              <th className={sort === 'Company Market Cap' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('Company Market Cap') } }>Market Capitalization</th>
              <th className={sort === 'Women Managers' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('Women Managers') } }>Managers</th>
              <th className={sort === 'Women Employees' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('Women Employees') } }>Employees</th>
              <th className={sort === 'CO2 Scope 1 & 2 Adjusted' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('CO2 Scope 1 & 2 Adjusted') } }>Total</th>
              <th className={sort === 'CO2 Scope 1 & 2 Revenue Adjusted' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('CO2 Scope 1 & 2 Revenue Adjusted') } }>Rev Adj</th>
              <th className={sort === 'CO2 Scope 3 Adjusted' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('CO2 Scope 3 Adjusted') } }>Total</th>
              <th className={sort === 'CO2 Scope 3 Revenue Adjusted' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('CO2 Scope 3 Revenue Adjusted') } }>Rev Adj</th>
              <th className={sort === 'ESG Score' ? 'font-bold' : 'font-normal'} onClick={() => { setSort('ESG Score') } }>ESG Score</th>
            </tr>
          </thead>
            <tbody>
              {matches.map((row) => (
                <tr key={row['Company Name']}>
                  <td>{row['Company Name']}</td>
                  <td>{row['Total Revenue']}</td>
                  <td>{row['Company Market Cap']}</td>
                  <td>{row['Women Managers']}</td>
                  <td>{row['Women Employees']}</td>
                  <td>{row['CO2 Scope 1 & 2 Adjusted']}</td>
                  <td>{row['CO2 Scope 1 & 2 Revenue Adjusted']}</td>
                  <td>{row['CO2 Scope 3 Adjusted']}</td>
                  <td>{row['CO2 Scope 3 Revenue Adjusted']}</td>
                  <td className='flex gap-1 items-center justify-start w-96'>
                    <div style={{ width:50 }}>{Math.round(row['ESG Score'] * 100) / 100 }</div>
                    <div style={{
                      opacity: 1 - (1 - Math.round(row['ESG Score']) / 100),
                      width:`${Math.round(row['ESG Score'])}%`,
                      height:30,
                      backgroundColor:'springgreen'
                    }}/>
                  </td>
                </tr>)
              )}
            </tbody>
        </table>
      </section>
      <section>
        <div className='flex gap-2 justify-evenly mb-3'>
          {/* <button onClick={() => { setPage(page - PAGE_SIZE) }}>Prev</button> */}
          {new Array(Math.ceil(data.length / PAGE_SIZE))
            .fill(true)
            .map((_, index) =>
            <button
            className={index === page ? 'font-extrabold' : 'font-normal'}
              type="button"
              onClick={() => { setPage(index) }}
              key={index}>{index + 1}
            </button>)}
          {/* <button onClick={() => { setPage(page + PAGE_SIZE) }}>Next</button> */}
        </div>
      </section>
    </main>
  )
}
