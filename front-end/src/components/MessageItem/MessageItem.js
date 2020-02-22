import React from 'react'
// import {makeStyles} from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import './MessageItem.css'


export const MessageItem = (props) => {
    const {
        data,
        isMine,
        startsSequence,
        endsSequence,
        showTimestamp
      } = props;
  
      const friendlyTimestamp = moment(data.timestamp).format('LLLL');
      return (
        <div className={[
          'message',
          `${isMine ? 'mine' : ''}`,
          `${startsSequence ? 'start' : ''}`,
          `${endsSequence ? 'end' : ''}`
        ].join(' ')}>
          {
            showTimestamp &&
              <div className="timestamp">
                { friendlyTimestamp }
              </div>                    
          }
  
          <div className="bubble-container">
            <div className="bubble" title={friendlyTimestamp}>
              { data.message }
            </div>
          </div>
        </div>
      );
}