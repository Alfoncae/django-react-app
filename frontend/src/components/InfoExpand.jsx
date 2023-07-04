import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../accordion.css'


const InfoExpand = ({sections}) => {

  // let date = new Date(transaction.created);  // assuming transaction.created is in a valid date format
  // let formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;

  return (
    <Accordion defaultActiveKey="1">
      {sections.map((section, index) => (
        <Accordion.Item eventKey={section.id.toString()} key={section.id}>
          <Accordion.Header>
            {section.transaction_type}
            <br />
            {section.amount}
            <br />
            {section.category ? section.category : 'No category'}
            <br />
            {section.created}
          </Accordion.Header>
          <Accordion.Body>
          {section.note ? section.note : 'no details'}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default InfoExpand;
