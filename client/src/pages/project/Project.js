import React, { Component } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Project.module.scss";

export default class Project extends Component  {    
   render() {
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else if(!this.props) {return (
          <>           
            <div>No Project Now</div> 
            <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createProject" size="lg">Create New Project</Button> 
          </>
        )}
      else {
        let project = this.props.entries;        
       return (
           <>
           <br />
           <Card style={{ width: "90rem" }} className={styles.card}>
               <Card.Body>                    
                    <h1 className="text-center" >Project List</h1>
                    <ListGroup>
                       
                    </ListGroup>
                    <br />
                    <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createProject" size="lg">Create New Project</Button>
               </Card.Body>
           </Card>
           </>
       )
      }
   }
}