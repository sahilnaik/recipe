import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Recipes from "./components/recipes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './custom.css';

function refreshPage() {
  window.location.reload(false);
}
const Header=()=>{
    return(
        <div className="head" onClick={refreshPage}>
            <h1>Papoidiot</h1>
        </div>
    )
}
const App=()=>{
  
  const [recipes, setRecipes]=useState([]);
  const [allRecipes, setAllRecipes]= useState([]);
  const [search, setSearch]=useState('');
  const [single, setSingle]=useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const apiKey = '280ed3b05ce248309dd8b9db45b2829a'
  const handleSearch=(event)=>{
    event.preventDefault();
   
    setSearch(event.target.value)
  }
  useEffect(()=>{
    setLoading(true);
    axios.get(`https://api.spoonacular.com/recipes/random?number=12&apiKey=${apiKey}`).then(response=>{setRecipes(response.data.recipes)})
    .catch(err=>{
      
      setError(true)
  }).finally(()=>setLoading(false),()=>setError(false));
    
   },[])
   
   
 const handleSingle=(suggestion)=>{
  
    setSingle(suggestion.id)
    setSearch('')
 }
  const filterSearch = useMemo(()=>{
    
    let searchResult= recipes
   
  
    let obj={searchResult}
    return obj
  },[recipes]
  
  )

  useEffect(()=>{
    axios.get(`https://api.spoonacular.com/recipes/autocomplete?query=${search}&apiKey=${apiKey}`).then(response=>{setAllRecipes(response.data)})
    },[search])
  const suggestion=useMemo(()=>{
    
  if(search.length>0){
     
    let suggestionResult = allRecipes.filter(recipe=>{
      return recipe.title.toLowerCase().includes(search.toLowerCase())
    }
    )
   
    return suggestionResult
  }
},[search, allRecipes])

if(error){
  return(
    <>
    <div >
    <div className="header">
        <Row >
          <Col>
            <Header></Header>
            </Col>
          <Col>
            <form onSubmit={handleSearch}>
              <input type="text" value={search} onChange={handleSearch} placeholder="Search for a recipe" className="inputBox"></input>
             
              {suggestion && suggestion.map((suggestion, t) => 
  <div key={t} className="suggestion col-lg-3 mx-auto" onClick={()=>handleSingle(suggestion)}>{suggestion.title}</div>
  )}
  
            </form>
          </Col>
          <Col>
                
          </Col>
  
        </Row>
        </div>
    <img src={require("./components/dead.png")} alt="loading" style={{ position: "fixed",
  top: "50%",
  left: "50%",
  height:"300px",
  width:"300px",
  transform: "translate(-50%, -45%)"}}/>
  <h1 style={{ position: "fixed", fontWeight: "bold",
  top: "50%",
  left: "50%",
  height:"300px",
  width:"300px",
  transform: "translate(-50%, -70%)"}}>API Limit Reached</h1>
  <footer style={{position: "fixed", fontWeight: "bold",
  top: "50%",
  left: "50%",
  height:"300px",
  width:"300px",
  transform: "translate(-50%, 100%)"}}>
      <p className="footer-copyright text-center py-3">Image by Royyan Wijaya from NounProject.com
      </p>
    </footer>
    </div>
    
    
    </>
  )
}
if(loading){
  return(<>
  <div >
  <div className="header">
      <Row >
        <Col>
          <Header></Header>
          </Col>
        <Col>
          <form onSubmit={handleSearch}>
            <input type="text" value={search} onChange={handleSearch} placeholder="Search for a recipe" className="inputBox"></input>
           
            {suggestion && suggestion.map((suggestion, y) => 
<div key={y} className="suggestion col-lg-3 mx-auto" onClick={()=>handleSingle(suggestion)}>{suggestion.title}</div>
)}

          </form>
        </Col>
        <Col>
              
        </Col>

      </Row>
      </div>
  <img src={require("./components/23.gif")} alt="loading" style={{ position: "fixed",
top: "50%",
left: "50%",
transform: "translate(-50%, -50%)"}}/>
  </div>
  </>

  );
}
  return (
    <>
    <header className="header">
      <Row >
        <Col>
          <Header></Header>
          </Col>
        <Col>
          <form onSubmit={handleSearch}>
            <input type="text" value={search} onChange={handleSearch} placeholder="Search for a recipe" className="inputBox"></input>
            {suggestion && suggestion.map((suggestion, u) => 
<div key={u} className="suggestion col-lg-12" onClick={()=>handleSingle(suggestion)}>{suggestion.title}</div>
)}

          </form>
        </Col>
        <Col>
              
        </Col>

      </Row>
      </header>
    <div style={{marginLeft:'30px', marginRight:"30px"}}>
      
      <div className="con">
       
      <Recipes obj={filterSearch} single={single} search={search} handleSingle={handleSingle} setSearch={setSearch}></Recipes>
      
      </div>
    
    </div>
    
   <footer className="footer">
      <p className="footer-copyright text-center py-3">Data fetched from Spoonacular API
      </p>
    </footer>
   </>
  )

}

export default App;
