import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "../components/common/CustomDataGrid";
import CustomLoader from "../components/common/CustomLoader";
import { getTicketsService } from "../services/ticket.service";

function TicketsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["ticketsList"],
    queryFn: getTicketsService,
  });

  const formattedData = useMemo(() => {
    const finalData = { columns: [] as GridColDef[], rows: [] as { [key: string]: string }[] };

    if (data?.data.data && data?.data.data.length > 0) {
      const formattedColumns = Object.keys(data?.data.data[0]).map((item) => ({
        field: item,
        headerName: item,
        width: 150,
        editable: true,
      }));

      finalData.columns.push(...formattedColumns);
      finalData.rows.push(...data.data.data);
    }

    return finalData;
  }, [data?.data.data]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="flex flex-col w-screen">
          <div className="w-[100vw] h-[92vh] flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-800">
            <Link
              to={"/create-ticket"}
              className="my-10 w-auto bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Create Ticket
            </Link>
            <CustomDataGrid rows={formattedData.rows} columns={formattedData.columns} />
          </div>
        </div>
      )}
    </>
  );
}

export default TicketsPage;
