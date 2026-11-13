import { useQuery } from "@tanstack/react-query";
import { instance } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

type Comment = {
    commentId: string,
    user: {
        name: string,
    },
    content: string,
    createdAt: string
}

export default function IndividualExperiencePage(){
    const navigate = useNavigate()
    const {blogId} = useParams()

    const {data: exp, isLoading, isError, error} = useQuery({
        queryKey: ["indExperience", blogId],
        queryFn: async() => {
            const res = await instance.get(`/api/experiences/${blogId}`)
            return res.data
        }
    })

    const {data: comments, isLoading: isLoading2, isError: isError2, error: error2} = useQuery({
        queryKey: ["comments", blogId],
        queryFn: async() => {
            const res = await instance.get(`/api/experiences/${blogId}/comments`)
            return res.data
        }
    })

    if(isLoading || isLoading2){
        return <div>Loading...</div>
    }

    if(isError){
        return <p>{error.message}</p>
    }

    if(isError2){
        return <p>{error2.message}</p>
    }

    return(
        <>
            <p>{exp.company}, {exp.role} - {exp.status}</p>
            <p>{exp.content}</p>

            <div>
                <input type="text" />
                
            </div>

            {comments.length === 0 ? (
                <p>No comments yet!</p>
            ): (
                comments.map((c: Comment) => (
                    <div key={c.commentId}>
                        <p>{c.user.name}</p>
                        <p>{c.content}</p>
                        <p>{new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </>
    )
}