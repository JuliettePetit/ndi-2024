import { PersonCard } from "./models/Card.model";
import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Github } from "lucide-react";
import Link from "next/link";

export default function AboutCard({name,link,picture}: PersonCard) {

  return (
    <Card >
      <CardHeader className="flex items-center gap-y-3">
        <Avatar>
          <AvatarImage src={picture} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
        <Link href={link}>
          <Button>
            <Github/> Vers Github
          </Button>
        </Link>
      </CardHeader>
    </Card>
  )

}
