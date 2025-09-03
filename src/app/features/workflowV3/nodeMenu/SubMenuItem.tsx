import { CSSObject, IconButton, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { INodeSubCategory } from '../model/NodeData';
import NodeIcon from '../utils/NodeIcon';
interface ISubMenuItem {
  OnSelectNode: (node: INodeSubCategory) => void;
  node: INodeSubCategory;
}

const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  itemContainer: {
    overflow: 'hidden',
    padding: '7px',
    borderRadius: '8px',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#e3f2fd',
    },
  },
  subPanelTitle: {
    fontSize: 'x-small',
    textAlign: 'center',
    color: 'gray',
    whiteSpace: 'normal',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    lineHeight: 1,
  },
});

const SubMenuItem = ({ OnSelectNode, node }: ISubMenuItem) => {
  const defaultStyle = useMemo(() => styles(), []);
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={defaultStyle.itemContainer}
      onClick={() => {
        if (node?.disableNode === true) return;
        OnSelectNode({
          ...node,
          nodeIconColor: node.nodeIconColor,
        });
      }}
    >
      {node?.disableNode && (
        <NodeIcon iconName={'Handyman'} iconColor={'black'} iconSize={10} />
      )}
      <IconButton disableRipple size="small">
        <NodeIcon iconName={node.nodeIcon} iconColor={node.nodeIconColor} />
      </IconButton>
      <Typography sx={defaultStyle.subPanelTitle}>{node.nodeLabel}</Typography>
    </Stack>
  );
};

export default SubMenuItem;
