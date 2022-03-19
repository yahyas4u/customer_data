import React, { useState, useMemo } from 'react';
import Pagination from './Pagination.js';
import data from './CustList.json';
import './styles.scss';
import {useParams } from 'react-router-dom';
//import {images} from './images' 

const LightBox = ({ children, src, alt, Wrapper = 'div', zIndex = 100 }) => {
 
const [isOpen, setIsOpen] = React.useState(false);


	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Wrapper onClick={toggleIsOpen}>
			{children}
			{isOpen ?
				<div onClick={toggleIsOpen} style={{
					position: 'fixed',
					top: '0',
					left: '0',
          textAlign:'center',
					height: '100vh',
          padding:'50px',
					width: '100vw',
					backgroundColor: 'rgba(0,0,0,0.7)',
					cursor: 'pointer',
					zIndex

				}}>
					<img src={src}
						alt={alt}
						style={{
							height: '80%',             
							width: 'auto'
						}}
					/>
				</div>
				: null}
		</Wrapper>
	);
};

let PageSize = 10;

export default function Listpage() {

  let  {tid}  = useParams();
  if(tid==null){
    tid=1
  }
  const [currentPage, setCurrentPage] = useState(tid);
  const [currInput, setcurrInput] = useState('');
  const [searchCustomer,setSearchCustomer] = useState('');
  const currentTableData = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  
  
  return data.slice(firstPageIndex, lastPageIndex);
  
  }, [currentPage]);

  //const professions = ["police", "chef", "doctor", "engineer"];
  const [myProfession, setMyProfession] = useState("");
  return (
    <>    
     
               <input value={currInput} pattern="[a-zA-Z'-'\s]*" type="text"  placeholder='Search by User Name' width={50} height="20px"  
             onChange={ event=>{
              setcurrInput(event.target.value.replace(/[^A-Za-z]/ig, ''))
              setSearchCustomer(event.target.value.replace(/[^A-Za-z]/ig, ''))
              }}/>
                          
      <table>
        
        <thead>  
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>username</th>
            <th>EMAIL</th>
            <th>Photo</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.filter((item=>{
            if(searchCustomer === ""){
              return item;
            }else if (item.username.toLowerCase().includes(searchCustomer.toLowerCase())){
              return item;
            }
          }))
          .map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.full_name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  
                  <LightBox src={require(`./images/${item.picture}`)} alt="">
                  <img src={require(`./images/${item.picture}`)} width="50px" height="50px" alt="" />
                  </LightBox>     
                </td>  
                <td> <button
                      type="button"
                      key={item.id}
                      className={"btn btn-light border-dark "}
                      onClick={() => setMyProfession(item.id)}>
                      Show More Details
                      </button> {item.addresss}
                      <p className='moreDet'>{
                      (myProfession === item.id) ? 
                      <div>
                      <p>{"Gender: "+item.gender }</p><p>{" Adress: "+item.address }</p><p>{"Phone: "+item.phone}</p> 
                      </div>
                      :""}   
                      </p>
                      </td>           
                </tr> 
            ); 
          } 
          ,"")}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}