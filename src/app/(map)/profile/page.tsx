/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { redirectTo } from "@/lib/actions";
import { deleteAccount, updateUser } from "@/services/firebase/profil";
import { logOut, useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().optional(),
});

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.username || user?.displayName || "",
      bio: user?.bio || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (user && data.username) {
      user.username = data.username;
    }

    if (user && data.bio) {
      user.bio = data.bio;
    }

    if (user) {
      updateUser(user);
      toast("Vous avez mis à jour votre profil avec succès.");
    }
  }

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.clear();
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        await deleteAccount();
        toast("Votre compte a été supprimé avec succès.");
      } catch (error) {
        toast("Une erreur s'est produite lors de la suppression du compte.");
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center flex-col mt-12 md:mx-[25%]">
      <h1>Mon compte</h1>
      <div className="w-full flex flex-col justify-center items-center">
        {user?.photoURL ? (
          <Image
            src={user?.photoURL ?? ""}
            alt={"Photo de profil de " + user?.displayName ?? "l'utilisateur"}
            width={64}
            height={64}
            className="rounded-full shadow-md"
          />
        ) : (
          <div className="flex justify-center items-center w-16 h-16 bg-primary text-white rounded-full shadow-md">
            <span className="text-xl">{user?.displayName?.charAt(0)}</span>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom d'utilisateur" {...field} />
                  </FormControl>
                  <FormDescription>
                    Il s'agit de votre nom d'affichage public.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biographie</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Il s'agit de votre biographie public.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder={user?.email ?? ""} {...field} />
                  </FormControl>
                  <FormDescription>Il s'agit de votre e-mail.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center items-center">
              <Button type="submit" className="w-64 rounded-full">
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex flex-row justify-center items-center w-full mt-4 gap-4">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="bg-destructive text-white hover:bg-red-600 p-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            <span>Se déconnecter</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger className="bg-destructive text-white hover:bg-red-600 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera
                  définitivement votre compte et supprimez vos données de nos
                  serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-white hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Profile;
