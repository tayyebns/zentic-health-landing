import PeopleSection from "@/components/marketing/PeopleSection";

const TEAM = [
  {
    name: "Bilal Arshad",
    title: "Founding Engineer",
    linkedin: "https://www.linkedin.com/in/bilal-arshad1/",
  },
];

export default function TeamSection() {
  return <PeopleSection heading="Team" people={TEAM} />;
}
