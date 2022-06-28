import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Card from "../components/card/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import { capitalizeFirstLetter, chartDays, formatDate } from "../constants";
import { toJS } from "mobx";

const Detail = () => {
  const [days, setDays] = useState("1");
  const { details } = useStore();
  const { id }: any = useParams();
  const currencyDetail = details.data[id];

  const chartData: [] = details.historicalData.map((val: any[]) => {
    return {
      day: formatDate(new Date(val[0])),
      labels:
        val[1] < 5 ? Number(val[1].toFixed(4)) : Number(val[1].toFixed(0)),
    };
  });

  const CustomTooltip = ({ payload }: any): JSX.Element => {
    return (
      <Card>
        <p>{payload[0]?.payload.labels}</p>
      </Card>
    );
  };

  const formatYAxis = (val: number) => {
    return val.toFixed(0);
  };

  useEffect(() => {
    details.getCoin(id);
    details.getHistorical(id, days);
    console.log("useEffect");
  }, [days, id]);

  if (details.loading) {
    return (
      <Center alignItems="center">
        <Spinner size="md" />
      </Center>
    );
  }

  return (
    <Box>
      <Card pb={6}>
        <HStack justify="space-between">
          <HStack>
            <Image src={currencyDetail?.image.small} />
            <Text>{capitalizeFirstLetter(id)}</Text>
          </HStack>
          <Flex justify="flex-end">
            {chartDays.map((days) => (
              <Button
                key={days.value}
                onClick={() => setDays(days.value)}
                ml="2"
              >
                {days.label}
              </Button>
            ))}
          </Flex>
        </HStack>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 15, left: 15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" angle={-10} fontSize={"12px"} tickMargin={4} />
            <YAxis
              type="number"
              domain={[
                (dataMin: number) => dataMin,
                (dataMax: number) => dataMax * 1.2,
              ]}
              tickFormatter={formatYAxis}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="labels"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default observer(Detail);
