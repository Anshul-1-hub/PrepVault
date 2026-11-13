import { useQuery } from "@tanstack/react-query";
import { instance } from "../lib/api";
import { useNavigate } from "react-router-dom";

type Experience = {
    blogId: string,
    user: {
        name: string,
    },
    company: string,
    role: string,
    status: string,
    content: string
}

export default function ExperiencesPage(){
    const navigate = useNavigate()
    
    const {data: exps, isLoading, isError, error} = useQuery({
        queryKey: ["experiences"],
        queryFn: async() => {
            const res = await instance.get("/api/experiences/all")
            return res.data
        }
    })

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <p>{error.message}</p>
    }

    return(
        <>
            <p>Experiences</p>
            {exps.length === 0 ? (
                <p>No experiences added yet!</p>
            ) : (
                exps.map((exp: Experience) => (
                    <div key={exp.blogId} onClick={() => navigate(`/experiences/${exp.blogId}`)} style={{cursor: "pointer"}}>
                        <p>{exp.company}, {exp.role} - {exp.status}</p>
                        <p>{exp.content}</p>
                        <p>-{exp.user.name}</p>
                    </div>
                ))
            )}
        </>
    )
}
