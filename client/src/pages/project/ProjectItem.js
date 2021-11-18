import React, { useState } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Project.module.scss";
import CheckBox from '../../components/checkBox/CheckBox';

export default function ProjectItem ( {project} ) {    

    return(          
        <div className={styles.projectLine} >
            <ListGroupItem   style={{fontSize: 14}} href={`project/${project._id}`} action>
                <span >                
                     {project.name}
                </span>
            </ListGroupItem>
        </div>
    )

}
