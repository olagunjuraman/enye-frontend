import React from "react";
import { Table } from "react-bootstrap";

const TableList = ({ data }) => {
  const columns = data[0] && Object.keys(data[0]).splice(0, 15)
  return (
    <div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.FirstName}</td>
              <td>{data.LastName}</td>
              <td>{data.Gender}</td>
              <td>{data.Latitude}</td>
              <td>{data.Longitude}</td>
              <td>{data.CreditCardNumber}</td>
              <td>{data.CreditCardType}</td>
              <td>{data.Email}</td>
              <td>{data.DomainName}</td>
              <td>{data.PhoneNumber}</td>
              <td>{data.MacAddress}</td>
              <td>{data.URL}</td>
              <td>{data.UserName}</td>
              <td>{data.LastLogin}</td>
              <td>{data.PaymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableList;
