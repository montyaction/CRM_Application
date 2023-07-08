import React from 'react';
import Sidebar from '../components/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';

export default function Admin() {
  return (
    <div className='min-vh-100 bg-light'>
      <div className='col-1'><Sidebar home='/' /></div>

        <div className='container'>
          <h3 className='text-ptimary text-center'>Welcome, {localStorage.getItem('name')}</h3>
          <p className='text-muted text-center'>Take a quick looks at your admin stats below.</p>

          {/* card */}
          <div className='row my-5 mx-2 text-center'>

            <div className='col-xs-12 col-lg-3 col-md-6 my-1'>
              <div className='card cardItem shadow bg-primary text-dark bg-opacity-25 borders-b' style={{ width: 15 + 'rem' }}>
                <div className='card-body'>
                  <h5 className='card-subtitle mb-2'><i className='bi bi-pencil text-primary mx-2'></i>Open</h5>
                  <hr />
                  <div className='row'>
                    <div className='col'>
                      <h1 className='col text-dark mx-4'>80</h1>
                    </div>
                    <div className='col'>
                      <div style={{ width: 40, height: 40 }}>
                        <CircularProgressbar value='80' styles={buildStyles({ textColor: 'red', pathColor: 'darkblue' })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xs-12 col-lg-3 col-md-6 my-1'>
              <div className='card shadow bg-warning text-dark bg-opacity-25 borders-y' style={{ width: 15 + 'rem' }}>
                <div className='card-body'>
                  <h5 className='card-subtitle mb-2'><i className='bi bi-lightning-charge text-warning mx-2'></i>Progress</h5>
                  <hr />
                  <div className='row'>
                    <div className='col'>
                      <h1 className='col text-dark mx-4'>65</h1>
                    </div>
                    <div className='col'>
                      <div style={{ width: 40, height: 40 }}>
                        <CircularProgressbar value='65' styles={buildStyles({ textColor: 'red', pathColor: 'darkgoldenrod' })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xs-12 col-lg-3 col-md-6 my-1'>
              <div className='card shadow bg-succes text-dark bg-opacity-25 borders-g' style={{ width: 15 + 'rem' }}>
                <div className='card-body'>
                  <h5 className='card-subtitle mb-2'><i className='bi bi-check2-circle text-success mx-2'></i>Closed</h5>
                  <hr />
                  <div className='row'>
                    <div className='col'>
                      <h1 className='col text-dark mx-4'>70</h1>
                    </div>
                    <div className='col'>
                      <div style={{ width: 40, height: 40 }}>
                        <CircularProgressbar value='70' styles={buildStyles({ textColor: 'red', pathColor: 'darkolivegreen' })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xs-12 col-lg-3 col-md-6 my-1'>
              <div className='card shadow bg-secondary text-dark bg-opacity-25 borders-grey' style={{ width: 15 + 'rem' }}>
                <div className='card-body'>
                  <h5 className='card-subtitle mb-2'><i className='bi bi-pencil text-primary mx-2'></i>Blocked</h5>
                  <hr />
                  <div className='row'>
                    <div className='col'>
                      <h1 className='col text-dark mx-4'>85</h1>
                    </div>
                    <div className='col'>
                    <div style={{ width: 40, height: 40 }}>
                        <CircularProgressbar value='85' styles={buildStyles({ textColor: 'red', pathColor: 'black' })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <hr />

          <div className='text-success'>message</div>

          {/* <MuiThemeProvider theme={theme}> */}
            <MaterialTable 
              onRowClick={(event, rowData) => fetchUsers(rowData.userId)}
              data={userList}
              columns={[]}
              options={{}}
              title='USER RECORDS'
            />
          {/* </MuiThemeProvider> */}
          <br />
          <div className='text-success'>message</div>

          <MaterialTable 
              onRowClick={(event, rowData) => editTicket(rowData)}
              data={ticketDetails}
              columns={[]}
              options={{}}
              title='TICKETS RECORD'
          />

        </div>

    </div>
  )
}
