import DATA from '@/data.json'

export default function Home () {
  return (
    <main >
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
            <th>Company Name</th>
            <th>Total Company Revenue</th>
            <th>Market Capitalization</th>
            <th>Managers</th>
            <th>Employees</th>
            <th>Total</th>
            <th>Rev Adj</th>
            <th>Total</th>
            <th>Rev Adj</th>
            <th>ESG Score</th>
          </tr>
        </thead>
          <tbody>
            {DATA.map((row) => (
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
                <td>{row['ESG Score']}</td>
              </tr>)
            )}
          </tbody>
      </table>
    </main>
  )
}
