import { Flex, HStack } from "@chakra-ui/react";
import { toJS } from "mobx";
import { useStore } from "../../store";
import { formatDate } from "../../constants";
import FavoriteCard from "../favorite-card/favorite-card";

const Favorites = () => {
  const { favorites } = useStore();

  return (
    <Flex>
      <HStack overflowX="auto" overflowY="hidden">
        {favorites.getData.map((item) => {
          let chartData = item.chartData;
          console.log(toJS(chartData));
          const mappedVal = chartData?.map((val: any) => {
            return {
              day: formatDate(new Date(val[0])),
              labels: val[1] < 5 ? Number(val[1]) : Number(val[1]),
            };
          });
          return (
            <FavoriteCard
              id={item.id}
              key={item.id}
              title={item.name}
              price={item.current_price}
              priceChange={item.price_change_percentage_24h}
              chartData={mappedVal}
              volume={item.total_volume}
            />
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Favorites;
