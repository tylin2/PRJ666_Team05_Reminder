import React, { Component } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Project.module.scss";
import ProjectItem from './ProjectItem';

export default class ProjectList extends Component  {    
   render() {
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else if(!this.props) {return (
          <>
            <br />
            <Card style={{ width: "90rem" }} className={styles.card}>
                <Card.Body>
                    <h1 className="text-center" >Project List</h1>
                    <ListGroup>
                       There is no project now...
                    </ListGroup>
                    <br />
                    <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createProject" size="lg">Create New Project</Button>
                </Card.Body>
                                 
            </Card>           
            
          </>
        )}
      else {
        let projects = this.props.entries;        
       return (
           <>
           <br />
           <Card style={{ width: "90rem" }} className={styles.card}>
               <Card.Body>                    
                    <h1 className="text-center" >Project List</h1>
                    <ListGroup>
                      {projects.map(project => {
                        return(
                          <ProjectItem key={project._id} project={project} />  
                        )
                      })}                                           
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