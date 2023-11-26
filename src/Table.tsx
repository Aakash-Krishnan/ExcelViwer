import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const TableComponent = ({ excelData, searchName }: any) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: 600, width: "100%" }}
      >
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5", height: "35px" }}>
              {Object.keys(excelData[0]).map((key) => (
                <StyledTableCell key={key}>
                  {key === "__EMPTY" ? "Index" : key}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ height: "100%", width: "100%" }}>
            {excelData.map((seperateData: any, index: number) => (
              <StyledTableRow key={index}>
                {searchName !== ""
                  ? Object.keys(seperateData)
                      .filter(() =>
                        seperateData?.first_name
                          .toLowerCase()
                          .includes(searchName.toLowerCase())
                      )
                      .map((data) => (
                        <StyledTableCell
                          component="th"
                          scope="row"
                          key={data}
                          onClick={() => console.log(seperateData[data])}
                        >
                          {seperateData[data]}
                        </StyledTableCell>
                      ))
                  : Object.keys(seperateData).map((data) => (
                      <StyledTableCell
                        component="th"
                        scope="row"
                        key={data}
                        // onClick={() => console.log(seperateData)}
                      >
                        {seperateData[data]}
                      </StyledTableCell>
                    ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
