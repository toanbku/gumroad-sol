export const updateFileName = (file: File): string => {
  const date = new Date().getTime();

  const { name } = file;
  const partNames = name.split(".");
  const extension = partNames[partNames.length - 1];

  const fileName = name.replace(`.${extension}`, "") + "-" + date;

  return fileName + "." + extension;
};

export const currencyFormat = (num: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
