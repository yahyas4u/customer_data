import React, {useState,useEffect} from 'react';


function DataList(){
    const [custList,setCustList] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(result => setCustList(result))
    .catch(error => console.error(error));
  },[])

    return  <div>
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
                {
                    custList && custList.length>0 ?
                    custList.map(cust =>
                        <tr>
                            <td>{cust.id}</td>
                            <td>{cust.name}</td>
                            <td>{cust.username}</td>
                            <td>{cust.email}</td>
                        </tr>
                    )
                    :'Loading'
                }
        </table>
    </div> 
} 

export default DataList;
