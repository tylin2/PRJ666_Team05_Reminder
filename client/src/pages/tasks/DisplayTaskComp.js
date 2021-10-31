import React, { Component } from 'react';

import { Form, Button, Card, Alert } from "react-bootstrap"
import styles from "./Task.module.scss";

export default class DisplayTaskComp extends Component {
  
  getTaskId() {
    return this.props.match.params.id 
  }

    render() {      
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else {
        console.log(`this.props.entry: ${this.props.entry}`)
        let task = this.props.entry;        
        console.log(`task: ${task}`)
        return (
          <>              
            
              <br />
              <Card style={{ width: "90rem" }} className={styles.card}>
                  <Card.Body>
                    {task.map(task => {
                      return(
                        <h1 className="text-center">{task.name}</h1>

                      )
                    })}
                      
                      <span>
                          <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg">Edit Task</Button> 
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         
                          <Button  style={{ color:"#00000",background:"#FE6D73", border:"none", fontSize: 14}} size="lg">Delete Task</Button>
                      </span>
                  </Card.Body>
              </Card>
               
          </>
        )
      }                  
        
    }
  
}