import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CustomDataGrid from "../components/common/CustomDataGrid";
import CustomLoader from "../components/common/CustomLoader";
import { getTicketsService } from "../services/ticket.service";
import { PageInfoInterface, TicketsTableDataInterface } from "../interfaces";

function TicketsPage() {
  const [, setRowCountState] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<PageInfoInterface>({
    page: 0,
    pageSize: 5,
  });

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["ticketsList"],
    queryFn: () => getTicketsService(paginationModel),
  });

  const totalRowCount = data?.data?.totalRowCount;

  /* The `formattedData` is used to set formatted table data into the data grid */
  const formattedData = useMemo(() => {
    const finalData: TicketsTableDataInterface = { columns: [], rows: [] };

    if (data?.data.data && data.data.data.length > 0) {
      const formattedColumns = Object.keys(data.data.data[0]).map((item) => ({
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

  /**
   * The function `handlePageChange` updates the pagination model's page property with a newPage value.
   */
  const handlePageChange = (newPage: number) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
  };

  useEffect(() => {
    refetch();
  }, [paginationModel, refetch]);

  useEffect(() => {
    if (totalRowCount !== undefined) {
      setRowCountState(totalRowCount);
    } else {
      setRowCountState(null);
    }
  }, [totalRowCount]);

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
            <CustomDataGrid
              rows={formattedData.rows}
              columns={formattedData.columns}
              rowCount={totalRowCount}
              loading={isFetching}
              pageSizeOptions={[5]}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={(newModel: PageInfoInterface) => {
                handlePageChange(newModel.page);
                getTicketsService(newModel);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TicketsPage;
