import { WorkExperienceTexts } from "@/types/texts";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { tags } from "../../tags";

export const workExperience: WorkExperienceTexts = {
  title: "Professional Experience",
  experiences: [
    {
      name: "Student of Analysis and Systems Development (ADS)",
      companyName: "UNICV",
      description:
        "Currently studying Analysis and Systems Development, deepening knowledge in software development, systems analysis, and web technologies, always seeking to apply learnings in practical projects.",
      from: "2023-01",
      to: "2025-12-01",
      tags: [tags["Typescript"], tags["React.js"], tags["Next.js"]],
      icon: "React.js",
    },
    {
      name: "Frontend Developer",
      companyName: "Mestres da Web",
      description:
        "As a Frontend Developer at Mestres da Web, I use React, Next.js, and TypeScript to develop high-quality web applications. My responsibilities include creating fast, interactive, and accessible user interfaces. I collaborate with the backend team to integrate frontend with backend services ensuring seamless functionality. Additionally, I handle application deployment. Working in an agile environment, I actively contribute to the team's efforts to deliver top-notch software.",
      from: "2023-01-01",
      to: "2024-06-01",
      tags: [tags["React.js"], tags["Next.js"], tags["Typescript"]],
      icon: "Next.js",
    },
    {
      name: "Frontend Programming Intern",
      companyName: "Datlo",
      description:
        "I was responsible for developing the frontend of an intelligent location platform. The platform provided solutions to help companies find new clients, strategic partners, monitor the market and competitors, and open new stores in strategic locations. During the project, I used tools like React/Next.js, Typescript, ANT-Design, Leaflet, Styled-components, and GraphQL.",
      from: "2022-10",
      to: "2023-07",
      tags: [
        tags["React.js"],
        tags["Next.js"],
        tags["Typescript"],
        tags["GraphQL"],
      ],
      icon: "React.js",
    },
    {
      name: "IT Intern",
      companyName: "Anpad",
      description:
        "Worked as a Frontend Developer, responsible for creating websites and developing routes for events held. I have experience in video editing using Adobe Premiere and graphic editing skills in Adobe Photoshop.",
      from: "2020-08",
      to: "2022-08",
      tags: [tags["HTML"], tags["CSS"], tags["JavaScript"]],
      icon: "React.js",
    },
    {
      name: "Infrastructure Intern",
      companyName: "Pressure Compressores",
      description:
        "Worked in the factory infrastructure area, repairing and fixing computers, printers, and systems when necessary.",
      from: "2019-01",
      to: "2019-11",
      tags: [tags["Infraestrutura"], tags["Hardware"]],
      icon: "React.js",
    },
    {
      name: "Video Editor",
      companyName: "Band Maringá",
      description:
        "Edited videos and materials for the Mirna Lavecc program, which aired every Saturday.",
      from: "2017",
      to: "2018",
      tags: [tags["Infraestrutura"], tags["Hardware"]],
      icon: "React.js",
    },
  ],
};

