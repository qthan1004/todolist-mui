import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Information() {
  const [info, setInfo] = useState([]);
  const [itemsLenght, setitemsLenght] = useState(50);

  const fetchMoreData = () => {
    let newLength = itemsLenght + 50;
    setTimeout(() => {
      setitemsLenght(newLength);
    }, 1500);
  };
  useEffect(async () => {
    const response = await axios.get(
      `https://randomuser.me/api/?results=${itemsLenght}`
    );

    setInfo(response.data.results);
  }, [itemsLenght]);

  return (
    <div>
      <InfiniteScroll
        dataLength={itemsLenght}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <TableContainer sx={{ minWidth: 1240 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`${item.name.first} ${item.name.last}`}
                    </TableCell>
                    <TableCell align="left">{`${item.location.state}, ${item.location.city}, ${item.location.country}`}</TableCell>
                    <TableCell align="right">{item.cell}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </div>
  );
}

export default Information;
