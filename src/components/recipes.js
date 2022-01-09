import axios from "axios";
import React from "react";
import Content from "./content"
import { useEffect, useState } from "react";
import { CardGroup, Row, Col } from "react-bootstrap";

const apiKey='280ed3b05ce248309dd8b9db45b2829a'


const Single=({id})=>{
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe]=useState(null)
    
    useEffect(()=>{
        setLoading(true);
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
        .then(res=>{
            setRecipe(res.data)
            
        })
        .catch(err=>{
            return(
                <div>
                    <h1>API exhausted</h1>
                </div>
            )
        }).finally(()=>setLoading(false));
    },[id])
    
 
    if(loading){
        return(<>
        <div >
        <img src={require("./23.gif")} alt="loading" style={{ position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"}}/>
        </div>
        </>

        );
    }
  
    return(
        <div style={{marginTop:"100px"}}>
        {recipe && (
          <>
            <Row xs={1} md={2} className="g-4">
              <Col xs={12} sm={12} md={9} lg={6}>
                
                <h1>{recipe.title}</h1>
                <p>By <i>"{recipe.creditsText}"</i> </p>
                <Row style={{ paddingTop:"5%"}}>
                  <Col className="info" >
                    <div className="ing">
                    <h1> {recipe.extendedIngredients.length}</h1>
                    </div>
                  </Col>
                  <Col className="info">
                  <div className="min">
                  <h1>{recipe.readyInMinutes} </h1>
                  </div>
                  </Col>
                  <Col className="info">
                  <div className="serv">
                  <h1>{recipe.servings}</h1>
                  </div>
                  </Col>
                 
                </Row>
                <Row className="infoText">
                  <Col>
                    <p style={{marginLeft:"73%"}}> Ingredients</p>
                  </Col>
                  <Col>
                    <p>Minutes</p>
                  </Col>
                  <Col>
                    <p style={{marginRight:"77%"}}>Servings</p>
                  </Col>
                </Row>
               
      
              </Col>
              <Col>
                <img src={recipe.image} alt={recipe.title}></img>
              </Col>
            </Row>
            <hr className="mainHr"></hr>
            <h2>Ingredients</h2>
            {recipe.extendedIngredients.map((ingredient, i) => (
              <li key={i}>{ingredient.original}</li>
            ))}
            <hr className="mainHr"></hr>
            <h2>Directions</h2>
            {recipe.analyzedInstructions[0].steps.map((step, q) => (<div>
              <b key={q}>Step {step.number}</b>
              
              <Row>
              <br></br>
                <div className="col-lg-2">
                  
                  <p>Ingredient/s {
                  
                  step.ingredients.map((ing, j)=>(<li key={j}>{ing.localizedName}</li>))}</p>
                </div>
                <div className="col-lg-2">
                <p>Equipment/s {step.equipment.map((eq, k)=>(<li key={k}>{eq.localizedName}</li>))}</p>
                </div>
              </Row>
              {step.step}
              <hr></hr>
              </div>
            ))}

          </>
        )}
      </div>
    )
 
}

    

const Recipes=({obj, search, setSearch, single, handleSingle})=>{
 
  
    const filterSearch=obj.searchResult;
  
    
    if(single!==''){
            return(       
                 <Single id={single}/>    
            )
    }
    
    return(
      
        <CardGroup>
          
      {filterSearch.map((recipe,w)=><Content key={w} name={recipe.title} image={recipe.image} type={recipe.vegetarian}
      vegan={recipe.vegan} cuisines={recipe} handleSingle={handleSingle}/>)}
      
      </CardGroup>
      
      )
    }
  

  export default Recipes