import React from "react";
import { Link  } from "react-router-dom";
import {CloseSquare, TransitionComponent} from './CustomIcons'
import TreeItem from '@material-ui/lab/TreeItem';
import { withStyles } from '@material-ui/core/styles';

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
      '& .close': {
        opacity: 0.3,
      },
    },
  }))((props) => <TreeItem endIcon={<CloseSquare/>} {...props} TransitionComponent={TransitionComponent} />);
  

export function TreeItemCloseIcon({node, onSetSidebarOpen}){
    if(node.nodes !== undefined && node.nodes.length > 0){
        return (
          <StyledTreeItem nodeId={node.key} label={node.label}>
            {
              node.nodes.map(ele=><TreeItemCloseIcon key={ele.key} node={ele}/>)
            }
          </StyledTreeItem>
        )
    }
    else{
      return (
        <Link onClick={onSetSidebarOpen} to={node.url} style={{ textDecoration: 'none', color: 'black' }}>
          <StyledTreeItem nodeId={node.key} label={node.label} iconPath={node.iconPath}/>
        </Link>
        )
    }
  }