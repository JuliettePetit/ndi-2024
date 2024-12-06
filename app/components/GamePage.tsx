import {PageSwitch} from "@/app/components/PageSwitch";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator";
import {Key} from "react";

interface Prop {
    switchState: boolean;
    switchCallback: (state: boolean) => void;
}

export default function GamePage({switchState, switchCallback}: Prop) {
    const history = Array.from({ length: 50 }).map(
        (_, i, a) => `action ${a.length - i}`
    )
    return (
        <div>
            <div className={"gap-2 grid grid-cols-1 lg:grid-cols-2"}>
                {/* left section */}
                <div>

                    <Card>
                        <CardTitle className={"flex justify-center pt-2"}>
                            <PageSwitch onCheckedChange={switchCallback} defaultChecked={switchState}/>
                        </CardTitle>
                        <CardContent>
                            <p>svg</p>
                        </CardContent>
                    </Card>
                </div>
                {/* right section */}
                <div>
                    <Card className={"p-2"}>
                        <CardTitle>
                            Statistiques
                        </CardTitle>
                        <CardContent>
                        </CardContent>
                    </Card>
                    <Card className={"p-2 my-2"}>
                        <CardTitle>
                            Historique
                        </CardTitle>
                        <CardContent>
                            <ScrollArea className={"h-72"}>
                                {history.map((it:string) => (
                                        <div key={it}>
                                            {it}
                                            <Separator/>
                                        </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}