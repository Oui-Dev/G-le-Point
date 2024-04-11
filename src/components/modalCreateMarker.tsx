import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/authStore";
import { useMarkerStore } from "@/stores/markerStore";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ModalCreateMarker = () => {
  const pointNameRef = useRef<HTMLInputElement>(null);
  const pointDescriptionRef = useRef<HTMLInputElement>(null);
  const pointAddressRef = useRef<HTMLInputElement>(null);
  const pointGpsRef = useRef<HTMLInputElement>(null);

  const [display, setDisplay] = useState<string>("");

  const { addMarker } = useMarkerStore();

  const { user } = useAuthStore();

  const addMarkerWithCurrentLocation = () => {
    const geo = navigator.geolocation;
    if (!geo)
      return alert(
        "La géolocalisation n'est pas disponible sur votre navigateur"
      );
    navigator.geolocation.getCurrentPosition((position) => {
      addMarker({
        name: pointNameRef.current?.value || "Point",
        description: pointDescriptionRef.current?.value || "",
        tags: [],
        address: "",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        user: {
          uid: user?.uid ?? null,
          displayName: user?.displayName ?? null,
        },
      });
    });
  };

  const addMarkerWithAddress = () => {
    if (!pointAddressRef.current?.value) {
      return alert("Veuillez renseigner une adresse");
    }
    addMarker({
      name: pointNameRef.current?.value || "Point",
      description: pointDescriptionRef.current?.value || "",
      tags: [],
      address: pointAddressRef.current?.value || "",
      latitude: 0,
      longitude: 0,
      user: {
        uid: user?.uid ?? null,
        displayName: user?.displayName ?? null,
      },
    });
  };

  const addMarkerWithGps = () => {
    if (!pointGpsRef.current?.value) {
      return alert("Veuillez renseigner un point GPS");
    }
    const [latitude, longitude] = pointGpsRef.current?.value.split(",");
    if (!latitude || !longitude) {
      return alert("Le point GPS est invalide");
    }
    addMarker({
      name: pointNameRef.current?.value || "Point",
      description: pointDescriptionRef.current?.value || "",
      tags: [],
      address: "",
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      user: {
        uid: user?.uid ?? null,
        displayName: user?.displayName ?? null,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="absolute left-1/2 transform -translate-x-1/2 bottom-2 h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-md">
        <PlusIcon className="h-8 w-8 text-black" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un point</DialogTitle>
          <DialogDescription>
            Ajouter un point pour indiquer un lieu sur la carte
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="name">Nom du lieu</Label>
        <Input ref={pointNameRef} id="name" type="text" />
        <Label htmlFor="description">Description</Label>
        <Input ref={pointDescriptionRef} id="description" type="text" />

        <div>
          <div className="w-full h-8 flex flex-row border mb-4 text-xs">
            <div
              className={`h-full w-full flex items-center justify-center cursor-pointer ${
                display == "address"
                  ? "outline outline-4 outline-offset-[-4px] outline-black"
                  : ""
              }`}
              onClick={() => setDisplay("address")}
            >
              Adresse
            </div>
            <div
              className={`h-full w-full flex items-center justify-center cursor-pointer ${
                display == "gps"
                  ? "outline outline-4 outline-offset-[-4px] outline-black"
                  : ""
              }`}
              onClick={() => setDisplay("gps")}
            >
              Point GPS
            </div>
            <div
              className={`h-full w-full flex items-center justify-center cursor-pointer ${
                display == "position"
                  ? "outline outline-4 outline-offset-[-4px] outline-black"
                  : ""
              }`}
              onClick={() => setDisplay("position")}
            >
              Ma position
            </div>
          </div>
          {display == "address" && (
            <>
              <Label htmlFor="address">Adresse</Label>
              <Input ref={pointAddressRef} id="address" type="text" />
              <DialogClose onClick={addMarkerWithAddress} className="mt-4">
                Enregistrer le point
              </DialogClose>
            </>
          )}
          {display == "gps" && (
            <>
              <Label htmlFor="gps">Point GPS</Label>
              <Input
                id="gps"
                type="text"
                placeholder="Exemple: 48.86127461, 2.334830083"
                ref={pointGpsRef}
              />
              <DialogClose onClick={addMarkerWithGps} className="mt-4">
                Enregistrer le point
              </DialogClose>
            </>
          )}
          {display == "position" && (
            <DialogClose
              onClick={addMarkerWithCurrentLocation}
              className="m-auto"
            >
              Enregistrer le point à ma position
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateMarker;
