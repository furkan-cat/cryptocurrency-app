import {
  Box,
  HStack,
  Text,
  useTheme,
  VStack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { toJS } from "mobx";
import { useEffect } from "react";
import { AreaChart, Area, YAxis } from "recharts";
import { formatDate } from "../../constants";
import { useStore } from "../../store";
import DetailStore from "../../store/detail";
import Card from "../card/card";

interface IFavoriteCard {
  id: string;
  title: string;
  price: number;
  priceChange?: number;
  volume: number;
  currency?: string;
  chartData?: object[];
}

const FavoriteCard: React.FC<IFavoriteCard> = ({
  id,
  title,
  price,
  priceChange,
  volume,
  currency = "$",
  chartData,
}): JSX.Element => {
  const { __cssMap } = useTheme();
  const textColorMode = mode("gray.600", "gray.800");
  const textDarkColorMode = mode("gray.700", "gray.900");
  const { favorites } = useStore();
  const localArr = [];
  console.log(toJS(favorites.data[id].id));

  useEffect(() => {
    const localStoragedData = JSON.parse(localStorage.getItem("id") || "");
    if (favorites.data[id].id !== localStoragedData) {
      localStorage.setItem("id", JSON.stringify([id]));
    }
  }, [id]);

  return (
    <Card display="flex" justifyContent="space-between" alignItems="center">
      <HStack spacing="6">
        <VStack alignItems="flex-start">
          <Text color={textColorMode}>{title}</Text>
          <Text fontSize="xl" fontWeight="semibold" color={textColorMode}>
            {currency}
            {price}
          </Text>
          <HStack spacing="4">
            <VStack alignItems="flex-start" spacing="0">
              <Text fontSize="small" color={mode("gray.500", "gray.600")}>
                24H%
              </Text>
              <Text
                color={priceChange && priceChange > 0 ? "green.500" : "red.600"}
              >
                {priceChange?.toFixed(1)}%
              </Text>
            </VStack>
            <VStack alignItems="flex-start" spacing="0">
              <Text fontSize="small" color={mode("gray.500", "gray.600")}>
                Vol.24H
              </Text>
              <Text color={textDarkColorMode}>
                {currency}
                {volume}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <Box>
          <AreaChart width={200} height={60} data={chartData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={__cssMap["colors.green.400"].value}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={__cssMap["colors.green.200"].value}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <YAxis
              // axisLine={false}
              hide={true}
              type="number"
              domain={[
                (dataMin: number) => dataMin,
                (dataMax: number) => dataMax * 1.2,
              ]}
            />
            <Area
              type="monotone"
              dataKey="labels"
              stroke={__cssMap["colors.green.400"].value}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </Box>
      </HStack>
    </Card>
  );
};

export default FavoriteCard;
