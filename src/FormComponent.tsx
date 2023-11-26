import React from "react";
import { FormControl, Input, FormHelperText, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const FormComponent = ({
  loading,
  handleSubmit,
  fileHandler,
  typeError,
}: any) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            disabled={loading ? false : true}
            id="my-input"
            aria-describedby="my-helper-text"
            type="file"
            onChange={fileHandler}
          />
          <Button type="submit" variant="contained">
            Upload
          </Button>
          {typeError && <Alert severity="error">{typeError}</Alert>}
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </form>
    </div>
  );
};

export default FormComponent;
