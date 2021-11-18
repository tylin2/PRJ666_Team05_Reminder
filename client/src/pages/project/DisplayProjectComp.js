import React, { Component } from 'react';
import { ProgressBar } from "react-bootstrap"


export default class DisplayProjectComp extends Component {

    render() {      
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else if(!this.props) {return <div>Cannot find the project.</div>}
      else {
        let project = this.props.entry;
        let comp = this.props.comp; 
        if (!this.props.comp) {
          comp = 0;
        } 
                  
        return (
            <>     
                    <h1 className="text-center"> {project?.name} </h1>
                    <br />
                    <h4>Manager: </h4>
                    <div> {project?.manager} </div>
                    <br />
                    <h4>Description: </h4>
                    <div> {project?.descript} </div>                    
                    <br />
                    <h4>Completion:  </h4>                    
                    <ProgressBar now={comp} label={`${comp}%`} />
                    <br />                                     
                    <h1 className="text-center" >Tasks for this project</h1>
                    
            </>
        )
      }                  
        
    }
  
}