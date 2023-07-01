"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getMyAsset } from "@/services/api";
import { currencyFormat } from "@/utils/function";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreditCard, DollarSign } from "lucide-react";
import { flatten } from "lodash";

import StatisticTable from "../components/dataTable/Statistic";

export default function Statistics() {
  const { connected } = useWallet();

  const { data, error, isLoading } = useQuery<any>({
    queryFn: () => getMyAsset(),
    queryKey: ["history"],
    // Refetch the data every second
    refetchInterval: connected ? 20000 : 0,
  });

  const fakeData = [
    {
      id: "026f806f-4fe8-4c6c-bf12-3650326a91fd",
      title: "Asset 5",
      description: "This is description for asset 5",
      price: 1.35,
      image: "39316667a7e101c4d3ffc082491d1c3f-1688221289814.jpg",
      Transaction: [
        {
          orderId: "xDT5iy0fuoXG",
          createdAt: "2023-07-01T14:36:54.242",
          updatedAt: "2023-07-01T14:36:54.039",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 1.345740003683,
            paymentCurrency: "USD",
            txnHash:
              "4vjrWyueQxMQgWbTKCVNWyncWviBD3kLjrNKWX1DyPheaohSEvgJWNq9ME1KXyWXroTg1Ltp7HtxB8on9cWMgR2r",
          },
        },
        {
          orderId: "WxpXNPiKLWTy",
          createdAt: "2023-07-01T14:40:37.835",
          updatedAt: "2023-07-01T14:40:37.732",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 1.345147437717,
            paymentCurrency: "USD",
            txnHash:
              "2WFbxWx3DPdKwsCo9HGtveBhih74R4vnfLQ76brzMK6VgMtYkN1avm7bxaK4MrfyqSFbhqMRTaAS3Eqj1ZT2DpZ3",
          },
        },
      ],
    },
    {
      id: "f64c90ec-b430-4317-89c5-f10be0cdd80d",
      title: "Asset 2",
      description: "Description asset 2",
      price: 0.2,
      image: "39316667a7e101c4d3ffc082491d1c3f-1688221289814.jpg",
      Transaction: [
        {
          orderId: "RIQApXTj3qRN",
          createdAt: "2023-06-27T17:55:06.963",
          updatedAt: "2023-06-27T17:55:00.166",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.533262267264,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
      ],
    },
    {
      id: "38042789-0614-48ba-82af-ba10c391ed13",
      title: "Asset 3",
      description: "Description asset 3",
      price: 0.4,
      image: "39316667a7e101c4d3ffc082491d1c3f-1688221289814.jpg",
      Transaction: [
        {
          orderId: "m0j8pAlY4JDW",
          createdAt: "2023-07-01T08:58:49.752",
          updatedAt: "2023-07-01T08:58:49.644",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.405032857944,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "IqDpGCpyhhu3",
          createdAt: "2023-07-01T11:30:13.859",
          updatedAt: "2023-07-01T11:30:13.698",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.401200688042,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "Y0teYhofz51O",
          createdAt: "2023-07-01T13:43:55.65",
          updatedAt: "2023-07-01T13:43:55.539",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "TQerblzOfnrD",
          createdAt: "2023-07-01T13:54:22.72",
          updatedAt: "2023-07-01T13:54:22.673",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.40479030317,
            paymentCurrency: "USD",
            txnHash:
              "EHXfUvXhK92VFMcAdPU2UxyfSAFZFAQRbSpTndUUchXWv2BpL1rfCxF5xZA84jvscs8a16DmuFfR2XhAjaXrV9V",
          },
        },
        {
          orderId: "er7POd7282tI",
          createdAt: "2023-07-01T14:06:14.147",
          updatedAt: "2023-07-01T14:06:14.043",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "6RZQBZjXCYIp",
          createdAt: "2023-07-01T14:09:40.977",
          updatedAt: "2023-07-01T14:09:40.867",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "EGW5eAwD6cuT",
          createdAt: "2023-07-01T14:11:21.288",
          updatedAt: "2023-07-01T14:11:21.18",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
      ],
    },
    {
      id: "cf8f355d-291b-432e-bb3d-f67c4ef9d904",
      title: "Asset 1",
      description: "Description asset 1",
      price: 0.1,
      image: "39316667a7e101c4d3ffc082491d1c3f-1688221289814.jpg",
      Transaction: [
        {
          orderId: "RIQApXTj3qRN",
          createdAt: "2023-06-27T17:55:06.963",
          updatedAt: "2023-06-27T17:55:00.165",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.533262267264,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "V4FjYW5kD83n",
          createdAt: "2023-06-27T17:56:17.962",
          updatedAt: "2023-06-27T17:56:11.195",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.433188937012,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "oYhjZ2mhHsUj",
          createdAt: "2023-06-27T17:56:47.399",
          updatedAt: "2023-06-27T17:56:40.809",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "OssBTHFOCYPL",
          createdAt: "2023-06-29T11:50:43.019",
          updatedAt: "2023-06-29T11:50:42.914",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "cdcIVXgtU9Ax",
          createdAt: "2023-06-29T12:17:29.163",
          updatedAt: "2023-06-29T12:17:29.021",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "cpvPgwXm6pBS",
          createdAt: "2023-06-29T12:17:49.165",
          updatedAt: "2023-06-29T12:17:49.032",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.436670709168,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "NwyKn9RJyDKZ",
          createdAt: "2023-06-29T12:20:58.182",
          updatedAt: "2023-06-29T12:20:58.024",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.437046236472,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "E7M1seXGKhCY",
          createdAt: "2023-06-29T14:55:41.875",
          updatedAt: "2023-06-29T14:55:41.757",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "Vn4QbDMiwfX0",
          createdAt: "2023-06-29T14:55:44.253",
          updatedAt: "2023-06-29T14:55:44.207",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "AYpaPiBmMKDY",
          createdAt: "2023-06-29T14:55:44.309",
          updatedAt: "2023-06-29T14:55:44.258",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "oCUt997Vc612",
          createdAt: "2023-06-29T14:56:03.349",
          updatedAt: "2023-06-29T14:56:03.191",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "F3ZOjmNK43HU",
          createdAt: "2023-06-30T12:38:15.072",
          updatedAt: "2023-06-30T12:38:14.956",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "SdZA8Td7CcFd",
          createdAt: "2023-06-30T12:40:26.307",
          updatedAt: "2023-06-30T12:40:26.249",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.132824548493,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "KeQgvbTFp8gf",
          createdAt: "2023-07-01T07:59:21.436",
          updatedAt: "2023-07-01T07:59:21.318",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.092201226405,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "wN49E7r2MnOy",
          createdAt: "2023-07-01T09:42:15.647",
          updatedAt: "2023-07-01T09:42:15.542",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "N10KZETa1gOw",
          createdAt: "2023-07-01T11:17:52.721",
          updatedAt: "2023-07-01T11:17:52.622",
          PaymentSessions: {
            status: "Successful",
            amountOut: null,
            token: null,
            paymentAmount: 0.09130465753,
            paymentCurrency: "USD",
            txnHash: null,
          },
        },
        {
          orderId: "HJUQzzJxkXgs",
          createdAt: "2023-07-01T14:07:20.034",
          updatedAt: "2023-07-01T14:07:19.93",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
        {
          orderId: "k1kAC8eEb9hO",
          createdAt: "2023-07-01T14:11:49.075",
          updatedAt: "2023-07-01T14:11:49.036",
          PaymentSessions: {
            status: "Pending",
            amountOut: null,
            token: null,
            paymentAmount: null,
            paymentCurrency: null,
            txnHash: null,
          },
        },
      ],
    },
  ];

  const formatData = data.map((item: any) => {
    return {
      ...item,
      TransactionPrice: item.Transaction.map((trx: any) => {
        return {
          amount: trx.PaymentSessions.paymentAmount,
        };
      }),
    };
  });

  const listDataPayment = formatData.map((item: any) => {
    return item.TransactionPrice;
  });

  const totalRevenue = (flatten(listDataPayment) || []).reduce(
    (prev: any, item: any) => prev + Number(item.amount),
    0
  );

  const formatStructData = formatData.map((item: any) => {
    return {
      data: item.Transaction.map((trx: any) => {
        return {
          ...trx,
          description: item.description,
          id: item.id,
          image: item.image,
          price: item.price,
          title: item.title,
        };
      }),
    };
  });

  const innerChildren = () => {
    if (isLoading) {
      return <div className="text-lg font-medium">Loading...</div>;
    }

    if (error) {
      return <div className="text-lg font-medium">Empty</div>;
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Assets
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currencyFormat(totalRevenue)}
              </div>
            </CardContent>
          </Card>
        </div>
        <StatisticTable
          data={flatten(formatStructData.map((item) => item.data))}
        />
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">
        Statistics
      </h1>
      <Separator className="my-3 md:my-6" />
      {/* <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4"> */}
      {innerChildren()}
    </div>
  );
}
