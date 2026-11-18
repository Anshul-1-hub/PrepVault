import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../lib/api";

type Question = {
    questionId: string,
    user:{
        name: string,
    },
    company: string,
    role: string,
    difficulty: string,
    topic: string,
    question: string,
    round: string
}

export default function QuestionPage(){
    const navigate = useNavigate()

    const {data: qs, isLoading, isError, error} = useQuery({
        queryKey: ["questions"],
        queryFn: async() => {
            const res = await instance.get("/api/questions/all")
            return res.data
        }
    })

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>{error.message}</div>
    }

    return(
        <>
            <p>Questions</p>
            {qs.length === 0 ? (
                <p>No question added yet!</p>
            ) : (
                qs.map((q: Question) => (
                    <div key={q.questionId}>
                        <p>{q.question}</p>
                        <p>{q.company}, {q.role}, {q.round}</p>
                        <p>{q.topic} - {q.difficulty}</p>
                        <p>-{q.user.name}</p>
                    </div>
                ))
            )}
        </>
    )
}