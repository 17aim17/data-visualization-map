import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux';
import { Backdrop, CircularProgress, Container, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import _ from 'lodash'

import ChangeView from './ChangeView';
import Tile from './Tile'
import { calculateUserAnalytics } from './action'
import './App.css';

function App({ users, areas, areas_by_id, user_area_analytics, total, calculateUserAnalytics }) {

  const [selectedArea, setArea] = useState('All')

  useEffect(() => {
    if (!_.isEmpty(users) && !_.isEmpty(areas) && !_.isEmpty(areas_by_id)) {
      calculateUserAnalytics()
    }
  }, [users, areas, areas_by_id])

  if (_.isEmpty(areas) || _.isEmpty(areas_by_id) || users.length === 0) {
    return (
      <Backdrop className="backdrop" open>
        <CircularProgress size={20} color="primary" />
      </Backdrop>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <MapContainer center={[12.9716, 77.5946]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh' }}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
          />
          {
            selectedArea !== 'All' && !_.isEmpty(user_area_analytics) ?
              <ChangeView
                selectedArea={selectedArea}
                isSelected={true}
                color="#0984e3"
                coordinates={areas_by_id[selectedArea].geometry.coordinates}
                areaName={`${areas_by_id[selectedArea].properties.name} - ${areas_by_id[selectedArea].properties.pin_code}`}
                totalusers={user_area_analytics[selectedArea].totalUsersByArea}
                proUsers={user_area_analytics[selectedArea].proUsersByArea}
                ratio={(user_area_analytics[selectedArea].totalMalesByArea / user_area_analytics[selectedArea].totalFemalesByArea).toFixed(2)}
              /> :
              <>
                {
                  !_.isEmpty(user_area_analytics) && Object.keys(areas_by_id).map(areaId => {
                    return (
                      <ChangeView
                        key={areaId}
                        selectedArea={areaId}
                        color={user_area_analytics[areaId].color}
                        coordinates={areas_by_id[areaId].geometry.coordinates}
                        areaName={`${areas_by_id[areaId].properties.name} - ${areas_by_id[areaId].properties.pin_code}`}
                        totalusers={user_area_analytics[areaId].totalUsersByArea}
                        proUsers={user_area_analytics[areaId].proUsersByArea}
                        ratio={(user_area_analytics[areaId].totalMalesByArea / user_area_analytics[areaId].totalFemalesByArea).toFixed(2)}
                      />
                    )
                  })
                }
              </>
          }
        </MapContainer>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Container>
          <FormControl style={{ maxWidth: '100%', width: '100%', margin: '10px auto' }}>
            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              variant='outlined'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedArea}
              onChange={(event) => setArea(event.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {
                Object.keys(areas_by_id).map(areaId =>
                  <MenuItem key={areaId} value={areaId}>{areas_by_id[areaId].properties.name} - {areas_by_id[areaId].properties.pin_code}</MenuItem>
                )
              }
            </Select>
          </FormControl>

          {
            selectedArea !== 'All' && !_.isEmpty(user_area_analytics) && <>
              <Tile
                totalUser={user_area_analytics[selectedArea].totalUsersByArea}
                proUser={user_area_analytics[selectedArea].proUsersByArea}
                males={user_area_analytics[selectedArea].totalMalesByArea}
                females={user_area_analytics[selectedArea].totalFemalesByArea}
                proMales={user_area_analytics[selectedArea].proMalesByArea}
                proFemales={user_area_analytics[selectedArea].proFemalesByArea}
              />
            </>
          }
        </Container>
      </Grid>

      {/* <div>
        {
          data &&
          <div>
            <Chart data={data} selectedArea={selectedArea} />
              </div>

        }
      </div > */}

    </Grid >
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    areas: state.areas,
    areas_by_id: state.analytics.areas_by_id,
    user_area_analytics: state.analytics.user_area_analytics,
    total: state.analytics.total
  }
}

export default connect(mapStateToProps, { calculateUserAnalytics })(App);
