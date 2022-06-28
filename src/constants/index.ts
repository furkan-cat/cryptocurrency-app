export function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: any) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
  //+
  // " " +
  // [
  //   padTo2Digits(date.getHours()),
  //   padTo2Digits(date.getMinutes()),
  //   padTo2Digits(date.getSeconds()),
  // ].join(":")
}

export function formatNumber(num: string) {
  return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
}

export const chartDays = [
  {
    label: "24 Hours",
    value: "1",
  },
  {
    label: "30 Days",
    value: "30",
  },
  {
    label: "3 Months",
    value: "90",
  },
  {
    label: "1 Year",
    value: "365",
  },
];

export function capitalizeFirstLetter(str: string) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}

export interface IchartData {
  day: string;
  labels: string;
}

export function generateChartData(
  data: Record<string, any>,
  arr: IchartData[]
) {
  data.historicalData.map((val: any[]) => {
    return arr.push({
      day: formatDate(new Date(val[0])),
      labels: val[1] < 5 ? val[1].toFixed(4) : val[1].toFixed(0),
    });
  });
}
