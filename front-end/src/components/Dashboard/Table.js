import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';


const useStyles = makeStyles(theme => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));
  
  export default function Table(props) {
    const { objectArray } = props
    const headers = objectArray[0].keys
    const classes = useStyles();
    return (
      <React.Fragment>
        <Title>Recent Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
            {
                headers.map(header => (
                <TableCell>{header}</TableCell>
                ))
            }
            </TableRow>
          </TableHead>
          <TableBody>
            {objectArray.map(obj => {
                // Struggling with reusable code
            })}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div>
      </React.Fragment>
    );
  }