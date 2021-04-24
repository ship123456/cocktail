import React from 'react'
import './App.css'
function Cocktail(props)
{ 
    const {img ,name,category,in1,in2,in3,in4}=props
    return(
        <React.Fragment>
            <div className={`col-lg-4 ${"mar"}`}>            
    <div className=" card">
        <img className="card-img-top" src={img} alt="avatar" />
        <div className="card-body">
         <h5 className="card-title">name of cocktail:{' '} <span className="drinkname">{name}</span></h5>
       
      {category?(<p className="card-text">category-{' '}<span className="categoryname">{category}</span></p>):''}    
         <div> 
            <span className="ingri">
              {in1?in1:''}{' '}{in2?in2:''}{' '}{in3?in3:''}{' '}{in4?in4:''}
           </span>
        </div>
          </div>
          </div>
          </div>
          </React.Fragment>
    )
}
export default Cocktail

