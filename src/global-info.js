// import './App.css';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect, useState, setState } from 'react';
import { useHistory } from 'react-router-dom';

function GlobalInfo(props) {
    console.log(props);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [sortModel, setSortModel] = useState([]);
    const [countryStates, setCountryStates] = useState({});
    const history = useHistory();
    useEffect(() => {
        console.log(props.covidData);
        setRows(getCountryDetails(props.covidData));
        setColumns([
            { field: 'name', headerName: 'Country', width: 150 },
            { field: 'capital', headerName: 'Capital city', width: 150 },
            { field: 'population', headerName: 'Population', type: 'number', width: 150 },
            { field: 'confirmed', headerName: 'Confirmed', type: 'number', width: 150, sort: 'desc' },
            { field: 'death', headerName: 'Deaths', type: 'number', width: 150, cellClassName: 'death-cell' },
            { field: 'recovered', headerName: 'Recovered', type: 'number', width: 150, cellClassName: 'recovered-cell' },
        ]);
        setSortModel([{ field: 'confirmed', sort: 'desc' }])
    }, [props.covidData]);

    function getCountryDetails(data) {
        let row = [];
        const indexValue = 'All';
        for (const iterator in data) {
            data[iterator][indexValue]?.country && row.push({
                name: data[iterator][indexValue].country,
                capital: data[iterator][indexValue].capital_city,
                population: data[iterator][indexValue].population,
                confirmed: data[iterator][indexValue].confirmed,
                death: data[iterator][indexValue].deaths,
                recovered: data[iterator][indexValue].recovered,
                states: {
                    ...data[iterator]
                }
            })
        }

        return row;
    }

    function onCountryClick(event) {
        setCountryStates(event.row);        
        history.push({
            pathname: `/country/${event.row.name}`,
            state: event.row.states
        });
    }

    return (
        <div className="info-table" style={{ height: 500, width: '100%' }}>
            <DataGrid getRowId={(row) => row.name} rows={rows}
                columns={columns}
                onRowClick={onCountryClick}
                pageSize={10} rowHeight={35} sortModel={sortModel} />
            {/* <CountryInfo data={countryStates} /> */}
        </div>

    );
};

export default GlobalInfo;

