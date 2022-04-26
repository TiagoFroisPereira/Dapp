import { Modal } from "@components/common";
import { Curriculum, CourseHero, Keypoint } from "@components/course";

export default function Course() {
  
    return (
      <div className="relative max-w-7xl mx-auto px-4">
        <CourseHero/>
        <Keypoint/>
        <Curriculum/>
        <Modal/>
      </div>
    )
  }