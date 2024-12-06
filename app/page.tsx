"use client"

import {useState} from "react";
import GamePage from "@/app/components/GamePage";

export default function Home() {
    const [isEarth, setIsEarth] = useState(false);
    const isChek: ((checked: boolean) => void) = (s: boolean) => setIsEarth(s);
    return (
        <div className={"p-2"}>
            <h1 className={"font-extrabold text-2xl"}>{isEarth ? "EARTH" : "HUMAN"}</h1>
            <GamePage switchState={isEarth} switchCallback={isChek}/>
        </div>
    );
}
