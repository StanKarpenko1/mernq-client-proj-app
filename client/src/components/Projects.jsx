import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from "./ProjectCard"

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <Spinner />
    if (error) return <p> Something went wrong </p>


    return (
        <>
            {data.projects.length > 0
                ? (
                    <div className='row mt-4'>
                        {data.projects.map((project) => (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={project.id}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>  
                )
                : (
                    <p>No Projects</p>
                )}
        </>
    );
}
