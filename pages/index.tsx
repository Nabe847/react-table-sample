import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { DataTable } from "../components/DataTable";

const Home: NextPage = () => {
  return (
    <Box width="800px" margin="100px auto">
      <DataTable
        caption="Imperial to metric conversion factors"
        columns={[
          { header: "To convert" },
          { header: "into" },
          { header: "multiply by" },
        ]}
        rows={[
          ["inches", "millimetres (mm)", 25.4],
          ["feet", "centimetres (cm)", 30.48],
          ["yards", "metres (m)", 0.91444],
        ]}
      />
    </Box>
  );
};

export default Home;
