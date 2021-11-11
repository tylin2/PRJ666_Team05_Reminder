import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './CheckBox.module.css';

function CheckBox({ children, checked, priority, ...rest }) {
  
  //? not sure..
  let classByPriority;
  if(priority === 'P1') {
    classByPriority=styles.p1;
  }else if(priority === 'P2'){
    classByPriority=styles.p2;
  }else if(priority === 'P3'){
    classByPriority=styles.p3;
  }else {
    classByPriority=styles.p4;
  }

  // return (
  //   <div className={styles.checkbox}>
  //     <label>
  //       <input type="checkbox" checked={checked} {...rest} />
  //       <div className={styles.icon}>{checked ? <MdCheckBox className={styles.checked}/> 
  //       : 
  //       <MdCheckBoxOutlineBlank className={styles.differentColor} />}</div>
  //     </label>
  //     {/* <span>{children}</span> */}
  //     <div id={styles.innerDiv}>{children}</div>
  //   </div>
  // );

  return (
    <div className={styles.checkbox}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={styles.icon}>{checked ? <MdCheckBox className={styles.checked}/> 
        : 
        <MdCheckBoxOutlineBlank className={classByPriority} />}</div>
      </label>
      {/* <span>{children}</span> */}
      <div id={styles.innerDiv}>{children}</div>
    </div>
  );
}

export default CheckBox;
