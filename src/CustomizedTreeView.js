import React, {useState, useEffect} from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import Node from './Node'
import Sidebar from "react-sidebar";

import { BrowserRouter as Router, Switch, Route, Link  } from "react-router-dom";

const mql = window.matchMedia(`(min-width: 800px)`);

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} >
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} >
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  return (
    <div >
      <Collapse {...props} />
    </div>
  );
}

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
    padding:20
  },
});

export default function CustomizedTreeView() {
  const classes = useStyles();

  const [sidebarDocked, setSidebarDocked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const treeData = [{
    key:'Command_Center',
    label:'Command Center',
    url:'',
    nodes : [{
      key:'Command_Center_Schedule',
      label:'Schedule',
      url:'',
      nodes :[{
        key:'1_Command',
        label:'1 - Command',
        url:'/1_command',
        nodes :[]
      },
      {
        key:'2_Command',
        label:'2 - Command',
        url:'/2_command',
        nodes :[]
      }]
    }]
  },
  {
    key:'Resources',
    label:'Resources',
    url:'',
    nodes : [{
      key:'Resources_Schedule',
      label:'Schedule',
      url:'',
      nodes :[{
        key:'1_Resource',
        label:'1 - Resource',
        url:'/1_resource',
        nodes :[]
      },
      {
        key:'2_Resource',
        label:'2 - Resource',
        url:'/2_resource',
        nodes :[]
      },
      {
        key:'3_Resource',
        label:'3 - Resource',
        url:'/3_resource',
        nodes :[]
      },
      {
        key:'4_Resource',
        label:'4 - Resource',
        url:'/4_resource',
        nodes :[]
      },
      {
        key:'5_Resource',
        label:'5 - Resource',
        url:'/5_resource',
        nodes :[]
      }]
    }]
  }]

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
  function addChild(node){
    if(node.nodes != undefined && node.nodes.length > 0){
        return (
          <StyledTreeItem nodeId={node.key} label={node.label}>
            {
              node.nodes.map(ele=>addChild(ele))
            }
          </StyledTreeItem>
        )
    }
    else{
      return (
        <Link onClick={onSetSidebarOpen} to={node.url} style={{ textDecoration: 'none', color: 'black' }}>
          <StyledTreeItem nodeId={node.key} label={node.label} />
        </Link>
        )
    }
}
  const treeView = treeData.map(node=>addChild(node))
  console.log(treeView)
  return (
    <Router>
      <div>
      <Sidebar 
        sidebar={<TreeView
          className={classes.root}
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          
        >
          {treeView}
        </TreeView>
        }
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        
        {
          <button style={{ display: "flex", marginLeft: "-1" }} onClick={() => onSetSidebarOpen(true)}>
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