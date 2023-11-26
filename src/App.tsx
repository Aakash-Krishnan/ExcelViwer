/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, SetStateAction, useState, useEffect } from "react";
import "./App.css";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container, MenuTab } from "./styles";
import { ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { getExcelDatas, postExcelData } from "./FirebaseAPI";
import TableComponent from "./Table";
import FormComponent from "./FormComponent";

const App = () => {
  const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>("");

  const [excelData, setExcelData] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [getFile, setGetFile] = useState<any>([]);

  useEffect(() => {
    getExcelDatas(setGetFile);
    setLoading(true);
  }, [excelData, loading]);

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileFormat = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/vnd.ms-excel",
    ];
    const val = getFile.filter(
      (item: any) => item.fileName === e?.target.files?.[0]?.name
    );

    if (val.length > 0) {
      alert("File Already exists");
      setExcelFile(null);
    } else {
      setFileName(e?.target.files?.[0]?.name);
      const selectedFile = e?.target.files?.[0];
      if (selectedFile) {
        if (selectedFile && fileFormat.includes(selectedFile.type)) {
          setTypeError(null);
          const reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e: ProgressEvent<FileReader> | null) => {
            if (e?.target) {
              setExcelFile(e.target.result);
            }
          };
        } else {
          setTypeError("Not in  the Excel format");
          setExcelFile(null);
        }
      } else {
        console.log("Not in the format");
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data.slice(0, 10));
      const object = {
        fileName: fileName,
        excelData: workSheet,
      };
      await postExcelData(object);
      setLoading(false);
    }
  };

  const searchHandler = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchName(e.target.value);
  };
  return (
    <Container>
      <FormComponent
        loading={loading}
        handleSubmit={handleSubmit}
        fileHandler={fileHandler}
        typeError={typeError}
      />
      <div>
        <TextField
          style={{ marginRight: "10px" }}
          type="search"
          placeholder="Search"
          onChange={searchHandler}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {getFile.map((option: any) => (
            <MenuTab
              key={option.fileName}
              value={option.fileName}
              onClick={() => setExcelData(option.excelData)}
            >
              {option.fileName}
            </MenuTab>
          ))}
        </TextField>
      </div>

      <div>
        {excelData ? (
          <div>
            <TableComponent excelData={excelData} searchName={searchName} />
          </div>
        ) : (
          <div>No File</div>
        )}
      </div>
    </Container>
  );
};

export default App;
