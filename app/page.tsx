"use client"

import {useEffect, useState} from "react";
import GamePage from "@/app/components/GamePage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Event as GeoEvent} from "@/lib/types";

export default function Home() {
    const [isEarth, setIsEarth] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [geoEvent, setEvent] = useState(null as GeoEvent | null);
    const isChek: ((checked: boolean) => void) = (s: boolean) => setIsEarth(s);

    const a: GeoEvent = {
        id: 1,
        name: "mY PROUT",
        description: "Je sens l'orage a l'ouest (je me suis chier dessus)",
        option: "AcceptChoice"
    };

    useEffect(() => {
        const id = setInterval(() => {
            if (!isOpen) {
                // call Back
                // update stats
                if (geoEvent == null) { // reponse contient event
                    setEvent(a);
                    setIsOpen(true);
                }
                console.log(isOpen);
            }
        }, 1000); // each second
        return () => clearInterval(id);
    }, [isOpen, geoEvent])

    const accept = () => {console.log("yes"); setIsOpen(false);};
    const refuse = () => {console.log("no"); setIsOpen(false);};
    const ok = () => {console.log("ok"); setIsOpen(false);};

    return (
        <div className={"p-2"}>
            <h1 className={"font-extrabold text-2xl"}>{isEarth ? "EARTH" : "HUMAN"}</h1>
            <GamePage switchState={isEarth} switchCallback={isChek}/>
            <Dialog open={isOpen}>
                <DialogContent onEscapeKeyDown={event => event.preventDefault()} onPointerDownOutside={event => event.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>{geoEvent?.name || ""}</DialogTitle>
                        <DialogDescription>
                            {geoEvent?.description || ""}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {
                            geoEvent?.option == 'YesNoChoice'
                            ? <><Button variant={"outline"} onClick={refuse}>Non</Button><Button onClick={accept}>Oui</Button></>
                            : <><Button onClick={ok}>Ok</Button></>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
