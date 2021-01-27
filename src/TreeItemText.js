import React from "react";
import { Link  } from "react-router-dom";
import {CustomIconText, TransitionComponent} from './CustomIcons'
import TreeItem from '@material-ui/lab/TreeItem';
import { withStyles } from '@material-ui/core/styles';
import './TreeItem.css'

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
      '& .close': {
        opacity: 0.3
      },
    },
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
      marginLeft:'10px',
    },
  }))((props) => {
      return <div>
          <TreeItem endIcon={<CustomIconText label={props.iconLabel}/>} {...props} TransitionComponent={TransitionComponent} />
      </div>
  });
  

export function TreeItemText({node, onSetSidebarOpen}){
    if(node.nodes != undefined && node.nodes.length > 0){
        return (
          <StyledTreeItem nodeId={node.key} label={node.label}>
            {
              node.nodes.map(ele=><TreeItemText key={ele.key} node={ele}/>)
            }
          </StyledTreeItem>
        )
    }
    else{
      return (
        <Link onClick={onSetSidebarOpen} to={node.url} style={{ textDecoration: 'none', color: 'black' }}>
          <StyledTreeItem nodeId={node.key} label={node.label} iconLabel={node.iconLabel}/>
        </Link>
        )
    }
  }