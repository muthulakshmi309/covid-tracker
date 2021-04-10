import { DataGrid } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function CountryInfo(props) {
  const location = useLocation();
  const countryDetails = location.state;
  const countryDesc = countryDetails.All;
  let imgPath = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/' + countryDesc.abbreviation + '.svg';

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  useEffect(() => {
    setRows(getStateDetails(countryDetails));
    setColumns([
      { field: 'name', headerName: 'States', width: 150 },
      { field: 'confirmed', headerName: 'Confirmed', type: 'number', width: 150, sort: 'desc' },
      { field: 'death', headerName: 'Deaths', type: 'number', width: 150, cellClassName: 'death-cell' },
      { field: 'recovered', headerName: 'Recovered', type: 'number', width: 150, cellClassName: 'recovered-cell' }
    ]);
    setSortModel([{ field: 'confirmed', sort: 'desc' }])
  }, [countryDetails]);

  function getStateDetails(data) {
    let states = [];
    for (const iterator in data) {
      countryDesc.updated = data[iterator].updated;
      iterator !== 'All' && states.push({
        name: iterator,
        confirmed: data[iterator].confirmed,
        death: data[iterator].deaths,
        recovered: data[iterator].recovered
      })
    }
    return states;
  }

  function formatNumber(value) {
    return Number(value).toLocaleString();
  }

  return (
    <div>
      <section className='country-details'>
        <div className="column">
          <img className="flag" src={imgPath} />
          <h2>{countryDesc.country}</h2>
        </div>
        <div className="column-second">
          <div className="column">
            <div className="row"><label>Capital: </label><span>{countryDesc.capital_city}</span></div>
            <div className="row"><label>Updated on: </label><span>{new Date(countryDesc.updated).toDateString()}</span></div>
          </div>
          <div className="column">
            <div className="row"><label>Population: </label><span>{formatNumber(countryDesc.population)}</span></div>
            <div className="row"><label>Confirmed: </label><span>{formatNumber(countryDesc.confirmed)}</span></div>
          </div>
          <div className="column">
            <div className="row"><label>Deaths: </label><span>{formatNumber(countryDesc.deaths)}</span></div>
            <div className="row"><label>Recovered: </label><span>{formatNumber(countryDesc.recovered)}</span></div>
          </div>
        </div>
      </section>

      <div className="countries info-table" style={{ height: 500, width: 650 }}>
        <DataGrid getRowId={(row) => row.name} rows={rows}
          columns={columns}
          pageSize={10} rowHeight={35} sortModel={sortModel} />
      </div>
    </div>
  );
};

export default CountryInfo;

