"use client";
import { Experience } from "@/types/experience";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { countYears, formatDate } from "@/lib/date";
import { SiSpringboot } from "react-icons/si";

interface Props {
  experiences: Experience[];
}

export const ExperienceTimeline = ({ experiences }: Props) => {
  const VerticalTimelineWrapper = VerticalTimeline as unknown as React.FC<any>;
  const VerticalTimelineElementWrapper =
    VerticalTimelineElement as unknown as React.FC<any>;

  return (
    <div className="mt-10 md:mt-20 flex flex-col">
      <VerticalTimelineWrapper>
        {experiences.map((experience, index) => (
          <VerticalTimelineElementWrapper
            key={`experience-${index}`}
            contentStyle={{
              background: "#1d1836",
              color: "#fff",
            }}
            visible
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            date={`From ${formatDate(experience.from, "MM/yy")} To ${
              experience.to ? formatDate(experience.to, "MM/yy") : "Nowadays"
            } - ${countYears(experience.from, experience.to)}`}
            icon={
              <div className="bg-dark-gray h-full w-full flex rounded-full">
                {
                  {
                    "Next.js": <RiNextjsFill />,
                    "React.js": <FaReact />,
                    Spring: <SiSpringboot />,
                  }[experience.icon]
                }
              </div>
            }
            className="[&>*]:z-10"
          >
            <h3 className="text-base md:text-lg vertical-timeline-element-title">
              {experience.name}
            </h3>
            <h4 className="text-xs md:text-sm vertical-timeline-element-subtitle text-light-blue">
              {experience.companyName}
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <span
                  key={tag.name}
                  style={{ color: tag.color }}
                  className="text-sm md:text-base"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </VerticalTimelineElementWrapper>
        ))}
      </VerticalTimelineWrapper>
    </div>
  );
};

