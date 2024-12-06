import { PersonCard } from "./models/Card.model";
import AboutCard from "./card";




const persons: PersonCard[] = [
  {
    name: "Mathis",
    link: "",
    picture: "",
  },
  {
    name: "Toum",
    link: "",
    picture: "",
  },
  {
    name: "Leo",
    link: "",
    picture: "",
  },
  {
    name: "Juju",
    link: "",
    picture: "",
  },
  {
    name: "Axel",
    link: "",
    picture: "",
  },
  {
    name: "Tanguy",
    link: "",
    picture: "",
  },
  {
    name: "Wanchai",
    link: "",
    picture: "",
  },

]


export default async function Contact() {
  return (
    <div className="my-10 mx-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {persons.map((person) =>
        {
        return (<AboutCard key={person.name} name={person.name} link={person.link} picture={person.picture} />);
        })
      }
    </div>
  )

}
