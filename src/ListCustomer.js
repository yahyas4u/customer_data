import React from 'react'
import dataArray from "./CustList.json";
function ListCustomer() {
const [data,setData] = React.useState(dataArray);
  return (
    data && data.map(dt=> <div key={dt.id}>{JSON.stringify(dt)}</div>)
  )
}

export default ListCustomer