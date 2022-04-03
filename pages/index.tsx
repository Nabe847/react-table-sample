import { Box, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import { DataTable } from "../components/DataTable";

const Home: NextPage = () => {
  return (
    <Box width="80%" margin="100px auto">
      <DataTable
        columns={[
          {
            Header: "",
            accessor: "id",
            hidden: true,
          },
          {
            Header: "To convert",
            accessor: "from",
            width: "100px",
            overflow: "hidden",
            Cell: ({ value }: { value: string }) => (
              <Link href="#" color="blue.400">
                {value}
              </Link>
            ),
          },
          {
            Header: "into",
            accessor: "to",
          },
          {
            Header: "multiply by",
            accessor: "value",
          },
        ]}
        data={[
          { id: 1, from: "inches", to: "millimetres (mm)", value: 25.4 },
          { id: 2, from: "feet", to: "centimetres (cm)", value: 30.48 },
          { id: 3, from: "yards", to: "metres (m)", value: 0.91444 },
        ]}
        onRowClick={(obj) => console.log(obj)}
      />
    </Box>
  );
};

export default Home;
