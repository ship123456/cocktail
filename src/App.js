import React , {Component} from "react"
import './App.css';
import axios from 'axios'
import Cocktail from './Cocktail'
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      list:[],
      char:'a',
      loading:false,
      down:[],
      showDrink:[],
      choose:true
    }
    this.showCocktails=this.showCocktails.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.selectCategory=this.selectCategory.bind(this);
    this.handleSpecific=this.handleSpecific.bind(this);
  }
  async handleSpecific(e)
  { 
    let o =e.target.value
    await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${o}`)
    .then(res=>{
        console.log(res,'hjjh')
        this.setState({
          showDrink:res.data.drinks,
          choose:false,
          loading:true

        })
      })
      .catch(err=>{
        console.log(err)
      }) 

  }
 async handleChange(e)
  {
    console.log(e.target.value)
    if(e.target.value==='')
    {
      this.setState({
        char:'a'
      },()=>{
        this.showCocktails();
      })
    }
    else
    {
      this.setState({
        char:e.target.value
      },()=>{
        this.showCocktails();
      })
    }
    this.setState({
      [e.target.name]:e.target.value
    })
  }

 async selectCategory()
  {
    await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then(res=>{
        this.setState({
          down:res.data.drinks
        })
      })
      .catch(err=>{
        console.log(err)
      })
  }

 async showCocktails(){
   await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${this.state.char}`)
                  .then(res=>{  
                    this.setState({
                      list:res.data.drinks,
                      loading:true,
                      choose:true
                    })
                  })
                  .catch(err=>{
                    console.log(err)
                  })
                  }

  componentDidMount()
   {
    this.showCocktails()
    this.selectCategory()
   }

   render()
    {   
    const inp= <input type="text" placeholder="search" onChange={(e)=>{this.handleChange(e)}} />
    const {list,loading,down,choose,showDrink} = this.state
        return (
    <>
 {loading?
 <>
   <div className="title">cocktail list</div>
     {inp}
     <div>
   <label htmlFor="exampleFormControlSelect1"> select category </label>
   <select className="form-control" onChange={(e)=>{this.handleSpecific(e)}} id="exampleFormControlSelect1">
    {down.map(x=>{
     return <option value={x.strCategory} >{x.strCategory}</option>
    })}  
     
   </select>
   </div>
   <div className="container">
   <div className="row">

 
{choose?  list.map(x=>{
   return   <Cocktail key={x.idDrink} 
   category={x.strCategory} name={x.strDrink} img={x.strDrinkThumb} in1={x.strIngredient1} in2={x.strIngredient2} 
   in3={x.strIngredient3} in4={x.strIngredient4}/>
    }) :showDrink.map(x=>{
      return   <Cocktail key={x.idDrink} 
       name={x.strDrink} img={x.strDrinkThumb} />
       })}
       </div>
  </div>
</>:'loading.......'}

       


  
    </>
  );
 } 
 }

export default App;
