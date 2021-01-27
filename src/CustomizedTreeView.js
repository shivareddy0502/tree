import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import Node from './Node'
import Sidebar from "react-sidebar";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import {MinusSquare, PlusSquare} from './CustomIcons'
import { TreeItemText } from './TreeItemText';
import { TreeItemIcon } from './TreeItemIcon';
import { TreeItemCloseIcon } from './TreeItemCloseIcon';

const mql = window.matchMedia(`(min-width: 800px)`);

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
    padding:20
  },
});

export default function CustomizedTreeView({treeData}) {
  const classes = useStyles();

  const [sidebarDocked, setSidebarDocked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(()=>{
    mql.addEventListener("change",mediaQueryChanged);
    return ()=>{
      mql.removeEventListener("change",mediaQueryChanged);
    }

  });

  const onSetSidebarOpen = () => {
    setShowButton(!showButton)
    setSidebarOpen(!sidebarOpen)
  }
 
  const mediaQueryChanged = () => {
    setSidebarOpen(false)
    setSidebarDocked(mql.matches)
    
  }
  
  return (
    <Router>
      <div>
      <Sidebar 
        sidebar={<TreeView
          className={classes.root}
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
        >
        {
          treeData.map(node=>{
            if(node.type===0){
              return <TreeItemText key={node.key} node={node} onSetSidebarOpen={onSetSidebarOpen}/>
            }
            else if(node.type===1){
              return <TreeItemIcon key={node.key} node={node} onSetSidebarOpen={onSetSidebarOpen}/>
            }
            if(node.type===2){
              return <TreeItemCloseIcon key={node.key} node={node} onSetSidebarOpen={onSetSidebarOpen}/>
            }
          })
        }
        </TreeView>
        }
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        
        {
          <button style={{ display: "flex", marginLeft: "-1" }} id="ClickButton" onClick={() => onSetSidebarOpen(true)}>
          Open sidebar
          </button> 
        }
      </Sidebar>
      
      <Switch>
        <Route path="/1_command"><Node node="One Command"></Node></Route>
        <Route path="/2_command"><Node node="Two Command"></Node></Route>
        <Route path="/1_resource"><Node node="One Resource"></Node></Route>
        <Route path="/2_resource"><Node node="Two Resource"></Node></Route>
        <Route path="/3_resource"><Node node="Three Resource"></Node></Route>
        <Route path="/4_resource"><Node node="Four Resource"></Node></Route>
        <Route path="/5_resource"><Node node="Five Resource"></Node></Route>
      </Switch>
      </div>
    </Router>
  );
}