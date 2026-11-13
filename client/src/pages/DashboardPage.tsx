import { useNavigate, Link } from "react-router-dom"
import { authClient } from "../lib/auth"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../lib/api"

type Application = {
    applicationId: string,
    status: string,
    drive: {
        company: string,
        offertype: string,
        role: string
    }
}

export default function DashboardPage(){
    const navigate = useNavigate()
    const {data: session, isPending} = authClient.useSession()

    const {data: apps, isLoading, isError, error} = useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const res = await instance.get("/api/applications/all")
            return res.data
        }
    })

    if(isPending){
        return <div>Loading...</div>
    }

    if(!session){
        navigate("/login")
        return
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <p>{error.message}</p>
    }

    return(
        <>
            <p><strong>Name:</strong>{session.user.name}</p>
            <p><strong>Email:</strong>{session.user.email}</p>
            <p><strong>Role:</strong>{session.user.role}</p>

            {apps.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                apps.map((a: Application) => (
                    <div key={a.applicationId}>
                        <p>{a.drive.company} - {a.drive.role}</p>
                        <p>{a.drive.offertype}</p>
                        <p>STATUS: {a.status}</p>
                    </div>
                ))
            )
            }
        </>
    )
}