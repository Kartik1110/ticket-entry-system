import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";

function CustomDataGrid({ rows, columns }: { rows: any; columns: GridColDef[] }) {
  const StyledDataGrid = styled(DataGrid)(() => ({
    border: "solid 1px #303030",
    color: "rgba(255,255,255,0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#1d1d1d",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
      borderRight: `1px solid ${"#303030"}`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${"#303030"}`,
    },
    "& .MuiDataGrid-cell": {
      color: "white",
    },
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
    // ...customCheckbox(theme),
  }));

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
      sx={{color:'white'}}
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem sx={{color:'white'}} {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    );
  }


  return (
    <StyledDataGrid
      isCellEditable={() => false}
      className="w-auto min-w-60 h-[80vh]"
      sx={{ color: "white", height: "20vh", marginBottom: "10vh" }}
      rows={rows}
      columns={columns}
      slots={{
        pagination: CustomPagination,
      }}
    />
  );
}

export default CustomDataGrid;
