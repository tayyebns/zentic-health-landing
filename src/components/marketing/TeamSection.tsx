import PeopleSection from "@/components/marketing/PeopleSection";

const TEAM = [
  {
    name: "Asim Raza",
    title: "Founding Engineer",
    linkedin: "https://www.linkedin.com/in/asim-r-0a577b3a9/",
  },
  {
    name: "Bilal Arshad",
    title: "Founding Engineer",
    linkedin: "https://www.linkedin.com/in/bilal-arshad1/",
  },
];

export default function TeamSection() {
  return <PeopleSection heading="Team" people={TEAM} />;
}
