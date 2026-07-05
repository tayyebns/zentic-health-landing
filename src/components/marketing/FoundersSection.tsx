import PeopleSection from "@/components/marketing/PeopleSection";

const FOUNDERS = [
  {
    name: "Saba Shahzad",
    title: "Co-Founder, Product & Strategy",
    linkedin: "https://www.linkedin.com/in/saba-s/",
    email: "sabashahzad850@gmail.com",
  },
  {
    name: "Tayyeb Nadeem Somro",
    title: "Co-Founder, Growth & Partnerships",
    linkedin: "https://www.linkedin.com/in/tayyeb-nadeem-somro/",
    email: "tayyebnadeemsomro@gmail.com",
  },
];

export default function FoundersSection() {
  return <PeopleSection heading="Founders" people={FOUNDERS} />;
}
