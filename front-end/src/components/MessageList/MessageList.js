import React, {useState, useEffect} from 'react'
import { MessageItem } from '../MessageItem/MessageItem'
import moment from 'moment'

import Compose from '../Compose/Compose'
import { useStyles } from './UseStyles'




const MY_USER_ID = 'Thong Nguyen';


export const MessageList = () => {
    const [messages, setMessages] = useState([])
    const classes = useStyles()

    useEffect(() => {
      getMessages()
    }, [])


    const getMessages = () => {
      let tempMessages = [
        {
          author: 'Thong Nguyen',
          message:'An com chua ban',
          room:'#Angular'
        },
        {
          author: 'Quang Pham',
          message:'An roi',
          room:'#Angular'
        },
        {
          author: 'Thong Nguyen',
          message:'An com co an rau khong ban',
          room:'#Angular'
        },
        {
          author: 'Thong Nguyen',
          message:'Nho an nhieu rau chut nha',
          room:'#Angular'
        },
        {
          author: 'Quang Pham',
          message:'Dang bi bon, an nhieu rau lam',
          room:'#Angular'
        }
      ]
      setMessages([...messages, ...tempMessages])
    }
    console.log(messages)

    const renderMessages = (messages) => {
      let i = 0;
      let messageCount = messages.length
      let tempMessages = [];

      while (i < messageCount) {
        let previous = messages[i - 1];
        let current = messages[i];
        let next = messages[i + 1];
        let isMine = current.author === MY_USER_ID;
        let currentMoment = moment(current.timestamp);
        let prevBySameAuthor = false;
        let nextBySameAuthor = false;
        let startsSequence = true;
        let endsSequence = true;
        let showTimestamp = true;

        if(previous) {
          let previousMoment = moment(previous.timestamp);
          let previousDuration = moment.duration(currentMoment.diff(previousMoment));
          prevBySameAuthor = previous.author === current.author;

          if (prevBySameAuthor && previousDuration.as('hours') < 1) {
            startsSequence = false;
          }

          if (previousDuration.as('hours') < 1) {
            showTimestamp = false;
          }
        }
        if (next) {
          let nextMoment = moment(next.timestamp);
          let nextDuration = moment.duration(nextMoment.diff(currentMoment));
          nextBySameAuthor = next.author === current.author;
  
          if (nextBySameAuthor && nextDuration.as('hours') < 1) {
            endsSequence = false;
          }
        }

        tempMessages.push(
          <MessageItem
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );
        // Proceed to the next message.
        i += 1;
      }
      console.log(tempMessages)
      return tempMessages;
    }

    return(
      <div className="message-list">
          <div className="message-list-container">
            {renderMessages(messages)}
          </div>
          <Compose />
      </div>
    );
}