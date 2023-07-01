"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CurrencyInput, Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import supabase from "@/services/supabase";
import { LoaderIcon } from "lucide-react";
import { updateFileName } from "@/utils/function";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  asset: z.string(),
  coverImage: z.string(),
  price: z.string().min(0.1, {
    message: "Price is required.",
  }),
});

export default function AssetForm() {
  const { connected } = useWallet();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAsset, setIsUploadingAsset] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formatFormData = {
      title: values.name,
      description: values.description,
      price: Number(values.price),
      coverImage: values.coverImage,
      asset: values.asset,
    };
    const token = localStorage.getItem("token");
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://gumstreet.vercel.app/api/assets",
        {
          data: formatFormData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        variant: "destructive",
        title: "Success",
        description: "You created a new asset",
      });

      form.reset();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    const file = e.target.files[0];
    try {
      setIsUploadingCover(true);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${updateFileName(file)}`, file as File);

      if (error) throw error;

      if (data?.path) {
        form.setValue("coverImage", data.path);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message,
      });
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleUploadAsset = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];
    try {
      setIsUploadingAsset(true);
      const { data, error } = await supabase.storage
        .from("assets")
        .upload(`${updateFileName(file)}`, file as File);
      if (error) throw error;
      if (data?.path) {
        form.setValue("asset", data.path);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message,
      });
    } finally {
      setIsUploadingAsset(false);
    }
  };

  const innerChildren = () => {
    if (!connected) {
      return (
        <div className="text-lg font-medium">
          Please login to create new asset
        </div>
      );
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name the asset" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="Describe your asset"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="asset"
              render={({ field: { value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Upload Asset</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {isUploadingAsset && (
                        <LoaderIcon className="animate-spin" />
                      )}
                      <Input
                        id="asset"
                        type="file"
                        {...rest}
                        onChange={handleUploadAsset}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Upload Cover</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {isUploadingCover && (
                        <LoaderIcon className="animate-spin" />
                      )}
                      <Input
                        id="coverImage"
                        type="file"
                        {...rest}
                        onChange={handleUploadCover}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <CurrencyInput {...field} placeholder="$" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            <div className="flex items-center gap-1">
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Create new asset
            </div>
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">
        Create new asset
      </h1>
      <Separator className="my-3 md:my-6" />
      {innerChildren()}
    </div>
  );
}
