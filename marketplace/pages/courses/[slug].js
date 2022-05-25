import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Message, Modal } from "@components/ui/common";
import { Curriculum, CourseHero, Keypoint } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({course}) {
  const { isLoading } = useWeb3()
  const { account } = useAccount()
  const { ownedCourse } = useOwnedCourse(course,account.data)
  const courseState = ownedCourse.data?.state
  const isLocked = !courseState || courseState === "purchased" || courseState ==="desactivated"
  return (
    <>
      <div className="py-4">
        <CourseHero 
          hasOwner ={!!ownedCourse.data}
          title = {course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoint 
        points = {course.wsl}
      />
      <div className="max-w-5xl mx-auto">
        { courseState ==="purchased" &&
          <Message type="warning">
            Course is purchased and waiting for the activation. Process can take up to 24h
            <i className="block font-normal">In case of any questions, please contact info@tfroisip.com</i>
          </Message>
        } 
        { courseState ==="activated" &&
          <Message type="success">
            Tiago wishes you happy watching of the course
          </Message>
        }
        { courseState ==="desactivated" &&
          <Message type="danger">
            Course has been desactivated, due to the incorrect purchased data. 
            The functionality to watch the course has been temporarly disabled
            <i className="block font-normal">In case of any questions, please contact info@tfroisip.com</i>
          </Message>
        }
      </div>
      <Curriculum 
        isLoading={isLoading}
        locked = {isLocked}
        courseState = {courseState}
        />
      <Modal/>
    </>
  )
}

export function getStaticPaths() {
    const { data } = getAllCourses()
    
    return {
        paths: data.map(c => ({
            params:{
                slug: c.slug
            }
        })),
        fallback: false
    }
}

export function getStaticProps({params}) {
    const { data } = getAllCourses()

    const course = data.filter( c => c.slug == params.slug)[0]

    return {
      props: {
        course
      }  
    }
  }
  