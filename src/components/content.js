import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

const Content=({name, image, type, vegan, cuisines, handleSingle})=>{
  
    if(image===undefined){
        
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png"
    }
    if(type){
        type="Vegetarian"
    }
    else{
        type="Non-vegetarian"
    }
    if(vegan){
        vegan="Yes"
    }
    else{
        vegan="No"
    }
    if(cuisines.cuisines.length===0){
        cuisines.cuisines[0]="N/A"
    }
   
    
    return(
        <div style={{marginTop:"60px"}}>
        <Row xs={1} md={2} className="g-4">
        <Col xs={12} sm={6} md={8} lg={11}>
       
            <Card style={{ width: '27rem', height: '45rem', margin:'10px'}}>
                <Card.Img variant="top" src={image} style={{height:"370px", width: "96%", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}} />
                <Card.Body style={{display:"flex", flexDirection:"column", flex:"1"}}>
                    <Card.Title className="cardTitle" style={{textAlign: "center"}}>{name}</Card.Title>
                    <Card.Text style={{textAlign: "center", marginTop:"auto"}}>
                        <ListGroup className="listgrp">
                            <ListGroupItem >Type: {type}</ListGroupItem>
                            <ListGroupItem >Vegan: {vegan}</ListGroupItem>
                            <ListGroupItem >Cuisines: {cuisines.cuisines.join(", ")}</ListGroupItem>
                        </ListGroup>
                        <br></br>
                        <Button variant="primary" className="button" onClick={()=>handleSingle(cuisines)}>View recipe</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        </Row>
          </div>
           
        
       
        
       
    )
}
export default Content